



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateProfilePicture = () => {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const currentUserData = localStorage.getItem('currentUser');
        const userToken = localStorage.getItem('token');

        if (currentUserData) {
            const currentUser = JSON.parse(currentUserData);
            setUserId(currentUser.id);
        }

        if (userToken) {
            setToken(userToken);
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            Swal.fire({
                title: 'Invalid File!',
                text: 'Please upload an image file (JPEG, PNG, GIF).',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            Swal.fire({
                title: 'File Too Large!',
                text: 'The file size must be less than 5MB.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return;
        }

        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            Swal.fire({
                title: 'No File Selected!',
                text: 'Please choose a file before uploading.',
                icon: 'warning',
                confirmButtonText: 'Okay',
            });
            return;
        }

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        setIsLoading(true);

        try {
            await axios.post(
                `http://localhost:8000/api/users/${userId}/avatar`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            Swal.fire({
                title: 'Success!',
                text: 'Profile picture updated successfully!',
                icon: 'success',
                confirmButtonText: 'Okay',
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to update profile picture. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        } finally {
            setIsLoading(false);
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
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.8) 100%)',
                animation: 'pulse 8s infinite',
                zIndex: 1,
            }}></div>

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
                }}>Update Profile Picture</h2>

                {userId && token ? (
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
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
                        {preview && (
                            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '50%',
                                        border: '4px solid #1ce783',
                                    }}
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: isLoading ? '#999' : '#1ce783',
                                color: isLoading ? '#666' : '#000',
                                border: 'none',
                                borderRadius: '6px',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Uploading...' : 'Upload'}
                        </button>
                    </form>
                ) : (
                    <p style={{ textAlign: 'center', color: '#aaa' }}>Loading user data...</p>
                )}
            </div>

            <style>
                {`
                    @keyframes pulse {
                        0%, 100% { opacity: 0.8; }
                        50% { opacity: 1; }
                    }

                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-20px); }
                    }

                    @keyframes glow {
                        0% { box-shadow: 0 0 10px rgba(28, 231, 131, 0.5); }
                        100% { box-shadow: 0 0 20px rgba(28, 231, 131, 1); }
                    }
                `}
            </style>
        </div>
    );
};

export default UpdateProfilePicture;
    