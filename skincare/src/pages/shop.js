import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'

export default function Shop(){
    const location=useLocation()
    // const username=location.state.form.username
    // const password=location.state.form.password
    const [products,setProduct]=useState({})

    useEffect(()=>{
        const fetch = async ()=>{
            const response=await axios.get('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/products')
            setProduct(response.data)
        }
        fetch()
    },[])

    return(
        <React.Fragment>
            <h1>Shop</h1>
            {products.map(p=>(
                <h5>{p.name}</h5>

            ))}
            
        </React.Fragment>
    )
}