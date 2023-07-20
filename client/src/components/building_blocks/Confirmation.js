import { Box, Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
    const navigate = useNavigate()

    return (
        <Box 
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flexWrap: "wrap",
                alignContent: "center",
                py: 10
            }}>
            <Box
                component="img"
                sx={{
                    borderRadius: "50%",
                    maxHeight: 200,
                    maxWidth: 200,
                    margin: "auto"
                }}
                alt="Open book with blank pages and folded glasses on top"
                src="../blankbookcropped.jpg"
            />
            <Typography sx={{ py: 5 }} variant="h3">Account erased</Typography>
            <IconButton onClick={() => navigate("/")}>
                <HomeOutlinedIcon />
            </IconButton>
        </Box>
    )
}

export default Confirmation