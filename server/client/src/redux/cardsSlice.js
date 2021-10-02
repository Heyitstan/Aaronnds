import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from "../constants/constants";
import socket from '../socket-connect';
import store from './store'
import checkDuplicateIds from '../util-functions/id-check';
import getResponseData from '../util-functions/get-response-data';

socket.on('postComment', comment => {
  store.dispatch(addCommentAsync(comment));
})

socket.on('updateComment', comment => {
  store.dispatch(editCommentAsync(comment));
})

socket.on('deleteComment', comment => {
  store.dispatch(removeCommentAsync(comment));
})

export const getCardAsync = createAsyncThunk(
  'cards/getCardAsync',
  async (id) => {
    const response = await axios.get(`${apiUrl}/cards/${id}`)

    const data = response.data
    return { data }
  }
)

export const editCardAsync = createAsyncThunk(
    'cards/editCardAsync',
  async (card) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }

    if (card.name){
      const response = await axios.put(`${apiUrl}/cards/${card.id}`, card.name, config)
      const data = response.data
      return { data }
    }
    if (card.description){
      const response = await axios.put(`${apiUrl}/cards/${card.id}`, card.description, config)
      const data = response.data
      return { data }
    }
  }
)

export const addActivityAsync = createAsyncThunk(
  'cards/addActivityAsync',
  async (activityObj) => {
    const response = await axios.post(`${ apiUrl }/cards/${ activityObj.card }/activity`, activityObj.activity)
    
    const data = response.data.activities;
    
    return { data }
  }
)

export const addCommentAsync = createAsyncThunk(
  'cards/addCommentAsync',
  async (commentObj) => { 
    const data = await getResponseData(`${ apiUrl }/cards/${commentObj.card}/comments`, commentObj, 'POST');
    return { data };
  }
)

export const editCommentAsync = createAsyncThunk(
  'cards/editCommentAsync',
  async (commentObj) => {
    const data = await getResponseData(`${ apiUrl }/comments/${commentObj.comment}`, commentObj, 'PUT');
    return { data };
  }
)

export const deleteCommentAsync = createAsyncThunk(
  'cards/deleteCommentAsync',
  async (commentObj) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }

    const response = await axios.delete(`${ apiUrl }/comments/${ commentObj.comment }`, config) 
    const data = response.data;
    store.dispatch(removeCommentAsync(data));
  }
)

export const removeCommentAsync = createAsyncThunk(
  'cards/removeCommentAsync',
  async (data) => {
    return { data };
  }
)

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    labels:[],
    activities: [],
    comments: []
  },
  reducers: { },
  extraReducers: {
    [getCardAsync.fulfilled]: (state, action) => {
      return action.payload.data
    },
    [editCardAsync.fulfilled]: (state, action) => { 
      const card = action.payload.data;
      state.name = card.name;
      state.description = card.description;
    },
    [addActivityAsync.fulfilled]: (state, action) => {
      state.activities.push(action.payload.data)
    },
    [addCommentAsync.fulfilled]: (state, action) => {
      if (checkDuplicateIds(state.comments, action.payload.data._id))
        return state;
      else
        state.comments.push(action.payload.data);
    },
    [editCommentAsync.fulfilled]: (state, action) => {
      const comment = action.payload.data;
      state.comments[state.comments.findIndex(({ _id }) => _id === comment._id)].text = comment.text;
    },
    [removeCommentAsync.fulfilled]: (state, action) => {
      state.comments = state.comments.filter((comment) => comment._id !== action.payload.data);
    }
  }
});

export default cardsSlice.reducer;