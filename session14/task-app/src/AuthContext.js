import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(() => {
        const data = localStorage.getItem("loginData");
        return data ? JSON.parse(data) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("loginData", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("loginData");
    };

    const updateUser = (newUserData) => {
        setUser(newUserData);
        localStorage.setItem("loginData", JSON.stringify(newUserData));
    };

    return(
        <AuthContext.Provider value={{user, login, logout, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}