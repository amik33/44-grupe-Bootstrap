import { useState } from "react";
import { slugify } from "../lib/slugify";

export function AddProduct () {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [supplier, setSupplier] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [label, setLabel] = useState('');


    function updateName (e) {
        setName(e.target.value);
        setSlug(slugify(e.target.value));
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


    function handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:3001/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                name,
                slug,
                supplier,
                type,
                amount,
                label,
            }),
        })
            .then(res => res.json())
            .then(console.log)
            .catch(err => console.error(err));
               
    }

    return (
    <>
        <h1 className="h1 mt-2 mb-2 pb-2 border-bottom">Add product</h1>
        <div className="col-md-7 col-lg-8">
        <form onSubmit={handleSubmit}>
            <div className="row g-1">
                <div className="col-12">
                    <label htmlFor="productName" className="form-label">Product name</label>
                    <input onChange={updateName} value={name} type="text" className="form-control" id="productName" placeholder="Product name" required />
                    <div className="invalid-feedback">
                        Valid Product name is required.
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="slug" className="form-label">Slug</label>
                    <div className="input-group has-validation">
                        <span className="input-group-text">@</span>
                        <input defaultValue={slug}  type="text" className="form-control" id="username" placeholder="Slug" disabled />
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="supplier" className="form-label">Supplier</label>
                    <input onChange={editSupplier} value={supplier}  type="text" className="form-control" id="username" placeholder="Supplier" />
                </div>
                <div className="col-12">
                    <label htmlFor="type" className="form-label">Type</label>
                    <input onChange={editType} value={type}  type="text" className="form-control" id="username" placeholder="Type" />
                </div>
                <div className="col-12">
                    <label htmlFor="amount" className="form-label">Amount</label>              
                    <input onChange={editAmount} value={amount}  type="text" className="form-control" id="username" placeholder="Amount" />   
                </div>
                <div className="col-12">
                    <label htmlFor="label" className="form-label">Label</label>
                    <input onChange={editLabel} value={label}  type="text" className="form-control" id="username" placeholder="Label" />
                </div>
            </div>
            <hr className="my-3" />
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="same-address" />
                <label className="form-check-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="save-info" />
                <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
            </div>
            <hr className="my-3" />
            <button className="w-100 btn btn-warning me-3 btn-lg" type="submit">Create product</button>
        </form>
    </div>
</>
);
}

