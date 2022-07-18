import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { categorySaga } from './saga';
import { CategoryState } from './types';

export const initialState: CategoryState = {
  items: [],
  totalItem: 0,
  isSubmitting: false,
  isLoading: false,
  validationErrors: [],
  serviceError: '',
};

const slice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getListAction(state, _action?: PayloadAction<any>) {
      state.isLoading = true;
    },
    getTotalItemAction(_state, _action?: PayloadAction<any>) {},
    addAction(state, _action: PayloadAction<any>) {
      state.isLoading = true;
      state.isSubmitting = true;
    },
    updateAction(state, _action: PayloadAction<any>) {
      state.isLoading = true;
      state.isSubmitting = true;
    },
    removeAction(state, _action: PayloadAction<any>) {
      state.isLoading = true;
    },
    failure(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.isSubmitting = false;
      state.validationErrors = action.payload;
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
    getTotalItem(state, action: PayloadAction<number>) {
      state.totalItem = action.payload;
    },
    addOne(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.isSubmitting = false;
      state.totalItem = state.totalItem + 1;

      state.items.length = state.items.length - 1;
      state.items.unshift({ ...action.payload });
    },
    removeOne(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalItem = state.totalItem - 1;
    },
    updateOne(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.isSubmitting = false;

      state.items = state.items.map(item => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }

        return item;
      });
    },
  },
});

export const { actions: categoryActions } = slice;

export const useCategorySlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: categorySaga });
  return { actions: slice.actions };
};
