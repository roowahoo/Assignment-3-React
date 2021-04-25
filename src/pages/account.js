import config from '../config'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function Account() {

    const [accountDetails, setAccountDetails] = useState({})
    const [password, setPassword] = useState('')

    const history = useHistory()


    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(config.baseUrl+'/api/shoppers/profile', {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            console.log(response.data)
            setAccountDetails(response.data)

        }
        fetch()
    }, [])

    const updateUsername = (e) => {
        let clone = { ...accountDetails }
        clone.username = e.target.value
        setAccountDetails(clone)
    }

    const updateEmail = (e) => {
        let clone = { ...accountDetails }
        clone.email = e.target.value
        setAccountDetails(clone)
    }

    const updateAddress = (e) => {
        let clone = { ...accountDetails }
        clone.address = e.target.value
        setAccountDetails(clone)
    }

    const update = async () => {
        console.log('here')
        console.log(accountDetails.username)
        const response = await axios.post(config.baseUrl+'/api/shoppers/profile/' + accountDetails.id + '/update', {
            'username': accountDetails.username,
            'email': accountDetails.email,
            'address': accountDetails.address,
            'password': password
        })
        console.log(response.data)

    }
    const logout = async () => {
        const response = await axios.post(config.baseUrl + '/api/shoppers/logout', {
            'refreshToken': localStorage.getItem('refreshToken')
        })
        console.log(response.data)
        localStorage.setItem('accessToken', null);
        localStorage.setItem('refreshToken', null);
        history.push('/shop')
    }



    return (
        <React.Fragment>
            <h1 className='text'>Profile</h1>
            <p className='text'>Update your details below!</p>
            <div>
                <div>
                    <label className='form-label'>Username:</label>
                    <input onChange={updateUsername} type='text' maxLength='100' value={accountDetails.username} className='form-control' name='username'></input>
                </div>
                <div>
                    <label className='form-label'>Email:</label>
                    <input onChange={updateEmail} type='text' maxLength='350' value={accountDetails.email} className='form-control'></input>
                </div>
                <div>
                    <label className='form-label'>Address:</label>
                    <input onChange={updateAddress} type='text' maxLength='500' value={accountDetails.address} className='form-control'></input>
                </div>
                <div>
                    <label className='form-label'>Password:</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type='text' maxLength='80' className='form-control'></input>
                </div>
                <div className='d-flex justify-content-between'>
                    <button onClick={update} className='btn goldBtn my-3'>Update</button>
                    <button onClick={logout} className='btn goldBtn my-3'>Logout</button>
                </div>
            </div>

        </React.Fragment >
    )
}