import { apiFetch, type Products } from '../../api/request'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProductsCard } from '../../props'
const InfoProductsPage = () => {
    const { id } = useParams<{ id: string }>()
    const [product, setProducts] = useState<Products[] | null>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        async function load() {
            if (!id) navigate('/products')
            try {
                const data = await apiFetch<Products[]>(`/products/${id}`)
                setProducts(data)
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        load()
    }, [])


    if(loading) (<div>ЗАГРУЗКА</div>)
    return (
        <div>
            <button onClick={() => navigate(-1)}>Вернутся назад</button>
            {product?.map(item => (
                <ProductsCard key={item.id} {...item} />
            ))}
        </div>

    )
}

export default InfoProductsPage