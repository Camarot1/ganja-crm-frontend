export interface Warehouses{
    id: number,
    name: string,
    code: string,
    address: string,
    is_active: number
}

export interface AddWarehouses{
    name: string
    code: string
    address: string
}

export interface Products{
    id: number
    sku: string
    name: string
    description: string
    unit?: string
    price: string
    is_active: number
}

export interface AddProducts{
    sku: string
    name: string
    description: string
    unit?: string
    price: number
}

export interface InfoStock{
    id: number
    name: string
    sku: string
    quantity: string
    unit?: string
}

export type WarehousesProps = Warehouses & {
    onClick?: () => void;
    buttonText?: string
}

export type ProductsProps = Partial<InfoStock> & Partial<Products> & {
    onClick?: () => void;
    buttonText?: string
}


const server = 'http://localhost:4000'
export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch (`${server}${endpoint}`, {
        headers: {'Content-Type': 'application/json' },
        ...options
    })

    if(!res.ok){
        throw new Error(`Ошибка ${res.status} ${res.statusText}`)
    }

    return res.json() as T
}   