import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ActivityLog, apiService } from "../../services/api";

interface ActivityLogState {
  user_name_and_surname: string;
  logs: ActivityLog[];
  loading: boolean;
  error: string | null;
}

const initialState: ActivityLogState = {
  user_name_and_surname: "Pavel Ivanou",
  logs: [],
  loading: false,
  error: null,
};

export const fetchActivityLog = createAsyncThunk(
  "activityLog/fetchLogs",
  apiService.getActivityLog,
);

export const createActivityLog = createAsyncThunk(
  "activityLog/createLog",
  async (
    logData: { action_type: string; action_details: string },
    { getState },
  ) => {
    const state = getState() as { activityLog: ActivityLogState };
    const { user_name_and_surname } = state.activityLog;
    const response = await apiService.createActivityLog({
      user_name_and_surname,
      ...logData,
    });
    return response;
  },
);

const activityLogSlice = createSlice({
  name: "activityLog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivityLog.fulfilled, (state, action) => {
        state.logs = action.payload;
        state.loading = false;
      })
      .addCase(fetchActivityLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch activity logs.";
      });

    builder
      .addCase(createActivityLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createActivityLog.fulfilled, (state, action) => {
        state.logs.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createActivityLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create activity log.";
      });
  },
});

export default activityLogSlice.reducer;
