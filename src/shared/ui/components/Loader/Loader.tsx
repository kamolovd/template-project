import { Box, CircularProgress } from "@mui/material";


export default function Loader () {
    return (
        <>
            <Box sx={{textAlign: 'center'}}>
                <CircularProgress />
            </Box>
        </>
    )
}