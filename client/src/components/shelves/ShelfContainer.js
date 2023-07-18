import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useContext, useEffect, useState } from "react"
import { ShelfContext } from '../../context/shelfContext';
import { UserContext } from '../../context/userContext';
import { BookShelfContext } from '../../context/bookShelfContext';

import Shelf from "./Shelf"

const defaultTheme = createTheme()

const ShelfContainer = () => {
    const { user } = useContext(UserContext)
    const { shelves, dispatch: shelfDispatch } = useContext(ShelfContext)

    return (
            <Box sx={{ paddingLeft: 10, paddingRight: 10 }}  maxWidth="lg">
                {shelves?.map((shelf) => <Shelf key={shelf.id} shelf={shelf} />)}
            </Box>
    )
}

export default ShelfContainer