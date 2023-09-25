import React, { useState } from 'react'
import { IProduct } from '../models'
import axios from 'axios'
import { ErrorMsg } from './errorMsg'


const productData : IProduct =        {
    title: '',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic',
    rating:{
        rate:3.9,
        count:120
    }
}

interface CreateProducProps {
    onCreate: (product : IProduct) => void
}


export function CreateProduct({onCreate} :CreateProducProps){
    const [value, setValue] = useState('')
    const [error, setError] = useState('')


    const submitHandler = async  (event : React.FormEvent) => {
        event.preventDefault()

        if (value.trim().length === 0){
            setError('Please enter valid title')
            return
        }

        productData.title = value

        const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
    
        onCreate(response.data)
    
    }

    // const changeHandler = (event : React.KeyboardEvent<HTMLInputElement>) =>{
    //     setValue(event.target.value)
    // }


    return (
        <form onSubmit={submitHandler}>
            <input
                type="text"
                className="border py-2 px-4 mb-2 w-full outline-0"
                placeholder="Enter Product title..."
                value={value}
               
                onChange={event => setValue(event.target.value)}
            />

            {error && <ErrorMsg error={error} />}

            <button type="submit" className="py-2 px-4 boarder bg-yellow-400 hover:text-white">Create</button>
        </form>
    )
}