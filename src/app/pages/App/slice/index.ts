import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { CommonState } from './types';

export const initialState: CommonState = {
  status: 200,
};

const slice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    success(state, action: PayloadAction<any>) {
      state.status = 200;
    },

    unauthorized(state) {
      state.status = 401;
    },

    forbidden(state) {
      state.status = 403;
    },
  },
});

export const { actions: commonActions } = slice;

export const useCommonSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
};
