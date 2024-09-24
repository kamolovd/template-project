import { FC } from 'react';
import { IComment } from 'entities/Comment/types/index.ts';
import Comment from '@entities/Comment/ui/comment';
import { Box } from '@mui/material';

interface Props {
  comments: IComment[];
}

const CommentList:FC<Props> = ({ comments }) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
      {comments.map(comment => (
        <Comment key={comment.id} id={comment.id} body={comment.body} user={comment.user}/>
      ))}
    </Box>
  );
};

export default CommentList;
