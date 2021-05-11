import config from '../config'
import React,{useEffect} from 'react'
import axios from 'axios'

export default function Home({userLoggedIn}){


    useEffect(()=>{
        const fetch=async()=>{
            try{
                const token = await axios.get(config.baseUrl + '/api/shoppers/profile', {
                    'headers': {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })
                userLoggedIn(token.data)

            }catch(e){
                console.log('User not logged in')
            }
        }
        fetch()
    })
    return (
        <React.Fragment>
            <h1 className='text'>Welcome to The Skin Shop</h1>
            <p className='text'>Here, you will find all the skincare products you will ever need!</p>
        </React.Fragment>
    )
}