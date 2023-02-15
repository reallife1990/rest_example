import React from 'react'


const AuthorItem=({author}) => {
    // console.log({author})
    return (
        <tr>
            <td>
                {author.first_name}
            </td>
            <td>
                {author.last_name}
            </td>
            <td>
                {author.birthday_year}
            </td>
        </tr>
    )
}

const AuthorList = ({authors}) => {
return (
    <table>
        <th>
            First name1
        </th>
        <th>
            Last Name
        </th>
        <th>
            Birthday year
        </th>
            {authors.map((author) => <AuthorItem author={author} />)}
        </table>
    )
}
export default AuthorList