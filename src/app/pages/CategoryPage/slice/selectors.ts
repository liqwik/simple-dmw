import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.category || initialState;

export const selectCategory = createSelector([selectSlice], state => state);
