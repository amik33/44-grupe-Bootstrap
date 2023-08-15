import { useEffect, useState } from "react";
import { ProductsTable } from "../components/ProductsTable";

export function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/products', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <h2 className='pt-3'>Products</h2>
            {Array.isArray(products) && <ProductsTable products={products} />}
            {!Array.isArray(products) && <div>ERROR</div>}
        </>
    );
}