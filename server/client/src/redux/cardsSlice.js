import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from "../constants/constants";
import socket from '../socket-connect';
import store from './store';
import checkDuplicateIds from '../util-functions/id-check';
import getResponseData from '../util-functions/get-response-data';

socket.on('newCard', card => {
  store.dispatch(addCardAsync(card));
})

export const getCardsAsync = createAsyncThunk(
  'cards/getCardsAsync',
  async (id) => {
    const response = await axios.get(`${apiUrl}/lists/${id}/cards`);
    const data = response.data
    return { data }
  })

export const addCardAsync = createAsyncThunk(
  'cards/addCardAsync',
  async (newCardObj) => {
    const data = getResponseData(`${apiUrl}/lists/${newCardObj.listId}/cards`, newCardObj.name)
    return { data }
  });

export const deleteCardAsync = createAsyncThunk(
    'cards/deleteCardAsync',
  async (id) => {
    const response = await axios.delete(`${apiUrl}/cards/${id}`)
    const data = response.data
    return { data }
  }
) 
export const editCardAsync = createAsyncThunk(
    'cards/editCardAsync',
  async (card) => {
    const response = await axios.put(`${apiUrl}/cards/${card.id}`, card)
    const data = response.data
    return { data }
  }
)

const cardsSlice = createSlice({
  name: 'cards',
  initialState: [],
  reducers: { },
  extraReducers: {
    [getCardsAsync.fulfilled]: (state, action) => {
      console.log(action.payload.response.data)
      return action.payload.data
    },
    [addCardAsync.fulfilled]: (state, action) => {
      state.push(action.payload.data)
    },
    [deleteCardAsync.fulfilled]: (state, action) => {
      //same as boardsSlice question
      return state.filter((card) => card.id !== action.payload.data.id);
    }
  }
});

export default cardsSlice.reducer;