import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

const baseUrl='https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io'

export default function Login(){
    const [formData, setFormData]=useState({
        'email':'',
        'password':''
    })

    // const [email,setEmail]=useState('')
    // const [password,setPassword]=useState('')

    const history=useHistory()

    const login =async ()=>{
        history.push('/shop',{
            'form':formData
        })
        const response=await axios.post(baseUrl+'/api/shoppers/login',{
            'email':formData.email,
            'password':formData.password
        })
        
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        console.log(response.data)
        
    }

    const updateFormFields=(e)=>{
        let clone={...formData}
        clone[e.target.name]=e.target.value
        setFormData(clone)

    }

    return(
        <React.Fragment>
            <h1>Home</h1>
            {/* <div>
                <label className='form-label'>Username:</label>
                <input type='text' name='username' value={formData.username} onChange={updateFormFields} className='form-control'/>
            </div> */}
            <div>
                <label className='form-label'>Email:</label>
                <input type='text' name='email' value={formData.email} onChange={updateFormFields} className='form-control'/>
            </div>
            <div>
                <label className='form-label'>Password:</label>
                <input type='text' name='password' value={formData.password} onChange={updateFormFields} className='form-control'/>
            </div>
            <button onClick={login} className='btn btn-primary mt-3'>Login</button>

        </React.Fragment>
    )
}