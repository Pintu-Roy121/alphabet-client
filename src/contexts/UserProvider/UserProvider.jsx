import React, { createContext, useState } from 'react';


export const UserContext = createContext();
const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true)
    const [user, setUser] = useState();
    const [userId, setUserId] = useState();
    const id = localStorage.getItem('userId');

    if (id && !user) {
        fetch(`https://alphabet-task-server.vercel.app/user/${id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data?._id) {
                    setUser(data);
                    setLoading(false)
                }
            })
    }



    const userInfo = { user, setUserId, userId, setUser, loading, setRefresh, refresh }
    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;