import { useNavigate } from 'react-router-dom'
import {apiFetch, type Products} from '../../api/request'
import {useState, useEffect} from 'react'
import { ProductsCard } from '../../props'
const ProductPage = ()=>{
    const [products, setProducts] = useState<Products[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect( ()=>{
        async function load (){
            try{
                const data = await apiFetch<Products[]>('/products')
                setProducts(data)
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        load()
    }, [])

    if(loading) return (<div>Загрузка</div>)

    return(
        <div>
            <button onClick={() => navigate(-1)}>Вернутся назад</button>
            {products.map(item=>(
                <ProductsCard key={item.id} {...item} />
            ))}
        </div>
    )
}

export default ProductPage