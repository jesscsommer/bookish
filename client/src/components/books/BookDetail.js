import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorContext } from '../../context/errorContext';


const BookDetail = () => {
    const { id : book_id } = useParams()
    const { errors, dispatch: errorDispatch } = useContext(ErrorContext)
    const [ currentBook, setCurrentBook ] = useState(null)

    useEffect(() => {
        (async () => {
            const res = await fetch(`/books/${book_id}`)
            if (res.ok) {
                const bookData = await res.json()
                setCurrentBook(bookData)
            } else {
                const errorData = await res.json()
                errorDispatch({ type: "add", payload: errorData })
            }
        })();
    }, [book_id])

    return (
        <Box display="flex" alignItems="top">
            <Box
                component="img"
                sx={{
                    width: 300,
                    // height: 300,
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
                alt="alt text"
                src={currentBook?.cover_photo}
            />
            <Box sx={{ padding: "0 5em 0 5em" }}>
                <Typography variant="h4">
                    {currentBook?.title}
                </Typography>
                <Typography variant="h6">
                    {currentBook?.author.full_name}
                </Typography>
                <Typography variant="body1">
                    {currentBook?.description}
                </Typography>
            </Box>
        </Box>
    )
}

export default BookDetail