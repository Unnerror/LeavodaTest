// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { useSelector } from 'react-redux';


function App() {
    const user = useSelector((state) => state.user.data);

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
                path="/dashboard"
                element={user ? <DashboardPage /> : <Navigate to="/" />}
            />
        </Routes>
    );
}

export default App;

