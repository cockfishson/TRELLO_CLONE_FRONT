import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { List, apiService } from "../../services/api";

interface ListsState {
  lists: List[];
  loading: boolean;
  error: string | null;
}

const initialState: ListsState = {
  lists: [],
  loading: false,
  error: null,
};

export const updateLists = createAsyncThunk(
  "lists/updateLists",
  async ({ boardId, lists }: { boardId: number; lists: List[] }) => {
    await apiService.updateBoardLists(boardId, lists);
    return lists;
  },
);

export const fetchLists = createAsyncThunk(
  "lists/fetchLists",
  async (boardId: number) => {
    const lists = await apiService.getBoardContent(boardId);
    return lists;
  },
);

export const createList = createAsyncThunk(
  "lists/createList",
  async ({
    boardId,
    title,
    position,
  }: {
    boardId: number;
    title: string;
    position: number;
  }) => {
    const list = await apiService.createList(boardId, title, position);
    return list;
  },
);

export const updateList = createAsyncThunk(
  "lists/updateList",
  async ({
    listId,
    data,
  }: {
    listId: number;
    data: { title?: string; position?: number };
  }) => {
    const updatedList = await apiService.updateList(listId, data);
    return updatedList;
  },
);

export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async (listId: number) => {
    await apiService.deleteList(listId);
    return listId;
  },
);

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.lists = action.payload;
        state.loading = false;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch lists.";
      })
      .addCase(updateLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLists.fulfilled, (state, action) => {
        state.lists = action.payload;
        state.loading = false;
      })
      .addCase(updateLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update lists.";
      })
      .addCase(createList.fulfilled, (state, action) => {
        const newList = { ...action.payload, TrelloCards: [] };
        state.lists.push(newList);
      })
      .addCase(updateList.fulfilled, (state, action) => {
        const index = state.lists.findIndex(
          (list) => list.list_id === action.payload.list_id,
        );
        if (index !== -1) {
          state.lists[index] = action.payload;
        }
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.lists = state.lists.filter(
          (list) => list.list_id !== action.payload,
        );
      });
  },
});

export default listsSlice.reducer;
