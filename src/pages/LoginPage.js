// src/pages/LoginPage.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, CircularProgress, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByUsername } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.user);

    const handleLogin = async () => {
        if (!username) return;

        try {
            const resultAction = await dispatch(fetchUserByUsername(username));
            if (fetchUserByUsername.fulfilled.match(resultAction)) {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Box display="flex" alignItems="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    disabled={status === 'loading'}
                >
                    Submit
                </Button>
                {status === 'loading' && (
                    <CircularProgress size={24} sx={{ ml: 2 }} />
                )}
            </Box>
            {status === 'failed' && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {status === 'failed' && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error || 'Login failed. Please check the username.'}
                        </Typography>
                    )}
                </Typography>
            )}
        </Container>
    );
};

export default LoginPage;
