import { useState } from 'react'
import { apiFetch, type AddProducts } from '../../api/request'
import { useNavigate } from 'react-router-dom'


const AddProductsPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<AddProducts>({
            sku: '',
            name: '',
            description: '',
            unit: 'шт',
            price: 0
        })

    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleAddProducts = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        try {
            await apiFetch<AddProducts[]>('/products/add', {
                method: 'POST',
                body: JSON.stringify(formData)
            })
            alert('Товар Добавлен')
            navigate('/products')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <form onSubmit={handleAddProducts}>
            <div className="form__input">
                <p>Название товара</p>
                <input type="text" name="name" value={formData.name}  onChange={handleUpdate}/>
            </div>
            <div className="form__input">
                <p>sku код</p>
                <input type="text" name='sku' value={formData.sku}  onChange={handleUpdate}/>
            </div>
            <div className="form__input">
                <p>Описание</p>
                <input type="text" name="description" value={formData.description}  onChange={handleUpdate}/>
            </div>
            <div className="form__input">
                <p>Счет</p>
                <input type="text" name='unit' value={formData.unit}  onChange={handleUpdate}/>
            </div>
            <div className="form__input">
                <p>Стоимость</p>
                <input type="text" name='price' value={formData.price}  onChange={handleUpdate}/>
            </div>
            <button type="submit">Отправить</button>
        </form>
    )
}
export default AddProductsPage