import { apiFetch, type Warehouses } from "../../api/request"
import { WarehosesCard } from "../../props"
import { useState, useEffect } from "react"
import './warehouses.scss'
import { useNavigate } from "react-router-dom"
const WarehousesPage = () => {
    const [warehouses, setWarehouses] = useState<Warehouses[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                const data = await apiFetch<Warehouses[]>('/warehouses')
                if (!cancelled) setWarehouses(data)
            } catch (error) {
                console.log(error)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }
        load()

        return () => { cancelled = true }
    }, []);

    if (loading) return (<div>Загрузка</div>)

    return (
        <div>
            {warehouses.map(item => (
                <WarehosesCard
                    key={item.id}
                    {...item}
                    onClick={() => navigate(`/infowarehouses/${item.id}`)}
                    buttonText={'Информация о складе'} />
            ))}
        </div>
    )
}
export default WarehousesPage