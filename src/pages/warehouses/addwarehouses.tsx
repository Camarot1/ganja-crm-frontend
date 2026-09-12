import {apiFetch, type AddWarehouses} from "../../api/request"
import {useState} from 'react'
import { useNavigate } from "react-router-dom"


const AddWarehousesPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<AddWarehouses>({
        name: '',
        code: '',
        address: ''
    })
    const handleAddWarehouses = async (e: React.FormEvent<HTMLFormElement>) :Promise<void> =>{
        e.preventDefault()

        try{
            await apiFetch<AddWarehouses>('/warehouses/add', {
                method: 'POST',
                body: JSON.stringify(formData)
            })

            alert('Склад добавлен')
            navigate("/warehouses")
        }catch(error){
            console.log(error)
            alert('не удалось добавить задачу')
        }
    }
    
    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return(  
        <form onSubmit={handleAddWarehouses}>
            <button onClick={() => navigate(-1)}>Вернутся назад</button>
            <div className="form__input">
                <p>Название</p>
                <input type="text" name='name' value={formData.name}  onChange={handleUpdate}/>
            </div>
            <div className="form__input">
                <p>Код</p>
                <input type="text" name="code" value={formData.code}  onChange={handleUpdate}/>
            </div>
            <div className="form__input">
                <p>Адрес</p>
                <input type="text" name="address" value={formData.address}  onChange={handleUpdate}/>
            </div>
            <button type="submit">Отправить</button>
        </form>
    )
}
export default AddWarehousesPage