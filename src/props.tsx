import { type WarehousesProps } from './api/request'

export const WarehosesCard = (props: WarehousesProps) => {
    return (
        <div className="warehouses-props">
            <p>ID: {props.id}</p>
            <p>Код склада: {props.code}</p>
            <p>Название: {props.name}</p>
            <p>Адрес: {props.address}</p>
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