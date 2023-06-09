import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../store/contactsSlice';
import { getContacts } from '../../store/selectors';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import css from './ContactForm.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const onChangeInput = evt => {
    const { name, value } = evt.currentTarget;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const onSubmitForm = evt => {
    evt.preventDefault();

    const contactName = name;
    const contactNumber = number;

    const isExist = contacts.some(
      contact =>
        contact.name.toLowerCase() === contactName.toLowerCase() ||
        contact.number === contactNumber
    );

    if (isExist) {
      return toast.warn(`${contactName} is already in contacts.`);
    }

    const contact = {
      id: nanoid(),
      name: contactName,
      number: contactNumber,
    };

    dispatch(addContact(contact));
    resetForm();
  };

  return (
    <>
      <form className={css.formstyle} onSubmit={onSubmitForm}>
        <label className={css.label}>
          Name
          <br />
          <input
            className={css.input}
            onChange={onChangeInput}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <br />
        <label htmlFor="number">
          Number
          <br />
          <input
            className={css.input}
            onChange={onChangeInput}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <br />
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};
