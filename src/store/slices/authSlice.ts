import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState, IUserData } from "@/entities/authEntity"

export const initialState: IAuthState = {
  userData: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUserData>) => {
        state.userData = action.payload;
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

export const { setUserData, setLoading, setError, reset } = authSlice.actions;
export default authSlice.reducer;