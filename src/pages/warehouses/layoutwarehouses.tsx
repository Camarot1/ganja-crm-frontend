import { useState, useEffect } from "react";
import { apiFetch, type Warehouses, type InfoStock } from "../../api/request";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsCard, WarehouseSlotsProps, WarehouseInfoProps } from "../../props";
import { type WarehouseSlots, type WarehouseInfo } from "../../props"
import './warehouses.scss'

const LayoutWarehouses = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()


    const [warehouseCode, setWarehouseCode] = useState<string>('Название склада')
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
                    "quantity": "2"
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": "2"
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
                    "quantity": "2"
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": "2"
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
                    "quantity": "2"
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": "2"
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
                    "quantity": "2"
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": "2"
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
                    "quantity": "2"
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": "2"
                },
                {
                    "id": 2,
                    "name": "Монитор",
                    "sku": "electric-02",
                    "quantity": "2"
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
                    "quantity": "2"
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": "2"
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
                    "quantity": "2"
                },
                {
                    "id": 1,
                    "name": "Монитор",
                    "sku": "electric-01",
                    "quantity": "2"
                }
            ]
        },
    ])

    useEffect(() => {
        loadMainData()
    }, [])


    const search = () => {
        console.log('test')
        // логика открытия меню поиска передаваемая в пропс инфосклада
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
            <div className="warehouse__slots">
                {warehouseSlots && (
                    warehouseSlots.map(item => (
                        <WarehouseSlotsProps {...item} />
                    ))
                )}
            </div>
        </main>
    )
}

export default LayoutWarehouses