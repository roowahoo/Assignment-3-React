import config from '../config'
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Review() {

    const [isLoggedIn, setIsLoggedIn] = useState({})
    const [bagItems, setBagItems] = useState([])

    const history = useHistory()
    const location = useLocation()
    const address = location.state.order.shipping_address
    const contact = location.state.order.contact_number

    useEffect(() => {
        const fetch = async () => {

            try {
                const token = await axios.get(config.baseUrl + '/api/shoppers/profile', {
                    'headers': {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })
                console.log(token.data)
                setIsLoggedIn(token.data)

                const bag = await axios.get('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/bag/' + token.data.id)
                console.log(bag.data)
                setBagItems(bag.data)

            } catch (e) {
                alert('Please login')
                history.push('/login')
            }

        }
        fetch()
    }, [history])


    return (
        <React.Fragment>
            <h4 className='text-center'>Review and Payment</h4>
            <div>
                {bagItems.map((item, i) => (
                    <div className='item-row row' key={item.id}>
                        <img src={item.products.image_url} className='img-thumbnail col-3' alt='product-thumbnail'></img>
                        <div className='col-5'><b>{item.products.name}</b></div>
                        <div className='col-4'>Qty: {item.quantity}</div>
                    </div>

                ))}
                <div className='mt-2'>
                    <h4 className='text-center'>Order Details</h4>
                    <p>Name: {isLoggedIn.username}</p>
                    <p>Shipping Address: {address}</p>
                    <p>Contact: {contact}</p>
                </div>
                <div className='d-flex justify-content-end'>
                    <a className='btn goldBtn' href={'https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/checkout/' + isLoggedIn.id}>Pay</a>
                </div>
            </div>

        </React.Fragment>
    )

}