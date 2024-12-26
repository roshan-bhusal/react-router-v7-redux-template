// app/store/store.ts

import {
  configureStore,
  combineReducers,
  type Reducer,
} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
// 1) We'll have a few optional static reducers always loaded:
const staticReducers = {
  auth: authReducer,
};

// 2) This will hold references to any async reducers (injected by features):
let asyncReducers: { [key: string]: Reducer } = {};

// 3) A helper that merges static + async reducers:
function createRootReducer() {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
}

// 4) Configure your store with an initial root reducer:
export const store = configureStore({
  reducer: createRootReducer(),
  // middleware, devTools, etc. can be added here
});

// 5) This function can be called by any feature that wants to inject a reducer:
export function injectReducer(key: string, reducer: Reducer) {
  // If the reducer is already loaded, do nothing:
  if (asyncReducers[key]) return;

  // Otherwise, add the new reducer, replace the store's root reducer:
  asyncReducers[key] = reducer;
  store.replaceReducer(createRootReducer());
}

// 6) Typings for RootState & Dispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;

// Note: The ReturnType can look confusing but ensures we get the updated shape
// after all (static + async) reducers are combined.
