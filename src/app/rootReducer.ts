import { combineReducers } from 'redux';
import commentSlice from '@entities/Comment/model/index.ts';

const rootReducer = combineReducers({
  commentSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
