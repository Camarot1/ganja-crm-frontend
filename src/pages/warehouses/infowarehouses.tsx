import { apiFetch, type Warehouses, type InfoStock } from "../../api/request";
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import './warehouses.scss'
import { WarehosesCard, ProductsCard } from "../../props";

const InfoWarehousesPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [warehouses, setWarehouses] = useState<Warehouses[] | null>(null)
    const [infoStock, setInfoStock] = useState<InfoStock[] | null>(null)
    const [isActive, setIsActive] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        async function load() {
            if (!id) navigate('/warehouses')
            try {
                const data = await apiFetch<Warehouses[]>(`/warehouses/${id}`)
                setWarehouses(data)
            } catch (error) {
                console.log(error)
            }
        }
        load()
        async function loadStock() {
            try {
                const data = await apiFetch<InfoStock[]>(`/warehouses/info/${id}`)
                setInfoStock(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        loadStock()
    }, [])


    if (loading) return (<div>Загрузка</div>)
    if (!warehouses) return (<div>Склад не найден</div>)
    return (
        <div>
            <button onClick={() => navigate(`/warehouses`)}>Список складов</button>
            {warehouses?.map(item => (
                <WarehosesCard key={item.id} {...item} />
            ))}
            <button onClick={() => setIsActive(!isActive)}>{isActive ? 'Закрыть' : 'Открыть' }</button>
            <div className="add-stock">
                
            </div>
            <h1>Товары</h1>
            {infoStock?.length === 0 ? (<div>Товаров на складе нет</div>)
                :
                ( infoStock?.map(item => (
                    <ProductsCard key={item.id} 
                    {...item}
                     onClick={() => navigate(`/infoproducts/${item.id}`)}  
                     buttonText ={'Информация по товару'}/>
                )))
            }
        </div>
    )
}

export default InfoWarehousesPage