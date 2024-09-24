export interface User {
  id: number;
  username: string;
  fullName: string;
}

export interface IComment {
  id: number;
  body: string;
  postId?: number;
  likes?: number;
  user?: User;
}


export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface CommentsState {
  comments: IComment[];
  loading: boolean;
  error: string | null;
  status: StatusType;
}
