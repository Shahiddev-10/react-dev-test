import { createSelector } from 'reselect';

const getContacts = (state) => state.contacts;
const getCurrentPage = (state) => state.page;

export const allContacts = createSelector(getContacts, items => items);
export const currentPage = createSelector(getCurrentPage, items => items);