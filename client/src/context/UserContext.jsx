import { createContext, useState} from 'react';

const initialUser = {
    loggedIn: false,
};

const initialProducts =[];

export function UserContextValues() {
    const [user, setUser] = useState(initialUser);
    const [products, setProducts] = useState(initialProducts);

    function loginUser () {
        setUser(prev => ({...prev, loggedIn: true}));
    }

    function updateProducts (newProducts) {
        setProducts(newProducts);
    }

    return {
        user,
        products,
        loginUser,
        updateProducts,
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