import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl } from '@shared/api/apiUrl';
import { IComment } from 'entities/Comment/types';

export const fetchComments = createAsyncThunk<IComment[], void>(
  'comments/fetchComments',
  async () => {
    const response = await fetch(`${apiUrl}comments`);
    if (!response.ok) {
      throw new Error('Ошибка загрузки комментариев');
    }
    const responseJson = await response.json();
    localStorage.setItem('comments-list', JSON.stringify(responseJson.comments));
    return responseJson.comments as IComment[];
  }
);
