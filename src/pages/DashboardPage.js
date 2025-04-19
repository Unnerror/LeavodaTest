// src/pages/DashboardPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Button } from '@mui/material';
import ProfileCard from '../components/ProfileCard';
import { logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    if (!user) return null;

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Welcome, {user.firstName}!
            </Typography>
            <ProfileCard user={user} />
            <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ mt: 3 }}>
                Logout
            </Button>
        </Container>
    );
};

export default DashboardPage;
