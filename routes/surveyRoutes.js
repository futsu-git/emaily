const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const sendMail = require("../services/mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

module.exports = (app) => {
	app.get("/api/surveys", requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user._id }).select({
			recipients: false,
		}); // equals to {recipients:0}
		res.send(surveys);
	});

	app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients
				.split(",")
				.map((email) => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now(),
		});

		const response = await sendMail(survey, surveyTemplate(survey));

		if (!response.body) {
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();
			res.send(user);
		} else {
			results.map((error) => {
				console.log(error.message);
			});
			res.status(400).send("something went wrong while sending email!");
		}
	});

	app.get("/api/surveys/:surveyId/:choice", async (req, res) => {
		res.send("Thanks for your coorperation!");
	});

	app.post("/api/surveys/webhooks", (req, res) => {
		const p = new Path("/api/surveys/:surveyId/:choice");

		const events = _.chain(req.body)
			.map(({ url, email }) => {
				const match = p.test(new URL(url).pathname);
				if (match) {
					return { email, surveyId: match.surveyId, choice: match.choice };
				}
			})
			.compact()
			.uniqBy("email", "surveyId")
			.each(({ surveyId, email, choice }) => {
				// resで返すものがないのでawaitしなくてもいい
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: { email: email, responded: false },
						},
					},
					{
						$inc: { [choice]: 1 },
						$set: { "recipients.$.responded": true },
						lastResponded: new Date(),
					}
				).exec();
			})
			.value();

		res.send();
	});
};
