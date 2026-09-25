import { useState, useEffect } from "react";
import { apiFetch, type Warehouses, type InfoStock } from "../../api/request";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsCard, WarehouseSlotsProps } from "../../props";
import { type WarehouseSlots } from "../../props"
import './warehouses.scss'
const LayoutWarehouses = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [infoStock, setInfoStock] = useState<InfoStock[] | null>(null)
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
            id:4,
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
        loadStock()
    }, [])

    const loadStock = async () => {
        try {
            const data = await apiFetch<InfoStock[]>(`/warehouses/info/${id}`)
            setInfoStock(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="layoutwarehouses">
            <div className="warehouse__slots">

                { warehouseSlots && (
                    warehouseSlots.map(item => (
                        <WarehouseSlotsProps {...item} />
                    ))
                )}
            </div>
            <div className="infoStock">
                {infoStock?.map(item => (
                    <div key={item.id} className="block">
                        <ProductsCard {...item} />
                    </div>
                ))}
            </div>
        </main>
    )
}

export default LayoutWarehouses