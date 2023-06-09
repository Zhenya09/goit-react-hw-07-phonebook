// import { createSlice } from '@reduxjs/toolkit';


// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: { items: [] },
//   reducers: {
//     addContact: (state, action) => {
//       state.items = [...state.items, action.payload];
//     },
//     deleteContact: (state, action) => {
//       state.items = state.items.filter(contact => contact.id !== action.payload);
//     },
  
//   },
// });

// export const { addContact, deleteContact, setFilter } = contactsSlice.actions;
// export default contactsSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
//   try {
//     const response = await fetch('/contacts'); // Вставте URL вашого бекенду
//     if (!response.ok) {
//       throw new Error('Failed to fetch contacts');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error('Failed to fetch contacts');
//   }
// });

// export const addContact = createAsyncThunk('contacts/addContact', async contact => {
//   try {
//     const response = await fetch('/contacts', { // Вставте URL вашого бекенду
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(contact),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to add contact');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error('Failed to add contact');
//   }
// });

// export const deleteContact = createAsyncThunk('contacts/deleteContact', async id => {
//   try {
//     const response = await fetch(`https://64836ad6f2e76ae1b95c73cb.mockapi.io/contacts/${id}`, { // Вставте URL вашого бекенду
//       method: 'DELETE',
//     });
//     if (!response.ok) {
//       throw new Error('Failed to delete contact');
//     }
//     return id;
//   } catch (error) {
//     throw new Error('Failed to delete contact');
//   }
// });

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: { items: [], isLoading: false, error: null },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchContacts.pending, state => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchContacts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchContacts.rejected, state => {
//         state.isLoading = false;
//         state.error = 'Failed to fetch contacts';
//       })
//       .addCase(addContact.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//       })
//       .addCase(deleteContact.fulfilled, (state, action) => {
//         state.items = state.items.filter(contact => contact.id !== action.payload);
//       });
//   },
// });

// export default contactsSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://64836ad6f2e76ae1b95c73cb.mockapi.io/contacts');

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data = await response.json();
      // console.log(data);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await fetch(
        'https://64836ad6f2e76ae1b95c73cb.mockapi.io/contacts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contact),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add contact');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      });
  },
});

export default contactsSlice.reducer;