import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { v4 as uuid } from "uuid";

const QuoteCarousel = ({ currentBook }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = currentBook?.quotes?.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ maxWidth: 800, flexGrow: 1, margin: "auto", py: 10 }}>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
        >
            {currentBook?.quotes.map((step, index) => (
            <div key={step.id}>
                {Math.abs(activeStep - index) <= 2 ? (
                <Box
                    sx={{
                    // height: 255,
                    display: 'block',
                    maxWidth: 800,
                    overflow: 'hidden',
                    width: '100%',
                    }}
                >
                    {step?.content.split("\n").map(line => 
                        <Typography key={uuid()} sx={{ display: "flex", flexDirection: "column" }} variant="pullquote">{line}</Typography>
                        )}
                    </Box>
                ) : null}
            </div>
            ))}
        </SwipeableViews>
        <MobileStepper
            sx={{ py: 5 }}
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
            <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
            >
                Next
                {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
                ) : (
                <KeyboardArrowRight />
                )}
            </Button>
            }
            backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
                ) : (
                <KeyboardArrowLeft />
                )}
                Back
            </Button>
            }
        />
        </Box>
    );
    }

export default QuoteCarousel;