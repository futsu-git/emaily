const sgMail = require("@sendgrid/mail");
const keys = require("../config/keys");
sgMail.setApiKey(keys.SENDGRID_KEY);

// https://github.com/sendgrid/sendgrid-nodejs/blob/main/docs/use-cases/single-email-multiple-recipients.md

module.exports = async (survey, content) => {
	const { subject, recipients } = survey;

	const message = {
		from: keys.SENDER_EMAIL,
		to: recipients.map(({ email }) => email),
		subject,
		content: [
			{
				type: "text/html",
				value: content,
			},
		],
		trackingSettings: {
			clickTracking: {
				enable: true,
				enableText: false,
			},
		},
	};

	const res = await sgMail.sendMultiple(message);
	return res;
};
