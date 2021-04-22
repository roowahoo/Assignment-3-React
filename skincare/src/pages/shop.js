import React, { useState, useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Shop() {
    // const location = useLocation()
    // const username=location.state.form.username
    // const password=location.state.form.password
    const [products, setProduct] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState({})
    const [searchSkintype,setSearchSkintype]=useState('')

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
            return item.discounted_price
        } else {
            return item.price
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
        }else{
            alert('login')
        }

    }

    const search=async(e)=>{
        if(searchSkintype){
            const response=await axios.post('https://3000-indigo-orangutan-nf30a8jb.ws-us03.gitpod.io/api/products/skintype',{
                'skintype_id':parseInt(searchSkintype)
            })
            setProduct(response.data)
            console.log(response.data)
        }
       
    }

    return (
        <React.Fragment>
            <div>
                <h1>Shop</h1>
                <label className='form-label'>Skintype:</label>
                <select onChange={(e)=>setSearchSkintype(e.target.value)} className='form-control'>
                    <option value=''>--Select--</option>
                    <option value='1'>Oily</option>
                    <option value='2'>Dry</option>
                    <option value='3'>Combination</option>
                    <option value='4'>Sensitive</option>
                </select>
                <button onClick={search}>Search</button>
                <div className='card-div'>
                    {products.map(p => (

                        <div className="card">
                            <img className="card-img-top" src={p.image_url} alt="product_image"></img>
                            <div className="card-body">
                                <h4>{p.brand.brand}</h4>
                                <h5>{p.name}</h5>
                                <p>{p.description}</p>
                                {renderStrikethrough(p)}
                                <p>${renderPrice(p)}</p>
                                <p>{p.category.name}</p>
                                <p>{p.skintype.skintype}</p>
                                <p>{renderTags(p.tags)}</p>
                                <button class='btn btn-sm btn-primary' onClick={addToBag} name='add' value={p.id}>Add to Bag</button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}