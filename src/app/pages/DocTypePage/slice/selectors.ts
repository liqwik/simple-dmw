import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.docType || initialState;

export const selectDocType = createSelector([selectSlice], state => state);
