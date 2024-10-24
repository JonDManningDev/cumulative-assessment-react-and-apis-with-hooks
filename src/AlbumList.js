import React, { useState, useEffect } from "react";
import Album from "./Album";

function AlbumList({ user = {} }) {

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        async function loadAlbums() {
            if(!user) {
                return;}
            try {
                const response = await fetch(
                  `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`,
                  { signal: abortController.signal }
                );
                const albumsData = await response.json();
                setAlbums(albumsData);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted fetch request for albums data.");
                } else {
                    console.error("Albums fetch error:", error);
                }
            }
        }
        loadAlbums();

        return () => abortController.abort();
    }, [user]);

    const list = albums.map((album, index) => {
        return <Album key={index} id={album.id} title={album.title} />
    });

    if (!user) {
        return <p className="no-user">Please click on a user name to the left</p>;       
    } else {
        return (
            <>
                <h2>{user.name} Albums</h2>
                {list}
            </>
        );
    }    
}

export default AlbumList;
