import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts } from '../../store/selectors';
import css from './ContactList.module.css';
import { deleteContact } from '../../store/contactsSlice';

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
