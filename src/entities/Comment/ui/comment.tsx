import { Avatar, Box, CardHeader, IconButton, Paper, Tooltip } from "@mui/material";

import { IComment } from "../types";
import { generateColorComment } from "@shared/utils/generateColorComment";
import { Close } from "@mui/icons-material";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { removeComment } from "../model";


export default function Comment({ id, body, user }: IComment) {
    const dispatch = useAppDispatch();

    return (
        <>
            <Paper elevation={1} sx={{ position: 'relative' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: generateColorComment()[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    title={`${user.fullName}`}
                    subheader={`${body}`}
                />
                <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                    <Tooltip title="Remove">
                        <IconButton onClick={() =>  dispatch(removeComment(id))}>
                            <Close />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Paper>
        </>
    )
};