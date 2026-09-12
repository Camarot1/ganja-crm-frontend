import { apiFetch, type Warehouses, type InfoStock } from "../../api/request";
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import './warehouses.scss'
import { WarehosesCard, ProductsCard, AddStockCard, type AddStock, type Quantity, SetQuantity } from "../../props";
import { type Products } from "../../api/request";

interface History {
    id: number
    warehouse_id: number
    product_id: number
    quantity: string
    status: string
    doing: Date
}

const InfoWarehousesPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [warehouses, setWarehouses] = useState<Warehouses[] | null>(null)
    const [infoStock, setInfoStock] = useState<InfoStock[] | null>(null)
    const [isActive, setIsActive] = useState(false)
    const [loading, setLoading] = useState(true)

    const [windowData, setWindowData] = useState<Products[] | null>(null)
    const [activeAddProduct, setActiveAddProduct] = useState<number | null>(null)
    const [activeDeleteProduct, setActiveDeleteProduct] = useState<number | null>(null)

    const [historyData, setHistoryData] = useState<History[] | null>(null)

    const loadStock = async () => {
        try {
            const data = await apiFetch<InfoStock[]>(`/warehouses/info/${id}`)
            setInfoStock(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

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
        loadStock()
        loadHistory()
    }, [])

    const loadHistory = async () => {
        try {
            const data = await apiFetch<History[]>(`/warehouses/history/${id}`)
            setHistoryData(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleStock = async (stock: AddStock) => {
        try {
            await apiFetch('/products/addstock', {
                method: 'POST',
                body: JSON.stringify({
                    warehouses_id: id,
                    quantity: stock.quantity,
                    product_id: stock.product_id

                })
            })
            alert('Товар успешно добавлен')
            window.location.reload()
        } catch (error) {
        }
    }

    const handleAddQuantity = async (data: Quantity) => {
        try {
            await apiFetch('/products/addquantity', {
                method: "POST",
                body: JSON.stringify(data)
            })
            loadStock()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteQuantity = async (data: Quantity) => {
        try {
            await apiFetch('/products/removequantity', {
                method: "POST",
                body: JSON.stringify(data)
            })
            loadStock()
        } catch (error) {
            console.log(error)
        }
    }

    const handleWindowData = async (e: number) => {
        try {
            const data = await apiFetch<Products[]>(`/products/${e}`)
            setWindowData(data)
        } catch (error) {
            console.log(error)
        }
    }


    if (loading) return (<div>Загрузка</div>)
    if (!warehouses) return (<div>Склад не найден</div>)
    return (
        <div className="info-warehouses">
            <button onClick={() => navigate(`/warehouses`)}>Список складов</button>
            {warehouses?.map(item => (
                <WarehosesCard key={item.id} {...item} />
            ))}
            <button onClick={() => setIsActive(!isActive)}>{isActive ? 'Закрыть' : 'Открыть панель добавления'}</button>
            {isActive && <div className="add-stock">
                <AddStockCard onSubmit={handleStock} />
            </div>}
            <h1>Товары</h1>
            {infoStock?.length === 0 ? (<div>Товаров на складе нет</div>)
                :
                (infoStock?.map(item => (
                    <>
                        <ProductsCard key={item.id}
                            {...item}
                            onClick={() => handleWindowData(item.id)}
                            buttonText={'Информация по товару'} />
                        <button onClick={() => setActiveAddProduct(activeAddProduct === item.id ? null : item.id)}>{activeAddProduct === item.id ? 'Закрыть' : 'Увеличение товара'}</button>
                        {activeAddProduct === item.id && <SetQuantity warehouses_id={String(id)} product_id={item.id} onSubmit={handleAddQuantity} />}
                        <button onClick={() => setActiveDeleteProduct(activeDeleteProduct === item.id ? null : item.id)}>{activeDeleteProduct === item.id ? 'Закрыть' : 'Уменьшение товара'}</button>
                        {activeDeleteProduct === item.id && <SetQuantity warehouses_id={String(id)} product_id={item.id} status='delete' onSubmit={handleDeleteQuantity} />}
                    </>
                )))
            }
            {
                historyData && (
                    historyData.map(item => (
                        <div key={item.id}>
                            <p> id: {item.id}</p>
                            <p>product_id: {item.product_id}</p>
                            <p>Количество: {item.quantity}</p>
                            <p>Действие: {item.status}</p>
                            <p>Дата: {new Date(item.doing).toLocaleString()}</p>
                        </div>
                    ))
                )
            }
            {windowData && (
                <div className="window-overlay" onClick={() => setWindowData(null)}>
                    <div className="window-content" onClick={(e) => e.stopPropagation()}>
                        {windowData.map(item => (
                            <ProductsCard
                                key={item.id}
                                {...item}
                                buttonText={'Закрыть'}
                                onClick={() => setWindowData(null)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default InfoWarehousesPage