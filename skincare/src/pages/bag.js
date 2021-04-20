import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function Bag() {

    const [bagItems, setBagItems] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState({})

    useEffect(() => {
        const fetch = async () => {
            const token = await axios.get('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/shoppers/profile', {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            console.log(token.data)
            setIsLoggedIn(token.data)


            if (isLoggedIn) {
                const bag = await axios.get('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/bag/' + token.data.id)
                console.log(bag.data)
                setBagItems(bag.data)
            }else{
                console.log('not in')
                alert('login')
            }

        }
        fetch()
    }, [])


    return (
        <React.Fragment>
            <div>
                <h1>Bag</h1>

                {bagItems.map((item) => (
                    <div>
                        <h5>{item.products.name}</h5>
                        <h5>{item.quantity}</h5>
                    </div>
                ))}

            </div>

        </React.Fragment>
    )
}