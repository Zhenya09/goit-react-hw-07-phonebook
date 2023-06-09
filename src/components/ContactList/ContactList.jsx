import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFilteredContacts } from '../../store/selectors';
import css from './ContactList.module.css';

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await fetch(
        `https://64836ad6f2e76ae1b95c73cb.mockapi.io/contacts/${contactId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ContactList = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

  const delContact = contactId => {
    dispatch(deleteContact(contactId))
      .unwrap()
      .catch(error => {
        console.log('Delete contact failed:', error);
      });
  };

  return (
    <ul className={css.list}>
      {filteredContacts.map(contact => {
        return (
          <li className={css.item} key={contact.id}>
            {contact.name}: {contact.number}
            <button onClick={() => delContact(contact.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
