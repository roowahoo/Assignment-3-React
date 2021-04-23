import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


export default function Bag() {

    const [bagItems, setBagItems] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState({})
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')


    const history = useHistory()

    useEffect(() => {
        const fetch = async () => {

            try {
                const token = await axios.get('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/shoppers/profile', {
                    'headers': {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })
                console.log(token.data)
                console.log(token.status)
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

    const updateFormFields = (e) => {
        let clone = [...bagItems]
        let index = bagItems.findIndex(i => i.product_id === parseInt(e.target.name))
        clone[index].quantity = e.target.value
        setBagItems(clone)

    }

    const updateQuantity = async (e) => {
        console.log(isLoggedIn.id)
        console.log(e.target.name)
        console.log(e.target.value)
        const response = await axios.post('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/bag/' + isLoggedIn.id + '/' + e.target.name + '/updateQuantity', {
            'newQuantity': e.target.value
        })
        console.log(response.data)
    }

    const removeItem = async (e) => {
        const response = await axios.get('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/bag/' + isLoggedIn.id + '/' + e.target.name + '/remove')
        console.log(response.data)
    }

    const order = async () => {

        const order = await axios.post('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/order/' + isLoggedIn.id, {
            'shopper_id': isLoggedIn.id,
            'shipping_address': address,
            'contact_number': contact
        })
        console.log(order.data)

        const updateOrder = await axios.get('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/order/' + isLoggedIn.id)
        console.log(updateOrder.data)
        history.push('/review', {
            'order': updateOrder.data
        })
    }

    return (
        <React.Fragment>
            <div>
                <div>

                    {bagItems.map((item, i) => (
                        <div className='item-row' key={item.id}>
                            <img src={item.products.image_url} className='img-thumbnail' alt='product-thumbnail'></img>
                            <div className='bagItemName'><b>{item.products.name}</b></div>
                            <div>
                                <input type='text' name={item.product_id} value={item.quantity} onChange={updateFormFields} size='2'></input>
                                <button name={item.product_id} value={item.quantity} onClick={updateQuantity} className='m-2 penCursor'>&#9998;</button>
                            </div>
                            <button name={item.product_id} onClick={removeItem} className='my-5 crossCursor'>&#9747;</button>

                        </div>

                    ))}

                    <div className='my-3'>
                        <label className='form-label'>Shipping Address:</label>
                        <input type='text' value={isLoggedIn.address} onChange={(e) => setAddress(e.target.value)} className='form-control'></input>
                    </div>
                    <div>
                        <label className='form-label'>Contact Number:</label>
                        <input type='text' onChange={(e) => setContact(e.target.value)} className='form-control'></input>
                    </div>

                </div>
                <div className='d-flex justify-content-center'>
                    <button onClick={order} className='btn goldBtn my-3'>Checkout</button>
                </div>
            </div>

        </React.Fragment>
    )
}