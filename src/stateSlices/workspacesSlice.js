import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWorkspacesForUser = createAsyncThunk(
  "workspaces/fetchWorkspacesForUser",
  async (userId, _ /* thunkAPI */) => {
    const res = await fetch(
      `http://localhost:8080/api/workspaces?userID=${userId}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    const { workspaces } = await res.json();
    console.log(workspaces);
    return workspaces;
  }
);

const workspacesSlice = createSlice({
  name: "workspaces",
  initialState: { workspaces: [], loading: true, error: null },
  reducers: {},
  extraReducers: {
    [fetchWorkspacesForUser.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchWorkspacesForUser.fulfilled]: (state, action) => {
      state.workspaces = action.payload == null ? [] : action.payload;
      state.loading = false;
    },
    [fetchWorkspacesForUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default workspacesSlice.reducer;
export const fetchWorkspacesSelector = (state) => state.workspaces;
