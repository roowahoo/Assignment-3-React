import React, { useState, useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Shop() {
    // const location = useLocation()
    // const username=location.state.form.username
    // const password=location.state.form.password
    const [products, setProduct] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState({})
    const [searchSkintype, setSearchSkintype] = useState(0)
    const [searchCategory, setSearchCategory] = useState(0)
    const [searchBrand, setSearchBrand] = useState(0)

    useEffect(() => {
        const fetch = async () => {
            const productsList = await axios.get('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/products')
            setProduct(productsList.data)
            console.log(productsList.data)

            const token = await axios.get('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/shoppers/profile', {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            console.log(token.data)
            setIsLoggedIn(token.data)
        }
        fetch()
    }, [])

    const renderPrice = (item) => {
        if (item.discounted_price !== null) {
            return item.discounted_price / 100
        } else {
            return item.price / 100
        }
    }

    const renderStrikethrough = (item) => {
        if (item.discounted_price !== null) {
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

    const addToBag = async (e) => {
        console.log(e.target.value)
        if (isLoggedIn.id) {
            const response = await axios.get('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/bag/' + isLoggedIn.id + '/' + e.target.value + '/add')
            console.log(response.data)
        } else {
            alert('login')
        }

    }

    const search = async (e) => {
        if (searchSkintype) {
            const response = await axios.post('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/products/skintype', {
                'skintype_id': searchSkintype
            })
            setProduct(response.data)
            console.log(response.data)
        }
        if (searchCategory) {
            const response = await axios.post('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/products/category', {
                'category_id': searchCategory
            })
            setProduct(response.data)
            console.log(response.data)
        }
        if (searchBrand) {
            const response = await axios.post('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/products/brand', {
                'brand_id': searchBrand
            })
            setProduct(response.data)
            console.log(response.data)
        }

    }

    return (
        <React.Fragment>
            <div>
                <div className='form'>
                    <label className='form-label'>Skintype:</label>
                    <select onChange={(e) => setSearchSkintype(e.target.value)} className='form-control'>
                        <option value=''></option>
                        <option value='1'>Oily</option>
                        <option value='2'>Dry</option>
                        <option value='3'>Combination</option>
                        <option value='4'>Sensitive</option>
                    </select>
                    <label className='form-label'>Category:</label>
                    <select onChange={(e) => setSearchCategory(e.target.value)} className='form-control'>
                        <option value=''></option>
                        <option value='1'>Make-up Remover</option>
                        <option value='3'>Face Wash</option>
                        <option value='4'>Toner</option>
                        <option value='5'>Essence</option>
                        <option value='6'>Serum</option>
                        <option value='7'>Lotion</option>
                        <option value='8'>Cream</option>
                        <option value='9'>Sunblock</option>
                    </select>
                    <label className='form-label'>Brand:</label>
                    <select onChange={(e) => setSearchBrand(e.target.value)} className='form-control'>
                        <option value=''></option>
                        <option value='1'>Klairs</option>
                        <option value='3'>Cosrx</option>
                        <option value='4'>SKIN&LAB</option>
                        <option value='5'>Rovectin</option>
                    </select>
                    <div className='d-flex justify-content-end'>
                        <button onClick={search} className='btn goldBtn my-3'>Search</button>
                    </div>
                </div>
                <div className='card-div'>
                    {products.map(p => (

                        <div className="card">
                            <img className="card-img-top" src={p.image_url} alt="product_image"></img>
                            <div className="card-body">
                                <h4><b>{p.brand.brand}</b></h4>
                                <h5><b>{p.name}</b></h5>
                                <p>{p.description}</p>
                                {renderStrikethrough(p)}
                                <p>${renderPrice(p)}</p>
                                <p>{renderTags(p.tags)}</p>
                                <div className='d-flex justify-content-end'>
                                    <button class='btn btn-sm goldBtn' onClick={addToBag} name='add' value={p.id}>Add to Bag</button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}