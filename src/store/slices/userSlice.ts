import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from "@/entities/userEntity"
import { User } from 'dhinta-turborepo/packages/shared';

const initialState: IUserState = {
  userList: [],
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserList: (state, action: PayloadAction<Array<User>>) => {
      state.userList = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    reset: (state) => {
      state = initialState;
    }
  },
});

export const { setUserList, setLoading, setError, reset } = authSlice.actions;
export default authSlice.reducer;