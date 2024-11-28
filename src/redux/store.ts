import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./slices/boardSlice";
import listsReducer from "./slices/listsSlice";
import cardsReducer from "./slices/cardsSlice";
import activityLogReducer from "./slices/activityLogSlice";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    cards: cardsReducer,
    activityLog: activityLogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
