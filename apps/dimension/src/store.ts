import { configureStore } from "@reduxjs/toolkit";

import { layerReducer } from "./page.main/_layer-state";

export const store = configureStore({
  reducer: {
    layer: layerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users:
// UsersState}
export type AppDispatch = typeof store.dispatch;
