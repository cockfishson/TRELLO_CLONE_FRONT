import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Board, apiService } from "../../services/api";

interface BoardsState {
  boards: Board[];
  loading: boolean;
  error: string | null;
  activeBoardId: number | null;
}

const initialState: BoardsState = {
  boards: [],
  loading: false,
  error: null,
  activeBoardId: null,
};

export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  apiService.getAllBoards,
);
export const createBoard = createAsyncThunk(
  "boards/createBoard",
  apiService.createBoard,
);
export const updateBoard = createAsyncThunk(
  "boards/updateBoard",
  ({ boardId, newTitle }: { boardId: number; newTitle: string }) =>
    apiService.changeBoardTitle(boardId, newTitle),
);
export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  apiService.deleteBoard,
);
export const changeActiveBoard = createAsyncThunk(
  "boards/changeActiveBoard",
  async (boardId: number) => {
    return boardId;
  },
);

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.loading = false;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch boards.";
      })
      .addCase(changeActiveBoard.fulfilled, (state, action) => {
        state.activeBoardId = action.payload;
      });
  },
});

export default boardsSlice.reducer;
