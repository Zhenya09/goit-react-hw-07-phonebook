// import { createSelector } from 'reselect';

// export const getContacts = state => state.contacts.items;
// export const getFilter = state => state.filter;

// export const getFilteredContacts = createSelector(
//   [getContacts, getFilter],
//   (contacts, filter) => {
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//     }
  
// );


import { createSelector } from 'reselect';

export const getContacts = state => state.contacts.items;
export const getFilter = state => state.filter;
export const getIsLoading = state => state.contacts.loading;
export const getError = state => state.contacts.error;

export const getFilteredContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);