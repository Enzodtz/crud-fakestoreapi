import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { User } from "types/user";
import userService from "./userService";

export interface UserState {
  users: User[];
  fulfilled: boolean;
  pending: boolean;
  error: Error | null;
}

const initialState: UserState = {
  users: [],
  fulfilled: false, // Essa não é a melhor maneira de gerenciar eventos na UI
  pending: false, // o ideal seria criar um novo slice que fizesse o controle
  error: null, // sozinho dos estados loading, erro ou sucesso. para esta
}; // aplicação, o intuito foi de não complicar tanto para facilitar o entendimento

export const readUsers = createAsyncThunk(
  "users/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.read();
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/create",
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await userService.create(user);
      return user;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await userService.update(user);
      return user;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await userService.del(user.id);
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  }
);

function makePending(state: UserState) {
  state.pending = true;
  state.fulfilled = false;
  state.error = null;
}
function makeFulfilled(state: UserState) {
  state.pending = false;
  state.fulfilled = true;
  state.error = null;
}

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.fulfilled = false;
      state.pending = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        readUsers.fulfilled,
        (state: UserState, action: PayloadAction<User[]>) => {
          state.users = action.payload;
          makeFulfilled(state);
        }
      )
      .addCase(
        createUser.fulfilled,
        (state: UserState, action: PayloadAction<User | undefined>) => {
          action.payload!.id = state.users.length + 1;
          // Sistema sempre retornava o novo ID como 1,
          // o que daria erro na hora de deletar
          state.users.push(action.payload!);
          makeFulfilled(state);
        }
      )
      .addCase(
        updateUser.fulfilled,
        (state: UserState, action: PayloadAction<User | undefined>) => {
          state.users = state.users.filter(
            (item) => item.id !== action.payload!.id
          );
          state.users.push(action.payload!);
          makeFulfilled(state);
        }
      )
      .addCase(
        deleteUser.fulfilled,
        (state: UserState, action: PayloadAction<User>) => {
          state.users = state.users.filter(
            (item) => item.id !== action.payload.id
          );
          makeFulfilled(state);
        }
      )
      .addCase(readUsers.pending, makePending)
      .addCase(createUser.pending, makePending)
      .addCase(updateUser.pending, makePending)
      .addCase(deleteUser.pending, makePending);
    // TODO: Handle error
  },
});

export const selectUsers = (state: RootState) => state.user.users;
export const selectFulfilled = (state: RootState) => state.user.fulfilled;
export const selectPending = (state: RootState) => state.user.pending;
export const selectError = (state: RootState) => state.user.error;
export default userSlice.reducer;
export const { resetStatus } = userSlice.actions;
