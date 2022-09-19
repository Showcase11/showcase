import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import loading from '../../assets/loading.gif'
export default function Loading() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
            
        }}
        >
            <img src={loading} alt="loadingImg" />
        </Box>
    );
}