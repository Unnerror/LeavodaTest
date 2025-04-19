// src/components/ProfileCard.js
import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';

const ProfileCard = ({ user }) => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Avatar src={user.image} alt={user.firstName} sx={{ width: 80, height: 80 }} />
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                        <Typography>Gender: {user.gender}</Typography>
                        <Typography>Age: {user.age}</Typography>
                    </Grid>
                </Grid>

                <Typography sx={{ mt: 2 }}><strong>Address:</strong> {user.address.address}, {user.address.city}, {user.address.state}</Typography>
                <Typography><strong>Company:</strong> {user.company.name}, {user.company.department}</Typography>
                <Typography><strong>Title:</strong> {user.company.title}</Typography>
                <Typography><strong>Contact:</strong> {user.phone} | {user.email}</Typography>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
