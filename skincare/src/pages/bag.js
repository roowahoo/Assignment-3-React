import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


export default function Bag() {

    const [bagItems, setBagItems] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState({})


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
        let index =bagItems.findIndex(i=>i.product_id===parseInt(e.target.name))
        clone[index].quantity=e.target.value
        setBagItems(clone)

    }

    const updateQuantity = async (e) => {
        console.log(isLoggedIn.id)
        console.log(e.target.name)
        console.log(e.target.value)
        const response = await axios.post('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/bag/' + isLoggedIn.id + '/' + e.target.name +'/updateQuantity', {
            'newQuantity': e.target.value
        })
        console.log(response.data)
    }

    return (
        <React.Fragment>
            <div>
                <h1>Bag</h1>
                <div>

                    {bagItems.map((item,i) => (
                        <div class='item-row' key={item.id}>
                            <img src={item.products.image_url} class='img-thumbnail'></img>
                            <div><b>{item.products.name}</b></div>
                            <div>{item.quantity}</div>

                                <input type='text' class='quantity' name={item.product_id} value={item.quantity} onChange={updateFormFields} ></input>
                                <button name={item.product_id} value={item.quantity} onClick={updateQuantity}>Update</button>
                           
                        </div>

                    ))}

                </div>
            </div>

        </React.Fragment>
    )
}