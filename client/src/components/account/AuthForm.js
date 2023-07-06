import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState, useContext, useEffect } from "react";

import { useFormik } from "formik";
import * as yup from "yup";

const defaultTheme = createTheme();

const AuthForm = () => {
    const [ isLogin, setIsLogin ] = useState(false)

    const userSchema = yup.object().shape({
        username: yup
        .string()
        .min(5, "Username must be at least 5 characters")
        .max(20, "Username must be at most 20 characters")
        .test(
            "valid-chs",
            "Username may only contain letters and numbers",
            (value) => {
            return /^[A-z0-9]+$/.test(value);
            }
        )
        .required("Username is required"),
        password: yup
        .string()
        .min(10, "Password must be at least 10 characters")
        .required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: userSchema,
        onSubmit: (values) => {
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(res => {
                if (res.ok) {
                    res.json()
                    .then(data => {
                        console.log(data)
                    })
                } else {
                    res.json()
                    .then(err => console.log(err.error))
                }
            })
            .catch(err => console.log(err))
        }
    })

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    {isLogin ? "Log in" : "Sign up"}
                    </Typography>
                    <Box 
                        component="form" 
                        onSubmit={formik.handleSubmit} 
                        noValidate sx={{ mt: 1 }}
                        >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    {isLogin ? null :
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            // autoFocus
                        />}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isLogin ? "Log in" : "Sign up"}
                    </Button>
                    <Grid container>
                        <Grid item>
                        <Link onClick={() => setIsLogin(isLogin => !isLogin)} variant="body2">
                            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log in"}
                        </Link>
                        </Grid>
                    </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default AuthForm