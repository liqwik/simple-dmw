import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.institution || initialState;

export const selectInstitution = createSelector([selectSlice], state => state);
