import { Link } from 'react-router-dom';

export function ProductsTable({ products }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Supplier</th>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Label</th>
                        <th scope="col">Created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.date}</td>
                                <td>{product.supplier}</td>
                                <td>{product.type}</td>
                                <td>{product.amount}</td>
                                <td>{product.label}</td>
                                <td>{product.created}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                products.length === 0 && (
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                        No products, go and <Link to="/products/add" className="alert-link">Create new product</Link>.
                    </div>
                )
            }
        </div>
    );
}