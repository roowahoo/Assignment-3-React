import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Account() {

    const [accountDetails, setAccountDetails] = useState({})

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/shoppers/profile', {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            console.log(response.data)
            setAccountDetails(response.data)
        }
        fetch()
    })


    return (
        <React.Fragment>
            <h1>My Account</h1>
            <div>
                <ul>
                    <li>Username:{accountDetails.username}</li>
                    <li>Email: {accountDetails.email}</li>
                    <li>Address:{accountDetails.address}</li>
                </ul>

            </div>

        </React.Fragment>
    )
}