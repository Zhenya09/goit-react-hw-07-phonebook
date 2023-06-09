// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addContact } from '../../store/contactsSlice';
// import { getContacts } from '../../store/selectors';
// import { nanoid } from 'nanoid';
// import { toast } from 'react-toastify';
// import css from './ContactForm.module.css';

// export const ContactForm = () => {
//   const dispatch = useDispatch();
//   const contacts = useSelector(getContacts);
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');

//   const resetForm = () => {
//     setName('');
//     setNumber('');
//   };

//   const onChangeInput = evt => {
//     const { name, value } = evt.currentTarget;
//     name === 'name' ? setName(value) : setNumber(value);
//   };

//   const onSubmitForm = evt => {
//     evt.preventDefault();

//     const contactName = name;
//     const contactNumber = number;

//     const isExist = contacts.some(
//       contact =>
//         contact.name.toLowerCase() === contactName.toLowerCase() ||
//         contact.number === contactNumber
//     );

//     if (isExist) {
//       return toast.warn(`${contactName} is already in contacts.`);
//     }

//     const contact = {
//       id: nanoid(),
//       name: contactName,
//       number: contactNumber,
//     };

//     dispatch(addContact(contact));
//     resetForm();
//   };

//   return (
//     <>
//       <form className={css.formstyle} onSubmit={onSubmitForm}>
//         <label className={css.label}>
//           Name
//           <br />
//           <input
//             className={css.input}
//             onChange={onChangeInput}
//             value={name}
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//           />
//         </label>
//         <br />
//         <label htmlFor="number">
//           Number
//           <br />
//           <input
//             className={css.input}
//             onChange={onChangeInput}
//             value={number}
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//           />
//         </label>
//         <br />
//         <button className={css.button} type="submit">
//           Add contact
//         </button>
//       </form>
//     </>
//   );
// };

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addContact } from '../../store/contactsSlice';
// import { nanoid } from 'nanoid';
// import { toast } from 'react-toastify';
// import css from './ContactForm.module.css';

// export const ContactForm = () => {
//   const dispatch = useDispatch();
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');

//   const resetForm = () => {
//     setName('');
//     setNumber('');
//   };

//   const onChangeInput = evt => {
//     const { name, value } = evt.currentTarget;
//     name === 'name' ? setName(value) : setNumber(value);
//   };

//   const onSubmitForm = async evt => {
//     evt.preventDefault();

//     const contactName = name;
//     const contactNumber = number;

//     try {
//       const backendURL = 'https://64836ad6f2e76ae1b95c73cb.mockapi.io/contacts'; // URL вашого API

//       const response = await fetch(backendURL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: contactName,
//           number: contactNumber,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add contact');
//       }

//       const contact = {
//         id: nanoid(),
//         name: contactName,
//         number: contactNumber,
//       };

//       dispatch(addContact(contact));
//       resetForm();
//     } catch (error) {
//       toast.error('Failed to add contact');
//     }
//   };

//   return (
//     <>
//       <form className={css.formstyle} onSubmit={onSubmitForm}>
//         <label className={css.label}>
//           Name
//           <br />
//           <input
//             className={css.input}
//             onChange={onChangeInput}
//             value={name}
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//           />
//         </label>
//         <br />
//         <label htmlFor="number">
//           Number
//           <br />
//           <input
//             className={css.input}
//             onChange={onChangeInput}
//             value={number}
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//           />
//         </label>
//         <br />
//         <button className={css.button} type="submit">
//           Add contact
//         </button>
//       </form>
//     </>
//   );
// };

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';
// import { toast } from 'react-toastify';
// import { addContact } from '../../store/contactsSlice';
// import { getContacts, getIsLoading, getError } from '../../store/selectors';
// import css from './ContactForm.module.css';

// export const addContactAsync = createAsyncThunk(
//   'contacts/addContact',
//   async (contact, thunkAPI) => {
//     try {
//       const response = await fetch(
//         'https://64836ad6f2e76ae1b95c73cb.mockapi.io/contacts',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(contact),
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to add contact');
//       }

//       const data = await response.json();

//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const ContactForm = () => {
//   const dispatch = useDispatch();
//   const contacts = useSelector(getContacts);
//   const isLoading = useSelector(getIsLoading);
//   const error = useSelector(getError);
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');

//   const resetForm = () => {
//     setName('');
//     setNumber('');
//   };

//   const onChangeInput = evt => {
//     const { name, value } = evt.target;
//     name === 'name' ? setName(value) : setNumber(value);
//   };

//   const onSubmitForm = evt => {
//     evt.preventDefault();

//     const contactName = name;
//     const contactNumber = number;

//     const isExist = contacts.some(
//       contact =>
//         contact.name.toLowerCase() === contactName.toLowerCase() ||
//         contact.number === contactNumber
//     );

//     if (isExist) {
//       return toast.warn(`${contactName} is already in contacts.`);
//     }

//     const contact = {
//       id: nanoid(),
//       name: contactName,
//       number: contactNumber,
//     };

//     dispatch(addContactAsync(contact))
//       .unwrap()
//       .then(() => {
//         resetForm();
//       })
//       .catch(error => {
//         console.log('Add contact failed:', error);
//       });
//   };

//   return (
//     <>
//       {isLoading && <div>Loading...</div>}
//       {error && <div>Error: {error}</div>}
//       <form className={css.formstyle} onSubmit={onSubmitForm}>
//         <label className={css.label}>
//           Name
//           <br />
//           <input
//             className={css.input}
//             onChange={onChangeInput}
//             value={name}
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//           />
//         </label>
//         <br />
//         <label htmlFor="number">
//           Number
//           <br />
//           <input
//             className={css.input}
//             onChange={onChangeInput}
//             value={number}
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//           />
//         </label>
//         <br />
//         <button className={css.button} type="submit">
//           Add contact
//         </button>
//       </form>
//     </>
//   );
// };

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { addContact } from '../../store/contactsSlice';
import { getContacts, getError } from '../../store/selectors';
import css from './ContactForm.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const error = useSelector(getError);
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

    dispatch(addContact(contact))
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch(error => {
        console.log('Add contact failed:', error);
      });
  };

  return (
    <>
      {error && <div>Error: {error}</div>}
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
