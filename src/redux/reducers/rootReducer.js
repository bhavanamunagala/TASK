import { combineReducers } from "redux";
import calenderReducer from "./calendar/";
import emailReducer from "./email/";
import chatReducer from "./chat/";
import customizer from "./customizer/";
import auth from "./auth/";
import dataList from "./data-list/";
import EarningMasterReducer from "./HR/EarningMaster";

const rootReducer = combineReducers({
  calendar: calenderReducer,
  emailApp: emailReducer,

  chatApp: chatReducer,
  customizer: customizer,
  auth: auth,

  dataList: dataList,
  //HR Module
earningMaster: EarningMasterReducer,
});

export default rootReducer;
