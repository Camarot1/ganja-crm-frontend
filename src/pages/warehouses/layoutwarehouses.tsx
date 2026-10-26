import { useState, useEffect, useCallback } from "react";
import { apiFetch, type Warehouses, type InfoStock } from "../../api/request";
import { useNavigate, useParams } from "react-router-dom";
import {
    ProductsCard,
    WarehouseSlotsProps,
    WarehouseInfoProps,
    SlotsItemsProps,
    NotLayoutItemProps
} from "../../props";
import { type WarehouseSlots, type WarehouseInfo, type NotLayout } from "../../props"
import './warehouses.scss'


const LayoutWarehouses = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [ifTextMenuOpen, setTextMenuOpen] = useState(false)

    const [activeButton, setActiveButton] = useState(false)

    const [warehouseCode, setWarehouseCode] = useState<string>('Название склада')

    const [hightlight, setHighlight] = useState<NotLayout | null>(null)


    const [warehouseInfo, setWarehouseInfo] = useState<WarehouseInfo | null>(null)
    const [warehouseSlots, setWarehouseSlots] = useState<WarehouseSlots[] | null>(null)

    const [notPushItem, setNotPushItem] = useState<NotLayout[] | null>(null)

    useEffect(() => {
        loadMainData()
        // console.log(warehouseSlots[1].products)
    }, [])

    const search = () => {
        console.log('test')
        // логика открытия меню поиска передаваемая в пропс инфосклада
    }

    const handleAdd = async (idCard: number) => {
        try {
            await apiFetch(`/warehouses/layout/additem/${id}`, {
                method: 'POST',
                body: JSON.stringify({
                    idCard: idCard,
                    value: hightlight
                })
            })
            loadMainData()
            if (openStatus) openInfo(idCard)
            clearSelect()
        } catch (error) {
            console.log(error)
        }
    }

    const selectNotPushed = (item: NotLayout) => {
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

    const handleAddSlots = async () => {
        if (!warehouseSlots) return
        try {
            await apiFetch(`/warehouses/layout/addslot/${Number(id)}`, {
                method: 'POST'
            })
        } catch (error) {
            alert(error)
        } finally {
            loadMainData()
        }
    }

    const handleDeleteSlots = async (data: number) => {
        if (!window.confirm('Удалить слот? Это действие нельзя отменить')) return
        try {
            await apiFetch(`/warehouses/layout/deleteslot/${id}`, {
                method: 'POST',
                body: JSON.stringify({ value: data })
            })
            setOpenStatus(false)
        } catch (error) {
            alert(error)
        }
        finally {
            loadMainData()
        }
    }

    const handlePostData = async () => {
        try {
            await apiFetch('/warehouses/layout/add', {
                method: 'POST',
                body: JSON.stringify(warehouseSlots)
            })
        } catch (error) {
            alert(error)
        }
    }


    const loadMainData = async () => {
        try {
            const layout: any = await apiFetch(`/warehouses/layout/${id}`)
            const notlayout: any = await apiFetch(`/warehouses/layout/notlayout/${id}`)
            const count : any = await apiFetch(`/warehouses/layout/count/${id}`)
            if (!layout) return
            setWarehouseSlots(layout)
            setNotPushItem(notlayout)
            setWarehouseInfo(count)
            // придумать еще какие поля нужно будет выводить
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <main className="layoutwarehouses">
            {warehouseInfo && <WarehouseInfoProps code={warehouseCode} {...warehouseInfo} openSearch={search} />}
            {activeButton && <button className="layout__button" onClick={() => clearSelect()}>Закрыть</button>}
            <button className="layout__button" onClick={() => setTextMenuOpen(!ifTextMenuOpen)}>{ifTextMenuOpen ? 'Закрыть текстовое представление' : 'Открыть текстовое представление'}</button>
            <button className="layout__button" onClick={() => handleAddSlots()}>Добавить новый слот</button>
            <button className="layout__button" onClick={() => handlePostData()}>Отправить данные</button>
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
            {notPushItem &&
                <div>
                    {notPushItem.map(item => (
                        <NotLayoutItemProps {...item} onSelect={() =>selectNotPushed(item)} />
                    ))}
                </div>
            }
            {openStatus && openMenuId && <div className="window-overlay" onClick={() => setOpenStatus(false)}>
                <div className="window-content layout__open-menu" onClick={(e) => e.stopPropagation()}>
                    <p>Номер карточки {openMenuId}</p>
                    <button onClick={() => handleDeleteSlots(openMenuId)}>Удалить карточку</button>
                    {openMenuInfo?.map(item => (
                        <>
                            <SlotsItemsProps key={item.id} {...item} />
                        </>
                    ))}
                    {hightlight && openMenuId && <button onClick={() => handleAdd(openMenuId)}>Добавить</button>}
                </div>
            </div>}
        </main>
    )
}

export default LayoutWarehouses