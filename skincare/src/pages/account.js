import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Account() {

    const [accountDetails, setAccountDetails] = useState({})
    const [password, setPassword] = useState('')
    

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
    }, [])

    const updateUsername=(e)=>{
        let clone={...accountDetails}
        clone.username=e.target.value
        setAccountDetails(clone)
    }

    const updateEmail=(e)=>{
        let clone={...accountDetails}
        clone.email=e.target.value
        setAccountDetails(clone)
    }

    const updateAddress=(e)=>{
        let clone={...accountDetails}
        clone.address=e.target.value
        setAccountDetails(clone)
    }




    const update = async () => {
        console.log('here')
        console.log(accountDetails.username)
        const response = await axios.post('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/shoppers/profile/' + accountDetails.id + '/update', {
            'username': accountDetails.username,
            'email': accountDetails.email,
            'address': accountDetails.address,
            'password':password
        })
        console.log(response.data)
        
    }



    return (
        <React.Fragment>
            <h1>My Account</h1>
            <div>
                <div>
                    <label className='form-label'>Username:</label>
                    <input onChange={updateUsername} type='text' value={accountDetails.username} className='form-control' name='username'></input>
                </div>
                <div>
                    <label className='form-label'>Email:</label>
                    <input onChange={updateEmail} type='text' value={accountDetails.email} className='form-control'></input>
                </div>
                <div>
                    <label className='form-label'>Address:</label>
                    <input onChange={updateAddress} type='text' value={accountDetails.address} className='form-control'></input>
                </div>
                <div>
                    <label className='form-label'>Password:</label>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type='text' className='form-control'></input>
                </div>
                <div className='d-flex justify-content-end'>
                <button onClick={update} className='btn goldBtn my-3'>Update</button>
                </div>
            </div>

        </React.Fragment >
    )
}