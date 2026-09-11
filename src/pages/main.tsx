import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = ()=> {
    const navigate = useNavigate()
    return(
        <div>
            <div className="block">
                <p>Товары</p>
                <button onClick={() => navigate('/products')}>Перейти</button>
            </div>
            <div className="block">
                <p>Склады</p>
                <button onClick={() => navigate('/warehouses')}>Перейти</button>
            </div>
        </div>
    )
}
export default MainPage