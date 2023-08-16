import { Link } from 'react-router-dom';

export function ProductsTable({ products }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product name</th>
                        <th scope="col">Created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.created}</td>
                                <td>
                                    <Link to='/viewProduct' className='btn btn-warning me-3' >View</Link>
                                    <Link to='/editProduct' className='btn btn-warning me-3' >Edit</Link>
                                    <Link to='/deleteProduct' className='btn btn-warning me-3'>Delete</Link>
                                </td>
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