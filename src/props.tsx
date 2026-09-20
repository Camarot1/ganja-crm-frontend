import { type WarehousesProps } from './api/request'
import { useState, useMemo } from 'react'
import './props.scss'
export const WarehosesCard = (props: WarehousesProps) => {
    return (
        <div className="warehouses-props">
            <p>ID | {props.id}</p>
            <p>Код склада | {props.code}</p>
            <p>Название | {props.name}</p>
            <p>Адрес | {props.address}</p>
            <p> {props.is_active === 1 ? 'Активен' : 'Неактивен'}</p>
            {props.onClick && <button onClick={props.onClick}>{props.buttonText}</button>}
        </div>
    )
}

import { type ProductsProps } from './api/request'

export const ProductsCard = (props: ProductsProps) => {
    return (
        <div className="products-props">
            <p>ID: {props.id}</p>
            <p>SKU: {props.sku}</p>
            <p>Название: {props.name}</p>
            {props.description && <p>Описание: {props.description}</p>}
            {props.price && <p>Цена: {props.price}</p>}
            {props.quantity && <p>Количество: {props.quantity}</p>}
            {props.is_active &&
                <p>{props.is_active === 1 ? 'Товар Активен' : 'Товар неактивен'}</p>
            }
            {props.onClick && <button onClick={props.onClick}>{props.buttonText}</button>}
        </div>
    )
}


export interface AddStock {
    quantity: number
    product_id: number
}

interface AddStockProps {
    onSubmit: (data: AddStock) => void
}

export const AddStockCard = (props: AddStockProps) => {

    const [stockFormData, setStockFormData] = useState<AddStock>({
        quantity: 0,
        product_id: 0
    })

    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStockFormData({ ...stockFormData, [e.target.name]: e.target.value })
    }

    const handleAddStock = (e: React.FormEvent) => {
        e.preventDefault()
        props.onSubmit(stockFormData)
    }

    return (
        <form onSubmit={handleAddStock} className='AddStockCard'>
            <div className="row">
                <div className="row-block">
                    <p>Количество</p>
                    <input type="number" name="quantity" value={stockFormData.quantity} onChange={handleUpdate} />
                </div>
                <div className="row-block">
                    <p>Айди товара</p>
                    <input type="number" name="product_id" value={stockFormData.product_id} onChange={handleUpdate} />
                </div>
            </div>
            <button type='submit'>Отправить</button>
        </form>
    )
}

export interface Quantity {
    quantity: number
    warehouses_id: string
    product_id: string
}



interface QuantityProps {
    warehouses_id?: string
    product_id: string
    status?: string
    onSubmit: (data: Quantity) => void
}

export const SetQuantity = ({ onSubmit, warehouses_id, product_id, status }: QuantityProps) => {

    const [input, setInput] = useState<number | ''>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const data: Quantity = {
            quantity: Number(input),
            warehouses_id: String(warehouses_id),
            product_id: product_id
        }

        onSubmit(data)  
        setInput('')

    }

    return (
        <form onSubmit={handleSubmit} className="addquantity">
            <div>
                <p>Количество</p>
                <input type="number" name="quantity" value={input} onChange={(a) => setInput(Number(a.target.value))} />
                <button type="submit">{status === 'delete' ? 'Удалить' : 'Добавить'}</button>
            </div>

        </form>
    )
}

interface HistoryProps {
    id: number
    warehouse_id: number
    product_id: number
    quantity: string
    status: string
    doing: Date
}

export const HistoryProps = (item: HistoryProps) => {
    return (
        <div className='history-props'>
            <p> id: {item.id}</p>
            <p>product_id: {item.product_id}</p>
            <p>Количество: {item.quantity}</p>
            <p>Действие: {item.status}</p>
            <p>Дата: {new Date(item.doing).toLocaleString()}</p>
        </div>
    )
}

import { type Products } from './api/request'

interface ProductProps {
    props: Products[],
    quantity?: number
}

export const ProductsSearch = ({ props }: ProductProps) => {
    const [searchQuery, setSearchQuery] = useState('')

    const filterQuery = useMemo(() => {
        if (!searchQuery) return []

        const lowerQuery = searchQuery.toLowerCase().trim()

        return props.filter((product) => {
            return (
                product.sku?.toLowerCase().trim().includes(lowerQuery) ||
                product.name?.toLowerCase().trim().includes(lowerQuery)
            )
        })
    }, [searchQuery, props])

    return (
        <div className="products-search-props">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <div className="result">
                <p>Найдено: {filterQuery.length}</p>
                {filterQuery.map(item => (
                    <ProductsCard key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}

import { type InfoStock } from './api/request'

interface SearchInWarehouses {
    props: InfoStock[] | null,
    id: string,
    onOpenWindow: (e:number) => void,
    onAddQuantity: (data:Quantity) => void,
    onDeleteQuantity: (data: Quantity) => void
}

export const ProductsSearchInWarehouses = ({ props, id,onOpenWindow, onAddQuantity, onDeleteQuantity }: SearchInWarehouses) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeAddProduct, setActiveAddProduct] = useState<number | null>(null)
    const [activeDeleteProduct, setActiveDeleteProduct] = useState<number | null>(null)


    const filterQuery = useMemo(() => {
        if (!searchQuery || !props) return []

        const lowerQuery = searchQuery.toLowerCase().trim()
        return props.filter(product => {
            return (
                product?.name.toLowerCase().trim().includes(lowerQuery) ||
                product?.sku.toLowerCase().trim().includes(lowerQuery) ||
                product?.quantity.toLowerCase().trim().includes(lowerQuery)
            )
        })
    }, [searchQuery, props])

    

    return (
        <div className="products-search-props">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <div className="result">
                <p>Найдено: {filterQuery.length}</p>
                {filterQuery.map(item => (
                    <div key={item.id}>
                        <ProductsCard key={item.id} {...item} onClick={() => onOpenWindow(item.id)} buttonText='Информация по товару'/>
                        <button onClick={() => setActiveAddProduct(activeAddProduct === item.id ? null : item.id)}>{activeAddProduct === item.id ? 'Закрыть' : 'Увеличение товара'}</button>
                        {activeAddProduct === item.id && <SetQuantity warehouses_id={id} product_id={String(item.id)} onSubmit={onAddQuantity} />}
                        <button onClick={() => setActiveDeleteProduct(activeDeleteProduct === item.id ? null : item.id)}>{activeDeleteProduct === item.id ? 'Закрыть' : 'Уменьшение товара'}</button>
                        {activeDeleteProduct === item.id && <SetQuantity warehouses_id={id} product_id={String(item.id)} status='delete' onSubmit={onDeleteQuantity} />}
                    </div>
                ))}
            </div>
        </div>
    )
}