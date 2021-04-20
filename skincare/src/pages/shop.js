import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Shop() {
    const location = useLocation()
    // const username=location.state.form.username
    // const password=location.state.form.password
    const [products, setProduct] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/products')
            setProduct(response.data)
            console.log(response.data)
        }
        fetch()
    }, [])

    const renderPrice = (item) => {
        if (item.discounted_price != 'null') {
            return item.discounted_price
        } else {
            return item.price
        }
    }

    const renderStrikethrough = (item) => {
        if (item.discounted_price != 'null') {
            return <div><s>${item.price}</s><span class="badge badge-pill badge-danger m-2">Offer</span></div>
        } else {
            return null
        }
    }

    const renderTags = (item) => {
        return (
            item.map(i => (
                <p class='badge badge-pill badge-primary m-1'>{i.tag}</p>
            ))

        )

    }

    return (
        <React.Fragment>
            <div>
                <h1>Shop</h1>
                <div className='card-div'>
                    {products.map(p => (

                        <div className="card">
                            <img className="card-img-top" src={p.image_url} alt="product_image"></img>
                            <div className="card-body">
                                <h4>{p.brand}</h4>
                                <h5>{p.name}</h5>
                                <p>{p.description}</p>
                                {renderStrikethrough(p)}
                                <p>${renderPrice(p)}</p>
                                <p>{p.category}</p>
                                <p>{p.skintype}</p>
                                <p>{renderTags(p.tags)}</p>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}