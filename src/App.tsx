import { Routes, Route } from 'react-router-dom';
import WarehousesPage from './pages/warehouses/warehouses.tsx';
import AddWarehousesPage from './pages/warehouses/addwarehouses.tsx';
import InfoWarehousesPage from './pages/warehouses/infowarehouses.tsx';

import ProductsPage from './pages/products/products.tsx';
import AddProductsPage from './pages/products/addproducts.tsx';
import InfoProductsPage from './pages/products/infoproducts.tsx';


import MainPage from './pages/main.tsx'
import './props.scss'
function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/warehouses" element={<WarehousesPage />} />
            <Route path="/addwarehouses" element={<AddWarehousesPage />} />
            <Route path="/infowarehouses/:id" element={<InfoWarehousesPage />} />
            <Route path="/products" element={<ProductsPage/>} />
            <Route path="/addproducts" element={<AddProductsPage/>} />
            <Route path="/infoproducts/:id" element={<InfoProductsPage/>} />
        </Routes>
    );
}

export default App;