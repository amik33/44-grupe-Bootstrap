import { Link } from 'react-router-dom';

export function ProductsTable({ products }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Header</th>
                        <th scope="col">Header</th>
                        <th scope="col">Header</th>
                        <th scope="col">Header</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, i) => (
                            <tr key={i}>
                                <td>1,001</td>
                                <td>random</td>
                                <td>data</td>
                                <td>placeholder</td>
                                <td>text</td>
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