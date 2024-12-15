import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8000/api/user/${userId}/update-password`, {
                current_password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: confirmPassword,
            });
            setSuccessMessage('Password updated successfully!');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to update password. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Current Password</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div>
                <label>New Password</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div>
                <label>Confirm New Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button type="submit">Update Password</button>
            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
};

export default ChangePassword;
