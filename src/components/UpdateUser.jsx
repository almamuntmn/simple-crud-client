import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {
    const user = useLoaderData();
    console.log(user);

    const handleUpdateUser = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const updatedUser = { name, email };
        console.log(updatedUser);

        // update user in the database
        fetch(`http://localhost:3000/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log('data after updating user', data);
                if (data.modifiedCount) {
                    alert('user updated successfully');
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleUpdateUser}>
                <input type="text" name='name' defaultValue={user.name} />
                <br />
                <input type="email" name='email' defaultValue={user.email} />
                <br />
                <button>Update</button>
            </form>
        </div>
    );
};

export default UpdateUser;