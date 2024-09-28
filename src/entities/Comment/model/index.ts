import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentsState, StatusType } from '../types/index.ts';
import { IComment } from '@entities/Comment/types';
import { fetchComments } from '../api/index.ts';

const initialState: CommentsState = {
  comments: JSON.parse(localStorage.getItem('comments-list')) || [],
  loading: false,
  error: null,
  status: 'idle',
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, { payload }: PayloadAction<IComment>): void => {
      state.comments.push(payload);
      localStorage.setItem('comments-list', JSON.stringify(state.comments))
    },
    removeComment: (state, {payload}: PayloadAction<number>):void => {
      state.comments = state.comments.filter((item) => item.id !== payload);
      localStorage.setItem('comments-list', JSON.stringify(state.comments))
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setStatus(state, action: PayloadAction<StatusType>) {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message || 'Неизвестная ошибка';
      });
  },
});

export const { addComment,removeComment } = commentSlice.actions;

export default commentSlice.reducer;
