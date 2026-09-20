import { apiFetch, type Warehouses, type InfoStock } from "../../api/request";
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import './warehouses.scss'
import { WarehosesCard, ProductsCard, AddStockCard, type AddStock, type Quantity, SetQuantity, HistoryProps} from "../../props";
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
    const [productsList, setProductsList] = useState<Products[] | null>(null)
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
    }, [])
    useEffect(() => {
        if (historyData || windowData) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [historyData, windowData]);

    const loadHistory = async () => {
        try {
            const data = await apiFetch<History[]>(`/warehouses/history/${id}`)
            setHistoryData(data)
        } catch (error) {
            console.log(error)
        }
    }

    const loadProductsList = async () =>{
        try{
            const data = await apiFetch<Products[]>('/products')
            setProductsList(data)
        }catch(error){
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
            const response: any = await apiFetch('/products/removequantity', {
                method: "POST",
                body: JSON.stringify(data)
            })

            alert(response.message)
            loadStock()
        } catch (error: any) {
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
            <div className="warehouses__buttons">
                <button onClick={() => navigate(`/warehouses`)}>Список складов</button>
                <button onClick={() => loadHistory()}>История действий на складе</button>
            </div>
            {warehouses?.map(item => (
                <WarehosesCard key={item.id} {...item} />
            ))}
            <div>
                <div className="warehouses__buttons">
                    <button onClick={() => setIsActive(!isActive)}>{isActive ? 'Закрыть' : 'Открыть панель добавления'}</button>
                </div>
                {isActive && <div className="add-stock">
                    <button onClick={() => loadProductsList()}>Загрузить список </button>
                    <AddStockCard onSubmit={handleStock} />
                </div>}
            </div>
            <h1 className="title">Товары</h1>
            <div className="infoStock">
                {infoStock?.length === 0 ? (<div>Товаров на складе нет</div>)
                    :
                    (infoStock?.map(item => (
                        <>
                            <div className="block" key={item.id}>
                                <ProductsCard key={item.id}
                                    {...item}
                                    onClick={() => handleWindowData(item.id)}
                                    buttonText={'Информация по товару'} />
                                <button onClick={() => setActiveAddProduct(activeAddProduct === item.id ? null : item.id)}>{activeAddProduct === item.id ? 'Закрыть' : 'Увеличение товара'}</button>
                                {activeAddProduct === item.id && <SetQuantity warehouses_id={id} product_id={String(item.id)} onSubmit={handleAddQuantity} />}
                                <button onClick={() => setActiveDeleteProduct(activeDeleteProduct === item.id ? null : item.id)}>{activeDeleteProduct === item.id ? 'Закрыть' : 'Уменьшение товара'}</button>
                                {activeDeleteProduct === item.id && <SetQuantity warehouses_id={id} product_id={String(item.id)} status='delete' onSubmit={handleDeleteQuantity} />}
                            </div>
                        </>
                    )))
                }
            </div>
            {
                historyData && (
                    <div className="window-overlay" onClick={() => setHistoryData(null)}>
                        <div className="window-content" onClick={(e) => e.stopPropagation()}>
                            {historyData.map(item => (
                                <HistoryProps key={item.id} {...item} />
                            ))}
                        </div>
                    </div>
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
            {productsList && (
                <div className="window-overlay" onClick={() => setProductsList(null)}>
                    <div className="window-content" onClick={(e) => e.stopPropagation()}>
                        {productsList.map(item => (
                            <ProductsCard
                                key={item.id}
                                {...item}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default InfoWarehousesPage