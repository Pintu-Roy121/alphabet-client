import React, { createContext, useEffect, useState } from 'react';


export const UserContext = createContext();
const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [userId, setUserId] = useState();
    const id = localStorage.getItem('userId')

    if (id && !user) {
        fetch(`http://localhost:5000/user/${id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
            })
    }




    const userInfo = { user, setUserId, setUser }
    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;