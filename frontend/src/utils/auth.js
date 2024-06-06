import { useNavigate } from 'react-router-dom';

const auth = {
    isLoggedIn: () => {
        return localStorage.getItem('authToken') !== null;
    },
    // ... (Other authentication related functions)
};

export default auth;