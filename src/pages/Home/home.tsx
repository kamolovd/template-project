import AddComment from '@features/addComment/ui/addComment';
import { Box, Snackbar } from '@mui/material';
import { useAppDispatch } from '@shared/hooks/useAppDispatch.ts';
import { fetchComments } from '@entities/Comment/api/index.ts';
import { commentsList } from '@entities/Comment/model/selectors.ts';
import CommentList from '@widgets/CommentsList/ui/CommentsList';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from '@shared/ui/components/Loader/Loader';

function Home() {
    const dispatch = useAppDispatch();
    const { comments, loading, error } = useSelector(commentsList);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!comments?.length) {
            dispatch(fetchComments());
        }

    }, [dispatch]);

    useEffect(() => {
        if (error) {
            setOpen(true)
        }
    }, [error])

    if (loading) return <Loader />;

    if (error) return <p>Ошибка: {error}</p>;

    return (
        <>
            <Box sx={{ marginBottom: '150px' }}>
                <CommentList comments={comments} />
                <AddComment />
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message="Error"
            />
        </>
    );
}

export default Home;
