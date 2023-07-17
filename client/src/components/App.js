import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddShelfForm from "./shelves/AddShelfForm";
import AuthForm from "./account/AuthForm";
import BookCard from "./books/BookCard";
import BooksContainer from "./books/BooksContainer";
import BookDetail from "./books/BookDetail";
import Buttons from "./building_blocks/Buttons";
import DeleteButton from "./building_blocks/DeleteButton";
import EditButton from "./building_blocks/EditButton";
import EditProfileForm from "./account/EditProfileForm";
import Error from "./building_blocks/Error";
import Header from "./building_blocks/Header";
import Profile from "./account/Profile";
import Shelf from "./shelves/Shelf";
import ShelfContainer from "./shelves/ShelfContainer";
import NotFound from "./building_blocks/NotFound";
import Filter from "./building_blocks/Filter";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { orange, purple } from "@mui/material/colors";

const Syne =  "'Syne', sans-serif";
const YoungSerif = "YoungSerif";
const Karla = "'Karla', sans-serif";
const Inter = "'Inter', sans-serif";
const SpaceMono = "'Space Mono', monospace";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#FF6B1C',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#E3E1E1',
        },
        error: {
            main: '#FF1D0F',
        },
        warning: {
            main: '#FFAE29',
        },
        info: {
            main: '#0383FF',
        },
        success: {
            main: '#36FF85',
        },
    },    
    typography: {
        fontFamily: Karla, 
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700, 
        h1: {
            fontFamily: YoungSerif
        },
        h2: {
            fontFamily: YoungSerif
        },
        h3: {
            fontFamily: YoungSerif
        },
        h4: {
            fontFamily: YoungSerif
        },
        h5: {
            fontFamily: YoungSerif
        },
        h6: {
            fontFamily: YoungSerif
        }
    }
})

const App = () => {
    const { user } = useContext(UserContext)

    return (
        <ThemeProvider theme={theme}> 
            <div className="app">
            <Header />
            <Routes>
                <Route 
                path="/login" 
                element={
                    <AuthForm />
                }/>
                <Route 
                    path="/shelves" 
                    element={
                        <ShelfContainer />
                    }/>
                <Route 
                    path="/profile/:username" 
                    element={
                        <Profile />
                    }/>
                <Route 
                    path="/books/:id" 
                    element={
                        <BookDetail />
                    }/>
                <Route 
                    path="/" 
                    element={
                        <BooksContainer />
                    }/>
                <Route 
                    path="*" 
                    element={
                        <NotFound />
                    }/>
            </Routes>
            </div>
        </ThemeProvider>
    )
}

export default App
