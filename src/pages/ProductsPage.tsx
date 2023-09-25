import { Product } from '../components/product'
import { useProducts } from '../hooks/products'
import { Loader } from '../components/loader'
import {ErrorMsg} from '../components/errorMsg'
import { Modal } from '../components/modal'
import { CreateProduct } from '../components/CreateProduct'
import { useContext} from 'react'
import { IProduct } from '../models'
import { ModalContext } from '../context/ModalContext'

export function ProductPage() {
    const {error, loading, products, addProduct } = useProducts()
    const {modal, open, close } = useContext(ModalContext)
  
  
    const createHandler = ( product : IProduct) =>{
      close()
      addProduct(product)
    }
  
    return(
      <div className="conteiner mx-auto max-w-2xl pt-5">
        
        { loading && <Loader />}
        { error && <ErrorMsg error={error} />}
        { products.map(product => <Product product={product} key={product.id} />)}
  
        {modal && <Modal title="Create new product" onClose={close}>
          <CreateProduct onCreate={createHandler}/>
        </Modal>}
  
        <button 
            className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2"
            onClick={open}
          >Create new</button>
      </div>
      
    )
}
