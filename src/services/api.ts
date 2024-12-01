import axios from "axios";

const BASE_URL = "http://localhost:5000/trello";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export interface Board {
  board_id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
}

export interface List {
  list_id: number;
  board_id: number;
  title: string;
  position: number;
  created_at: Date;
  updated_at: Date;
}

export interface TrelloCard {
  card_id: number;
  list_id: number;
  title: string;
  description?: string;
  position: number;
  created_at: Date;
  updated_at: Date;
}

export interface ActivityLog {
  activity_id: number;
  user_name_and_surname: string;
  action_type: string;
  action_details: string;
  created_at: Date;
}

export const apiService = {
  async getAllBoards(): Promise<Board[]> {
    const response = await api.get("/board");
    return response.data.data;
  },
  async createBoard(title: string): Promise<Board> {
    const response = await api.post("/board", { title });
    return response.data;
  },
  async changeBoardTitle(boardId: number, newTitle: string): Promise<Board> {
    const response = await api.put(`/board/${boardId}`, { title: newTitle });
    return response.data;
  },
  async deleteBoard(boardId: number): Promise<void> {
    await api.delete(`/board/${boardId}`);
  },

  async getBoardContent(boardId: number): Promise<List[]> {
    const response = await api.get(`/board/content/${boardId}`);
    return response.data;
  },

  async updateBoardLists(boardId: number, lists: List[]): Promise<void> {
    const response = await api.put(`/board/updateLists/${boardId}`, { lists });
    return response.data;
  },

  async createList(
    boardId: number,
    title: string,
    position: number,
  ): Promise<List> {
    const response = await api.post(`/board/content/${boardId}`, {
      title,
      position,
    });
    return response.data;
  },
  async updateList(
    listId: number,
    data: { title?: string; position?: number },
  ): Promise<List> {
    const response = await api.put(`/board/content/${listId}`, data);
    return response.data;
  },
  async deleteList(listId: number): Promise<void> {
    await api.delete(`/board/content/${listId}`);
  },

  async createCard(
    listId: number,
    data: { title: string; description?: string; position: number },
  ): Promise<TrelloCard> {
    const response = await api.post(`/board/content/list/${listId}`, data);
    return response.data;
  },
  async updateCard(
    cardId: number,
    data: { title?: string; description?: string; position?: number },
  ): Promise<TrelloCard> {
    const response = await api.put(
      `/board/content/card/${cardId}`,
      data,
    );
    return response.data;
  },
  async deleteCard( cardId: number): Promise<void> {
    await api.delete(`/board/content/card/${cardId}`);
  },

  async getActivityLog(): Promise<ActivityLog[]> {
    const response = await api.get("/activity_log");
    return response.data;
  },
  async createActivityLog(data: {
    user_name_and_surname: string;
    action_type: string;
    action_details: string;
  }): Promise<ActivityLog> {
    const response = await api.post("/activity_log", data);
    return response.data;
  },
};
