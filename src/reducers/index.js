import { combineReducers } from "redux";
// aliasing courseReducer as courses
import courses from "./courseReducer";

const rootReducer = combineReducers({
	courses: courses
});

export default rootReducer;