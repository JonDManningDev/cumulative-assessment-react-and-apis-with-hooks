import React from "react";

function Album({ id, title }) {
    return (
        <p>{id} - {title}</p>
    );
};

export default Album;