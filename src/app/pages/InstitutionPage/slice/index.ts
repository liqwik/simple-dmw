import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { institutionSaga } from './saga';
import { InstitutionState } from './types';

export const initialState: InstitutionState = {
  items: [],
  totalItem: 0,
  isSubmitting: false,
  isLoading: false,
  validationErrors: [],
  serviceError: '',
  searchTerm: '',
};

const slice = createSlice({
  name: 'institution',
  initialState,
  reducers: {
    searchAction(state, action?: PayloadAction<any>) {
      state.searchTerm = action?.payload;
    },
    getListAction(state, action?: PayloadAction<any>) {
      state.isLoading = true;
    },
    getTotalItemAction(state, action?: PayloadAction<any>) {},
    addAction(state, action: PayloadAction<any>) {
      state.isLoading = true;
      state.isSubmitting = true;
    },
    updateAction(state, action: PayloadAction<any>) {
      state.isLoading = true;
      state.isSubmitting = true;
    },
    removeAction(state, action: PayloadAction<any>) {
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

      if (state.items.length >= 20) {
        state.items.length = state.items.length - 1;
      }

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

export const { actions: institutionActions } = slice;

export const useInstitutionSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: institutionSaga });
  return { actions: slice.actions };
};
