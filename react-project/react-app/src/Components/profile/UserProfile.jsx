import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUserData = localStorage.getItem('currentUser');
        const userToken = localStorage.getItem('token');

        if (currentUserData) {
            const currentUser = JSON.parse(currentUserData);
            const userId = currentUser.id;

            axios
                .get(`http://localhost:8000/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                })
                .then((response) => setUser(response.data))
                .catch((error) => console.error('Error fetching user:', error));
        } else {
            console.error('No user data found in local storage');
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        delete axios.defaults.headers["Authorization"];
        navigate('/login');
    };

    if (!user) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#000',
                color: '#fff',
            }}>
                <div style={{
                    border: '6px solid rgba(28, 231, 131, 0.3)',
                    borderTop: '6px solid #1ce783',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    animation: 'spin 1s linear infinite',
                }}></div>
            </div>
        );
    }

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
                {Array.from({ length: 15 }).map((_, index) => (
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
                maxWidth: '400px',
                width: '100%',
                padding: '2rem',
                backgroundColor: 'rgba(26, 28, 32, 0.95)',
                borderRadius: '12px',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(28, 231, 131, 0.3)',
                textAlign: 'center',
            }}>
                <img
                    src={`http://localhost:8000${user.avatar}`}
                    alt={`${user.name}'s Avatar`}
                    style={{
                        width: '140px',
                        height: '140px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginBottom: '1rem',
                        border: '6px solid rgba(28, 231, 131, 0.5)',
                        boxShadow: '0 0 15px rgba(28, 231, 131, 0.8)',
                        animation: 'float 4s ease-in-out infinite',
                        transition: 'transform 0.3s ease',
                    }}
                />
                <h2 style={{
                    fontSize: '2rem',
                    margin: '0.5rem 0',
                    transition: 'color 0.3s ease',
                }}>{user.name}</h2>
                <p style={{
                    color: '#aaa',
                    fontSize: '1rem',
                    marginBottom: '1.5rem',
                }}>{user.email}</p>

                <div>
                    <Link
                        to={`/profile/${user.id}/edit`}
                        style={{
                            display: 'inline-block',
                            margin: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'transparent',
                            color: '#1ce783',
                            border: '2px solid #1ce783',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 0 10px rgba(28, 231, 131, 0.5)',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#1ce783';
                            e.currentTarget.style.color = '#000';
                            e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#1ce783';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        Edit Profile
                    </Link>
                    <Link
                        to={`/profile/${user.id}/update-picture`}
                        style={{
                            display: 'inline-block',
                            margin: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'transparent',
                            color: '#1ce783',
                            border: '2px solid #1ce783',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 0 10px rgba(28, 231, 131, 0.5)',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#1ce783';
                            e.currentTarget.style.color = '#000';
                            e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#1ce783';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        Update Picture
                    </Link>
                </div>
                <button
                    onClick={logout}
                    style={{
                        marginTop: '1.5rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#1ce783',
                        color: '#000',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        width: '100%',
                        transition: 'background-color 0.3s ease, transform 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#16b468';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#1ce783';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    Logout
                </button>
            </div>

            <style>
                {`
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }

                    @keyframes moveIcon {
                        from { transform: translate(-50%, -50%) translateY(100vh); }
                        to { transform: translate(-50%, -50%) translateY(-100vh); }
                    }

                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                `}
            </style>
        </div>
    );
};

export default UserProfile;
