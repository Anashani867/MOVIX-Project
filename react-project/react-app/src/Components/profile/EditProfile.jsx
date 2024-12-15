import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditProfile = () => {
    const { userId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${userId}`)
            .then((response) => {
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    newPassword: '',
                    confirmPassword: '',
                });
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
            });
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            Swal.fire({
                title: 'Error!',
                text: 'Passwords do not match!',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
            return;
        }

        if (formData.newPassword && formData.newPassword.length < 8) {
            Swal.fire({
                title: 'Error!',
                text: 'Password must be at least 8 characters long.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
            return;
        }

        const formDataToSend = {
            name: formData.name,
            email: formData.email,
            password: formData.newPassword || undefined,
        };

        try {
            await axios.put(`http://localhost:8000/api/users/${userId}`, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            Swal.fire({
                title: 'Success!',
                text: 'Profile updated successfully!',
                icon: 'success',
                confirmButtonText: 'Great!',
            });
        } catch (error) {
            Swal.fire({
                title: 'Oops!',
                text: error.response?.data?.message || 'Failed to update profile. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div style={{
            fontFamily: `'Graphik', sans-serif`,
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
        }}>
            {/* Moving Movie Icons */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                overflow: 'hidden',
            }}>
                {Array.from({ length: 20 }).map((_, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            fontSize: `${Math.random() * 2 + 1}rem`,
                            color: 'rgba(255, 255, 255, 0.2)',
                            animation: `moveIcon ${Math.random() * 15 + 10}s linear infinite`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    >
                        {['🎥', '🎬', '🎞️', '🍿'][Math.floor(Math.random() * 4)]}
                    </div>
                ))}
            </div>

            <div style={{
                position: 'relative',
                zIndex: 2,
                maxWidth: '500px',
                width: '100%',
                padding: '2rem',
                backgroundColor: 'rgba(26, 28, 32, 0.95)',
                borderRadius: '12px',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(28, 231, 131, 0.3)',
            }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    color: '#1ce783',
                    textShadow: '0 0 10px rgba(28, 231, 131, 0.8)',
                }}>Edit Profile</h2>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="name" style={{ color: '#aaa', fontSize: '1rem' }}>Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#333',
                                border: 'none',
                                borderRadius: '6px',
                                color: '#fff',
                                marginTop: '0.5rem',
                                fontSize: '1rem',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="email" style={{ color: '#aaa', fontSize: '1rem' }}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#333',
                                border: 'none',
                                borderRadius: '6px',
                                color: '#fff',
                                marginTop: '0.5rem',
                                fontSize: '1rem',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="newPassword" style={{ color: '#aaa', fontSize: '1rem' }}>New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#333',
                                border: 'none',
                                borderRadius: '6px',
                                color: '#fff',
                                marginTop: '0.5rem',
                                fontSize: '1rem',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="confirmPassword" style={{ color: '#aaa', fontSize: '1rem' }}>Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#333',
                                border: 'none',
                                borderRadius: '6px',
                                color: '#fff',
                                marginTop: '0.5rem',
                                fontSize: '1rem',
                            }}
                        />
                    </div>
                    <button type="submit" style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#1ce783',
                        color: '#000',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        boxShadow: '0 0 10px rgba(28, 231, 131, 0.8)',
                        transition: 'all 0.3s ease',
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        Update Profile
                    </button>
                </form>
            </div>

            <style>
                {`
                    @keyframes moveIcon {
                        from { transform: translate(-50%, -50%) translateY(100vh); }
                        to { transform: translate(-50%, -50%) translateY(-100vh); }
                    }
                `}
            </style>
        </div>
    );
};

export default EditProfile;
