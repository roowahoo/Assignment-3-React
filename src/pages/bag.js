import config from '../config'
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
                const token = await axios.get(config.baseUrl + '/api/shoppers/profile', {
                    'headers': {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    }
                })
                console.log(token.data)
                console.log(token.status)
                setIsLoggedIn(token.data)

                const bag = await axios.get(config.baseUrl + '/api/bag/' + token.data.id)
                console.log(bag.data)
                setBagItems(bag.data)

            } catch (e) {
                alert('Please login')
                history.push('/login')
            }

        }
        fetch()
    }, [history])

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
        const response = await axios.post(config.baseUrl + '/api/bag/' + isLoggedIn.id + '/' + e.target.name + '/updateQuantity', {
            'newQuantity': e.target.value
        })
        console.log(response.data)
    }

    const removeItem = async (e) => {
        const response = await axios.get(config.baseUrl + '/api/bag/' + isLoggedIn.id + '/' + e.target.name + '/remove')
        window.location.reload()
        console.log(response.data)
    }

    const order = async () => {
        if (address === '' || contact === '') {
            alert('Please enter all fields')
        } else {
            const order = await axios.post(config.baseUrl + '/api/order/' + isLoggedIn.id, {
                'shopper_id': isLoggedIn.id,
                'shipping_address': address,
                'contact_number': contact
            })
            console.log(order.data)

            const updateOrder = await axios.get(config.baseUrl + '/api/order/' + isLoggedIn.id)
            console.log(updateOrder.data)
            history.push('/review', {
                'order': updateOrder.data
            })

        }


    }

    const renderPrice = (item) => {
        if (item.products.discounted_price !== null) {
            return item.products.discounted_price / 100 * item.quantity
        } else {
            return item.products.price / 100 * item.quantity
        }
    }

    return (
        <React.Fragment>
            <div>

                {bagItems.map((item) => (
                    // <div className='container'>
                    <div className='item-row row' key={item.id}>
                        <div className='col-3'>
                            <img src={item.products.image_url} className='img-thumbnail' alt='product-thumbnail'></img>
                        </div>

                        <div className='bagItemName col-5'><b>{item.products.name}</b></div>

                        <div className='col-4 d-flex justify-content-center'>
                            <input type='text' name={item.product_id} value={item.quantity} onChange={updateFormFields} size='1'></input>
                            <button name={item.product_id} value={item.quantity} onClick={updateQuantity} className='m-1 checkCursor'>&#10004;</button>
                            <h5 className='pt-1 ps-1'>${renderPrice(item)}</h5>
                        </div>
                        <div className="w-100"></div>
                        <div className='mx-auto'>
                            <button name={item.product_id} onClick={removeItem} className='crossCursor'>&#10006;</button>
                        </div>

                    </div>
                    // </div>

                ))}

                <div className='my-3'>
                    <label className='form-label'>Shipping Address:</label>
                    <input type='text' maxLength='500' onChange={(e) => setAddress(e.target.value)} className='form-control' required></input>
                </div>
                <div>
                    <label className='form-label'>Contact Number:</label>
                    <input type='tel' maxLength='12' value={contact} onChange={(e) => setContact(e.target.value)} className='form-control' required></input>
                </div>

            </div>
            <div className='d-flex justify-content-center'>
                <button onClick={order} className='btn goldBtn my-3'>Checkout</button>
            </div>

        </React.Fragment>
    )
}