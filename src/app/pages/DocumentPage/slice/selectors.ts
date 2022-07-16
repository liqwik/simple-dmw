import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.document || initialState;

export const selectDocument = createSelector([selectSlice], state => state);
