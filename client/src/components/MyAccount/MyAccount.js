import React, { useEffect, useState } from "react";
import usersService from "../../services/users";

const MyAccount = () => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
          const loggedUserJSON = window.localStorage.getItem('loggedUser');
          if (loggedUserJSON) {
            const storedUser = JSON.parse(loggedUserJSON);
            try {
              const completeUser = await usersService.getOneByUserName(storedUser.username);
              setUser(completeUser);

            } catch (error) {
              console.error('Failed to fetch user:', error);
            }
          }
        };
      
        fetchUser();
    }, []);
      

    return (
    <div>
             

    </div>
    );
}

export default MyAccount;