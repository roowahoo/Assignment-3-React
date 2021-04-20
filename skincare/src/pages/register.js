import React, { useState } from 'react'
import axios from 'axios'

export default function Register() {

    const [formData, setFormData] = useState({
        'username': '',
        'email': '',
        'password': '',
        'address': ''
    })

    const updateFormFields=(e)=>{
        let clone={...formData}
        clone[e.target.name]=e.target.value
        setFormData(clone)

    }

    const register = async()=>{
        const response=await axios.post('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/shoppers/register',{
            'username':formData.username,
            'email':formData.email,
            'password':formData.password,
            'address':formData.address
        })
        console.log(response.data)
        
    }


    return (
        <React.Fragment>
            <div>
                <label className='form-label'>Username:</label>
                <input type='text' name='username' value={formData.username} onChange={updateFormFields} className='form-control'/>
            </div>
            <div>
                <label className='form-label'>Email:</label>
                <input type='text' name='email' value={formData.email} onChange={updateFormFields} className='form-control' />
            </div>
            <div>
                <label className='form-label'>Password:</label>
                <input type='text' name='password' value={formData.password} onChange={updateFormFields} className='form-control' />
            </div>
            <div>
                <label className='form-label'>Address:</label>
                <input type='text' name='address' value={formData.address} onChange={updateFormFields} className='form-control' />
            </div>
            <button onClick={register} className='btn btn-primary mt-3'>Register</button>


        </React.Fragment>
    )
}