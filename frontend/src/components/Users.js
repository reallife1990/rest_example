import React from 'react'


const UserItem=({user}) => {
    return (
        <tr>
            <td>
                {user.id}
            </td>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.birthday_year}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
return (
    <div>
        <p>Users List</p>

    <table>
        <th>
            ID
        </th>
        <th>
            Username
        </th>
        <th>
            First name
        </th>
        <th>
            Last Name
        </th>
        <th>
            Birthday year
        </th>
        <th>
            email
        </th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
        </div>
    )
}
export default UserList