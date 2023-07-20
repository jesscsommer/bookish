import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Filter from '../building_blocks/Filter';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { useContext, useState } from "react"
import { BookContext } from '../../context/bookContext';
import useTitle from '../../hooks/useTitle';

import BookCard from './BookCard';
import Loading from '../building_blocks/Loading';
import QuoteCard from './QuoteCard';

const QuoteContainer = ({ currentBook }) => {

    return (
            <Box sx={{ py: 5, paddingLeft: 10, paddingRight: 10 }} 
                    maxWidth="xl"
                    justifyContent="right"
                    >
                <Grid container spacing={4}>
                {currentBook?.quotes.map((quote) => (
                    <QuoteCard key={quote.id} quote={quote} />
                ))}
                </Grid>
            </Box>
    );
}

export default QuoteContainer;