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
    // const [ shelves, setShelves ] = useState(user?.shelves)
    const { shelves, dispatch: shelfDispatch } = useContext(ShelfContext)
    // const { bookShelves, dispatch : bookShelfDispatch } = useContext(BookShelfContext)

    // console.log(bookShelves)
    // console.log(bookShelves[0].shelf)
    // const test = bookShelves.map(bs => console.log(bs.shelf))

    // const { shelves, dispatch: shelfDispatch } = useContext(ShelfContext)

    // useEffect(() => {
    //     shelfDispatch({ type: "set", payload: user?.shelves })
    // }, [])


    return (
            <Box sx={{ paddingLeft: 10, paddingRight: 10 }}  maxWidth="lg">
                {shelves?.map((shelf) => <Shelf key={shelf.id} shelf={shelf} />)}
                {/* <Grid container spacing={4}>
                {shelves?.map((shelf) => (
                    <Box key={shelf.id} mb={3} sx={{ maxHeight: "100%", objectFit: "contain" }}>
                        <Shelf key={shelf.id} shelf={shelf} />
                    </Box>
                ))}
                </Grid> */}
            </Box>
    )
}

export default ShelfContainer