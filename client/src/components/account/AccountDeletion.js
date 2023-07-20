import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useFormik } from "formik";
import * as yup from "yup";
import Cookies from "js-cookie";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from '../../context/userContext';

import Error from '../building_blocks/Error';

const AccountDeletion = () => {
    const navigate = useNavigate()
    const { user, dispatch : userDispatch } = useContext(UserContext)

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        (async () => {
            const res = await fetch(`/api/v1/users/${user.id}`, { method : "DELETE" })
            if (res.ok) {
                userDispatch({ type: "fetch", payload: null })
                navigate("/confirmation")
            }
        })();
    }

    return (
        <div>
            <Button
                color="secondary"
                onClick={handleClickOpen}
                variant="text">
                    Delete account
            </Button>
            <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
                <DialogContent>
                    <Typography variant="h6">Delete your account?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="secondary"
                        onClick={handleClose}
                        variant="text">
                            Cancel
                    </Button>
                    <Button 
                        variant="contained"
                        color="error"
                        onClick={handleDelete}>
                            Delete
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
    )
}

export default AccountDeletion