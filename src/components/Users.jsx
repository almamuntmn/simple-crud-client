import React, { use, useState } from 'react';

const Users = ({ usersPromise }) => {
    const initialUsers = use(usersPromise);
    const [users, setUsers] = useState(initialUsers);

    console.log(initialUsers);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const newUser = { name, email };
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
                if (data.insertedId) {
                    newUser._id = data.insertedId;
                    const newUsers = [...users, newUser];
                    setUsers(newUsers);
                    alert('user created successfully');
                    form.reset();
                }
            })
    }

    const handleUserDelete =(id)=>{
       fetch(`http://localhost:3000/users/${id}`, {
           method: 'DELETE'
       })
       .then(res => res.json())
       .then(data => {
           console.log('after deleting', data);
        if (data.deletedCount) {
            const remaining = users.filter(user => user._id !== id);
            setUsers(remaining);
        }
           
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

            <div>
                {
                    users.map(user => <p 
                        key={user._id}>
                            {user.name} : {user.email}
                            <button onClick={() => handleUserDelete(user._id)}>x</button>
                            </p>)           
                            }
            </div>
        </div>
    );
};

export default Users;