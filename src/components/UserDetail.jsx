import React from 'react';
import { useLoaderData } from 'react-router';

const UserDetail = () => {
    const user = useLoaderData();
    console.log(user);
    return (
        <div>
            <h1>User Detail</h1>
            <h3>Name: {user.name}</h3>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserDetail;