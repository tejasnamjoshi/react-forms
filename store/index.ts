import { combineReducers } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  form: formReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
const store = configureStore<RootState>({ reducer: rootReducer });

export default store;
