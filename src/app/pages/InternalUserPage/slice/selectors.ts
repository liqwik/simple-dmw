import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.internalUser || initialState;

export const selectInternalUser = createSelector([selectSlice], state => state);
