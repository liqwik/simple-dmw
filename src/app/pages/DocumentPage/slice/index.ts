import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { DocumentSaga } from './saga';
import { DocumentState } from './types';

export const initialState: DocumentState = {
  items: [],
  itemDetail: {},
  totalItem: 0,
  isSubmitting: false,
  isLoading: false,
  validationErrors: [],
  serviceError: '',
};

const slice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    resetAction(state) {
      state.itemDetail = {};
      state.serviceError = '';
      state.validationErrors = [];
      state.isSubmitting = false;
      state.isLoading = false;
    },
    failure(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.isSubmitting = false;
      state.validationErrors = action.payload;
    },
    getListAction(state, action?: PayloadAction<any>) {
      state.isLoading = true;
    },
    getDetailAction(state, action?: PayloadAction<any>) {
      state.isLoading = true;
    },
    getTotalItemAction(state, action?: PayloadAction<any>) {},
    addAction(state, action: PayloadAction<any>) {
      state.isSubmitting = true;
    },
    updateAction(state, action: PayloadAction<any>) {
      state.isSubmitting = true;
    },
    getListSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.serviceError = '';
      state.items = action.payload;
    },
    getListFail(state, action: PayloadAction<any>) {
      state.serviceError = action.payload;
      state.isLoading = false;
    },
    getDetailSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.serviceError = '';
      state.itemDetail = action.payload;
    },
    getDetailFail(state, action: PayloadAction<any>) {
      state.serviceError = action.payload;
      state.isLoading = false;
    },
    getTotalItem(state, action: PayloadAction<number>) {
      state.totalItem = action.payload;
    },
    addOne(state, action: PayloadAction<any>) {
      state.isSubmitting = false;
    },
    updateOne(state, action: PayloadAction<any>) {
      state.isSubmitting = false;
    },
  },
});

export const { actions: DocumentActions } = slice;

export const useDocumentSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: DocumentSaga });
  return { actions: slice.actions };
};
