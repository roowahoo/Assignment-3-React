import config from '../config'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function Login({userLoggedIn}) {
    const [formData, setFormData] = useState({
        'email': '',
        'password': ''
    })

    // const [email,setEmail]=useState('')
    // const [password,setPassword]=useState('')

    const history = useHistory()

    const login = async () => {
        try {
            const response = await axios.post(config.baseUrl + '/api/shoppers/login', {
                'email': formData.email,
                'password': formData.password
            })
            console.log(response.data)
            console.log(response.status)
            userLoggedIn(response.data);
            if (response.data !== 'Invalid Password' && response.data !== 'No user found') {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                
                history.push('/shop', {
                    'form': formData
                })
            } else if (response.data !== 'No user found') {
                alert('Invalid Password')
            } else {
                alert('No User Found')
            }

        } catch (e) {
            alert('Error logging in')

        }





    }

    const updateFormFields = (e) => {
        let clone = { ...formData }
        clone[e.target.name] = e.target.value
        setFormData(clone)

    }

    return (
        <React.Fragment>
            <h1 className='text'>Login</h1>
            <p className='text'>Login to start shopping!</p>
            <div className='form'>
                <div>
                    <label className='form-label'>Email:</label>
                    <input type='text' maxLength='350' name='email' value={formData.email} onChange={updateFormFields} className='form-control' />
                </div>
                <div>
                    <label className='form-label'>Password:</label>
                    <input type='password' maxLength='80' name='password' value={formData.password} onChange={updateFormFields} className='form-control' />
                </div>
                <div className='d-flex justify-content-end'>
                    <button onClick={login} className='btn goldBtn mt-5'>Login</button>
                </div>
            </div>

        </React.Fragment>
    )
}