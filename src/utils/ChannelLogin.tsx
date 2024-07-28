// ChannelLogin.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChannelLogin = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loginAsChannel = async () => {
            try {
                const response = await axios.post('http://localhost:8080/login', {
                    IPAddress: "127.0.0.1",
                    ChannelID: "LN"
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const token = response.data.token;
                localStorage.setItem('chanelToken', token);
                setIsLoggedIn(true); // Set logged in state
            } catch (error) {
                console.error("Login failed", error);
                // Optionally, you can navigate to an error page or handle it differently
            }
        };

        loginAsChannel();
    }, []);

    // Optionally show a loading indicator while logging in
    if (!isLoggedIn) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default ChannelLogin;
