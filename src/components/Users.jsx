import React from 'react';

const Users = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const newUser = {name, email};
        console.log(newUser);

        // create user in the database
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
            })
        .then(res => res.json())
        .then(data => {
            console.log('data after creating user', data);
        })
    }
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='name' placeholder='Name' />
                    <br />
                    <input type="email" name='email' placeholder='Email' />
                    <br />
                    <button type='submit' name='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Users;