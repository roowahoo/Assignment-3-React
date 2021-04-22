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
                const token = await axios.get('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/shoppers/profile', {
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
    }, [])
    return (
        <React.Fragment>
            <h1>Review and Payment</h1>
            <div>
                {bagItems.map((item, i) => (
                    <div className='item-row' key={item.id}>
                        <img src={item.products.image_url} className='img-thumbnail' alt='product-thumbnail'></img>
                        <div><b>{item.products.name}</b></div>
                        <div>{item.quantity}</div>

                    </div>

                ))}
                <div>
                    <h1>Order Details</h1>
                    <p>Name: {isLoggedIn.username}</p>
                    <p>Shipping Address: {address}</p>
                    <p>Contact: {contact}</p>
                </div>
            </div>

        </React.Fragment>
    )

}