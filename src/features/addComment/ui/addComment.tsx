import { Avatar, Box, IconButton, Paper, TextField, Tooltip } from "@mui/material";
import { AddComment as AddIcon } from '@mui/icons-material';
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { addComment } from "@entities/Comment/model";
import { emoticonSymbols } from "../data";

export default function AddComment() {
    const dispatch = useAppDispatch();
    const [comment, setComment] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null)


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        localStorage.setItem('input-value', event.target.value)
        setComment(event.target.value);

    }

    const handleFocus = () => {
        localStorage.setItem("input-focused", JSON.stringify(true));
    }
    const handleBlur = () => {
        localStorage.setItem("input-focused", JSON.stringify(false));
    }

    const addEmoji = (emoji: string) => {
        setComment(prev => {
            localStorage.setItem('input-value', prev += emoji);
            return prev;
        })
    }

    const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newObj = {
            id: Date.now(),
            body: comment,
            user: {
                id: Date.now(),
                fullName: 'Me',
                username: 'My full Name'
            }
        }
        dispatch(addComment(newObj));
        setComment('')
        localStorage.setItem('input-value', '')
        window.scrollTo({
            top: document.documentElement.scrollHeight + 100,
            behavior: 'smooth',
        });
    }

    // input save
    useEffect(() => {
        const value = localStorage.getItem('input-value') || "";
        const isFocues = localStorage.getItem('input-focused') || "";
        if (isFocues === "true") {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }
        setComment(value)
    }, [])

    // scroll save
    useEffect(() => {
        const handleScroll = () => {
            localStorage.setItem('scrollPosition', JSON.stringify(window.scrollY));
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    useEffect(() => {
        const savedScrollPosition = localStorage.getItem("scrollPosition");

        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
        }

    }, [])


    return (
        <>
            <Box sx={{ position: 'fixed', bottom: '0', left: '0', width: '100%' }}>
                <Paper elevation={3} sx={{ padding: '1rem' }}>
                    <Box sx={{ display: 'flex', gap: '10px', paddingBottom: '1rem', fontSize: '1.5rem' }}>
                        {emoticonSymbols.map((emoji: string) => <Box sx={{ cursor: 'pointer' }} onClick={() => addEmoji(emoji)} key={emoji}>{emoji}</Box>)}
                    </Box>
                    <form onSubmit={handleAddComment}>
                        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Box>
                                <Avatar />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <TextField inputProps={{ ref: inputRef }} onFocus={handleFocus} onBlur={handleBlur} value={comment} onChange={handleChange} placeholder="your comment..." sx={{ borderRadius: '8px !important' }} fullWidth />
                            </Box>
                            <Box sx={{ width: '4%' }}>
                                <Tooltip title="Add comment">
                                    <IconButton type="submit">
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </form>
                </Paper >
            </Box >
        </>
    )
}
