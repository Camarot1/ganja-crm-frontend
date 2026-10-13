import { useState, useEffect, useCallback } from "react";
import { apiFetch, type Warehouses, type InfoStock } from "../../api/request";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsCard, WarehouseSlotsProps, WarehouseInfoProps, SlotsItemsProps } from "../../props";
import { type WarehouseSlots, type WarehouseInfo } from "../../props"
import './warehouses.scss'


const LayoutWarehouses = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [ifTextMenuOpen, setTextMenuOpen] = useState(false)

    const [activeButton, setActiveButton] = useState(false)

    const [warehouseCode, setWarehouseCode] = useState<string>('Название склада')

    const [hightlight, setHighlight] = useState<InfoStock | null>(null)


    const [warehouseInfo, setWarehouseInfo] = useState<WarehouseInfo>({
        totalSlots: 12,
        freeSlots: 5,
        occupiedSlots: 7,
        totalStock: 100,
        allocated: 30,
        unlocated: 70
    })
    const [warehouseSlots, setWarehouseSlots] = useState<WarehouseSlots[] | null>([
        {
            id: 1,
            warehouse_id: 1,
            code: '001',
            is_active: true,
            products: [
                {
                    "id": 6,
                    "name": "Электрочайник",
                    "sku": "electric-05",
                    "quantity": 2
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": 2
                }
            ]
        },
        {
            id: 2,
            warehouse_id: 1,
            code: '002',
            is_active: true,
            products: [
                {
                    "id": 6,
                    "name": "Электрочайник",
                    "sku": "electric-05",
                    "quantity": 2
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": 2
                }
            ]
        },
        {
            id: 3,
            warehouse_id: 1,
            code: '003',
            is_active: true,
            products: [
                {
                    "id": 6,
                    "name": "Электрочайник",
                    "sku": "electric-05",
                    "quantity": 2
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": 2
                }
            ]
        },
        {
            id: 4,
            warehouse_id: 1,
            code: '004',
            is_active: true,
            products: [
                {
                    "id": 6,
                    "name": "Электрочайник",
                    "sku": "electric-05",
                    "quantity": 2
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": 2
                }
            ]
        },
        {
            id: 5,
            warehouse_id: 1,
            code: '005',
            is_active: true,
            products: [
                {
                    "id": 6,
                    "name": "Электрочайник",
                    "sku": "electric-05",
                    "quantity": 2
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": 2
                },
                {
                    "id": 2,
                    "name": "Монитор",
                    "sku": "electric-02",
                    "quantity": 2
                }
            ]
        },
        {
            id: 6,
            warehouse_id: 1,
            code: '006',
            is_active: true,
            products: [
                {
                    "id": 6,
                    "name": "Электрочайник",
                    "sku": "electric-05",
                    "quantity": 2
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": 2
                }
            ]
        },
        {
            id: 7,
            warehouse_id: 1,
            code: '007',
            is_active: true,
            products: [
                {
                    "id": 6,
                    "name": "Электрочайник",
                    "sku": "electric-05",
                    "quantity": 2
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": 2
                }
            ]
        },
        {
            id: 8,
            warehouse_id: 1,
            code: '008',
            is_active: true,
            products: [
                {
                    "id": 6,
                    "name": "Электрочайник",
                    "sku": "electric-05",
                    "quantity": 2
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": 2
                }
            ]
        },
        {
            id: 9,
            warehouse_id: 1,
            code: '009',
            is_active: true,
            products: [
                {
                    "id": 6,
                    "name": "Электрочайник",
                    "sku": "electric-05",
                    "quantity": 2
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": 2
                }
            ]
        },
        {
            id: 10,
            warehouse_id: 1,
            code: '010',
            is_active: true,
            products: [
                {
                    "id": 6,
                    "name": "Электрочайник",
                    "sku": "electric-05",
                    "quantity": 2
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": 2
                }
            ]
        },
        {
            id: 11,
            warehouse_id: 1,
            code: '011',
            is_active: true,
            products: [
                {
                    "id": 6,
                    "name": "Электрочайник",
                    "sku": "electric-05",
                    "quantity": 2
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": 2
                }
            ]
        },
    ])

    const [notPushItem, setNotPushItem] = useState([
        {
            "id": 5,
            "name": "test5",
            "sku": "test5",
            "quantity": 5
        },
        {
            "id": 6,
            "name": "test6",
            "sku": "test6",
            "quantity": 6
        },
    ])

    useEffect(() => {
        loadMainData()
        // console.log(warehouseSlots[1].products)
    }, [])

    const search = () => {
        console.log('test')
        // логика открытия меню поиска передаваемая в пропс инфосклада
    }


    const handleAdd = (data: number) => {
        if (!warehouseSlots) return
        console.log(data)

        const push = [...warehouseSlots]
        if (!hightlight) return
        push[data - 1] = {
            ...push[data - 1],
            products: [...push[data - 1].products, hightlight]
        }
        setWarehouseSlots(push)
        const updateList = notPushItem.filter(el => el.id !== hightlight.id)

        setNotPushItem(updateList)
        setHighlight(null)
        setActiveButton(false)
    }

    const selectNotPushed = (item: InfoStock) => {
        setHighlight(item)
        setActiveButton(!activeButton)
    }

    const clearSelect = () => {
        setHighlight(null)
        setActiveButton(false)
    }

    const [openStatus, setOpenStatus] = useState(false)
    const [openMenuInfo, setMenuInfo] = useState<InfoStock[] | null>(null)
    const [openMenuId, setOpenMenuId] = useState<number | null>(null)

    const openInfo = (id: number) => {
        if (!warehouseSlots) return
        let data = warehouseSlots[id - 1]
        setMenuInfo(data.products)
        setOpenMenuId(id)
        setOpenStatus(true)

    }

    const handleAddSlots = () => {
        if (!warehouseSlots) return
        setWarehouseSlots(prev => {
            if(!prev) return prev
            let nextId = prev?.length + 1
            const code = String(nextId).padStart( 3, '0')

            const newSlot = {
                id: nextId,
                warehouse_id: Number(id),
                code : code,
                is_active: true,
                products: []
            }

            return [...prev, newSlot]
        })
    }


    const loadMainData = async () => {
        try {
            // логика запроса на бекенд для получения данных о слотах на складе
            // const data = await apiFetch(`/warehouses/info/${id}/layout)
            // setWarehouseInfo(data.summary)
            // setWarehouseSlots(data.slots)
            // setWarehouseCode(data.name)
            // придумать еще какие поля нужно будет выводить
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="layoutwarehouses">
            <WarehouseInfoProps code={warehouseCode} {...warehouseInfo} openSearch={search} />
            {activeButton && <button className="layout__button" onClick={() => clearSelect()}>Закрыть</button>}
            <button className="layout__button" onClick={() => setTextMenuOpen(!ifTextMenuOpen)}>{ifTextMenuOpen ? 'Закрыть текстовое представление' : 'Открыть текстовое представление'}</button>
            <button className="layout__button" onClick={()=> handleAddSlots()}>Добавить новый слот</button>
            <div>{hightlight ? (
                <div>
                    <p>Выбранно сейчас:</p>
                    <p>ID | {hightlight.id}</p>
                    <p>{hightlight.name}</p>
                    <p>SKU | {hightlight.sku}</p>
                    <p>Количество | {hightlight.quantity}</p>
                </div>
            ) : 'none'}</div>
            <div className="warehouse__slots">
                {ifTextMenuOpen && warehouseSlots && (
                    warehouseSlots.map(item => (
                        <>
                            <WarehouseSlotsProps key={item.id} {...item} onAdd={activeButton ? () => handleAdd(item.id) : undefined} />
                        </>
                    ))
                )}
            </div>

            <section className="layout__visual">
                {warehouseSlots && warehouseSlots.length > 0 ? (
                    warehouseSlots.map(item => (
                        <div className="layout__cube" key={item.id} onClick={() => openInfo(item.id)}>
                            {item.code}
                        </div>
                    ))
                ) : (<div>ничего нет</div>)}
            </section>

            <div>
                {notPushItem.map(item => (
                    <div key={item.id}>
                        <p>{item.id}</p>
                        <p>{item.name}</p>
                        <p>{item.sku}</p>
                        <p>{item.quantity}</p>
                        <button onClick={() => selectNotPushed(item)}>Выбрать</button>
                    </div>
                ))}
            </div>
            {openStatus && openMenuId && <div className="window-overlay" onClick={() => setOpenStatus(false)}>
                <div className="window-content layout__open-menu" onClick={(e) => e.stopPropagation()}>
                    <p>Номер карточки {openMenuId}</p>
                    {openMenuInfo?.map(item => (
                        <>
                            <SlotsItemsProps key={item.id}{...item} />
                        </>
                    ))}
                    {hightlight && openMenuId && <button onClick={() => handleAdd(openMenuId)}>Добавить</button>}
                </div>
            </div>}
        </main>
    )
}

export default LayoutWarehouses

// логика добавления товара который еще не выложен
// при нажатии на товар который можно получить он капает в useState как значение
// в каждой карточке места будет кнопка выкладки которая будет появляться только когда мы выбираем товар
// при нажатии на кнопку делаем пост запрос который ззакидывает значение на сервак
// тут же обновляем
// UPD логика прописана только на стороне фронта, осталось добавить только взаимодействие с бекендом