import { createContext, useState} from 'react';

const initialUser = {
    loggedIn: false,
};

export function UserContextValues() {
    const [user, setUser] = useState(initialUser);

    function loginUser () {
        console.log('loggin in...');
        setUser(prev => ({...prev, loggedIn: true}));
    }

    return {
        user,
        loginUser,
    }
}

export const UserContext = createContext(undefined);

export function UserContextProvider({ children }) {
    return (
        <UserContext.Provider value={UserContextValues()}>
            { children }
        </UserContext.Provider>
    );
}