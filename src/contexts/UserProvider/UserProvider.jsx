import React, { createContext, useState } from 'react';


export const UserContext = createContext();
const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(true)
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState();
    const id = localStorage.getItem('userId');

    if (id && !user) {
        fetch(`http://localhost:5000/user/${id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data?._id) {
                    setUser(data);
                    setLoading(false)
                }
            })
    }

    // if (user) {
    //     setLoading(false)
    // }

    // useEffect(() => {
    //     if (!user) {
    //         fetch(`http://localhost:5000 /user/${id}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data);
    //                 if (data?._id) {
    //                     setUser(data);
    //                     setLoading(false)
    //                 }
    //             })
    //     }
    //     setLoading(false)
    // }, [id, user])





    const userInfo = { user, setUserId, setUser, loading, setRefresh, refresh }
    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;