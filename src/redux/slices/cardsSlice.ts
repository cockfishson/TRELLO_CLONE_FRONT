import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TrelloCard, apiService } from "../../services/api";

interface CardsState {
  cards: TrelloCard[];
  loading: boolean;
  error: string | null;
  draggedCard: TrelloCard | null;
}

const initialState: CardsState = {
  cards: [],
  loading: false,
  error: null,
  draggedCard: null,
};

export const createCard = createAsyncThunk(
  "cards/createCard",
  ({
    listId,
    data,
  }: {
    listId: number;
    data: { title: string; description?: string; position: number };
  }) => apiService.createCard(listId, data),
);

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  ({
    cardId,
    data,
  }: {
    cardId: number;
    data: {
      title?: string;
      description?: string;
      position?: number;
      list_id?: number;
    };
  }) => apiService.updateCard( cardId, data),
);

export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  ({  cardId }: {  cardId: number }) =>
    apiService.deleteCard(cardId),
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setDraggedCard: (state, action) => {
      state.draggedCard = action.payload;
    },
    clearDraggedCard: (state) => {
      state.draggedCard = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.cards.push(action.payload);
        state.loading = false;
      })
      .addCase(createCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create card.";
      });
  },
});

export const { setDraggedCard, clearDraggedCard } = cardsSlice.actions;

export default cardsSlice.reducer;
