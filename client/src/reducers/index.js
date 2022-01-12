import { combineReducers } from "redux";

import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";

export default combineReducers({ auth: authReducer, surveys: surveysReducer });
