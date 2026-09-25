import { useState, useEffect } from "react";
import { apiFetch, type Warehouses, type InfoStock} from "../../api/request";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsCard } from "../../props";
const LayoutWarehouses = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [infoStock, setInfoStock] = useState<InfoStock[] | null>(null)


    useEffect(() => {
        loadStock()
    },[])

    const loadStock = async () =>{
        try{
            const data = await apiFetch<InfoStock[]>(`/warehouses/info/${id}`)
            setInfoStock(data)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <main>
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