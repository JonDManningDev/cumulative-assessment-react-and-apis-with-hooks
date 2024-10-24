import React, { useState, useEffect } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Load data from https://jsonplaceholder.typicode.com/albums?userId=${user.id}

  useEffect(() => {
    console.log("Users:", users);
  }, [users]);

  useEffect(() => {
    console.log("Current user:", currentUser);
  }, [currentUser]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        { signal: abortController.signal }
      );
        const usersData = await response.json();
        setUsers(usersData);
        
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted fetch request for users data.");
        } else {
          console.error("Users fetch error:", error);
        }
      }   
    }
    loadUsers();
    
    
    return () => abortController.abort();
  }, []);

  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} />
      </div>
      <div className="right column">
        <AlbumList user={currentUser} />
      </div>
    </div>
  );
}

export default App;
