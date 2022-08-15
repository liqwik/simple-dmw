import { PayloadAction } from '@reduxjs/toolkit';
import { AppStorage } from 'utils';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { loginSaga } from './saga';
import { LoginState } from './types';

export const initialState: LoginState = {
  user: {},
  isAdmin: AppStorage.getAuthData() && AppStorage.getAuthData().isAdmin,
  loading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginAction(state, action: PayloadAction<any>) {
      state.loading = true;
      state.user = {};
      state.error = '';
    },

    loginSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.user = action.payload;
      state.isAdmin = action.payload.isAdmin;
    },

    loginFailed(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = authSlice;

export const useLoginSlice = () => {
  useInjectReducer({ key: authSlice.name, reducer: authSlice.reducer });
  useInjectSaga({ key: authSlice.name, saga: loginSaga });
  return { actions: authSlice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useLoginSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
