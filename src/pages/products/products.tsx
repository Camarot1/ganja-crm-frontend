import { useNavigate } from 'react-router-dom'
import { apiFetch, type Products } from '../../api/request'
import { useState, useEffect } from 'react'
import { ProductsCard, ProductsSearch } from '../../props'
import './products.scss'
const ProductPage = () => {
    const [products, setProducts] = useState<Products[]>([])
    const [loading, setLoading] = useState(true)

    const [openMenu, setOpenMenu] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        async function load() {
            try {
                const data = await apiFetch<Products[]>('/products')
                setProducts(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    if (loading) return (<div>Загрузка</div>)

    return (
        <div className="productsPage">
            <div className="products__buttons">
                <button onClick={() => navigate('/addproducts')}>Добавить товар</button>
                <button onClick={() => navigate('/')}>На главную</button>
                <button onClick={()=> setOpenMenu(!openMenu)}>{openMenu ? 'Закрыть': 'Поиск товаров'}</button>
            </div>
            {openMenu && <ProductsSearch props={products}/>}
            <div className="products__list">
                {products.map(item => (
                    <ProductsCard key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}

export default ProductPage