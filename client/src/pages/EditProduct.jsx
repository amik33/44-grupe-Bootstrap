import { useState } from "react";

export function EditProduct () {
    const [name, setName] = useState('');
    const [supplier, setSupplier] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);
    const [label, setLabel] = useState('');
    const [labelAlt, setLabelAlt] = useState('');

    function editName (e) {
        setName(e.target.value);
    }

    function editSupplier (e) {
        setSupplier(e.target.value);
    }

    function editType (e) {
        setType(e.target.value);
    }

    function editAmount (e) {
        setAmount(e.target.value);
    }

    function editLabel (e) {
        setLabel(e.target.value);
    }

    function editLabelAlt (e) {
        setLabelAlt(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

            fetch('http://localhost:3001/api/products', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    name, supplier, type, amount, label, labelAlt,
                }),
             })
                .then(res => res.json())
                .then(console.log)
                .catch(err => console.error(err));
               
    }
    
    return (
    <>
        <h1 className="h1 mt-3 mb-3 pb-2 border-bottom">Edit product</h1>
        <div className="col-md-7 col-lg-8">
        <form onSubmit={handleSubmit}>
            <div className="row g-2">
                <div className="col-12">
                    <label htmlFor="productName" className="form-label">Product name</label>
                    <input onChange={editName} value={name} type="text" className="form-control" id="productName" placeholder="Product name" required />
                    <div className="invalid-feedback">
                        Valid Product name is required.
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="supplier" className="form-label">Supplier</label>
                    <input onChange={editSupplier} value={supplier}  type="text" className="form-control" id="supplier" placeholder="Supplier" />
                    <div className="invalid-feedback">
                        Valid Supplier name is required.
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="type" className="form-label">Type</label>
                    <input onChange={editType} value={type}  type="text" className="form-control" id="type" placeholder="Type" />
                    <div className="invalid-feedback">
                        Valid Type name is required.
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="amount" className="form-label">Amount</label>              
                    <input onChange={editAmount} value={amount}  type="number" className="form-control" id="amount" placeholder="Amount" />
                    <div className="invalid-feedback">
                        Valid Amount value is required.
                    </div>   
                </div>
                <div className="col-12">
                    <label htmlFor="label" className="form-label">Label</label>
                    <input onChange={editLabel} value={label}  type="text" className="form-control" id="label" placeholder="Label" />
                    <div className="invalid-feedback">
                        Valid label is required.
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="labelAlt" className="form-label">LabelAlt</label>
                    <input onChange={editLabelAlt} value={labelAlt}  type="text" className="form-control" id="labelAlt" placeholder="LabelAlt" />
                    <div className="invalid-feedback">
                        Valid Label Alt name is required.
                    </div>
                </div>
            </div>
            <hr className="my-3" />
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="save-info" />
                <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
            </div>
            <hr className=" my-3" />
            <button className="w-100 btn btn-warning me-3 btn-lg" type="submit">Save product</button>
        </form>
    </div>
</>
);
}