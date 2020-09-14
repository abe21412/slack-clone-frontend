import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChannelsForWorkspaceAndUser = createAsyncThunk(
  "channels/fetchChannelsForWorkspaceAndUser",
  async ({ userId, workspaceId }, _ /* thunkAPI */) => {
    const res = await fetch(
      `http://localhost:8080/api/channels?userID=${userId}&workspaceID=${workspaceId}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    const { channels } = await res.json();
    console.log(channels);
    return channels;
  }
);

const channelsSlice = createSlice({
  name: "channels",
  initialState: { channels: [], loading: false, error: null },
  reducers: {},
  extraReducers: {
    [fetchChannelsForWorkspaceAndUser.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchChannelsForWorkspaceAndUser.fulfilled]: (state, action) => {
      state.channels = action.payload;
      state.loading = false;
    },
    [fetchChannelsForWorkspaceAndUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default channelsSlice.reducer;
export const fetchChannelsSelector = (state) => state.channels;
