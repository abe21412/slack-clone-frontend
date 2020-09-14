import { combineReducers } from "redux";
import workspacesReducer from "../stateSlices/workspacesSlice";
import channelsReducer from "../stateSlices/channelsSlice";

export default combineReducers({
  workspaces: workspacesReducer,
  channels: channelsReducer,
});
