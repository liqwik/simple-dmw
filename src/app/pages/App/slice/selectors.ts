import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.common || initialState;

export const selectCommon = createSelector([selectSlice], state => state);
