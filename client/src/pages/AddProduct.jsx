import { useState } from "react";
import { slugify } from "../lib/slugify";
import preview from '../../src/assets/preview.png';

export function AddProduct () {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [supplier, setSupplier] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);
    const [label, setLabel] = useState('');
    const [labelAlt, setLabelAlt] = useState('');

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
        const n = parseInt(e.target.value);
        setAmount(n > 0 ? n : 0);
    }

    function editLabel (e) {
        const formData = new FormData();
        formData.append('image_file', e.target.files[0]);

        fetch('http://localhost:3001/api/upload', {
            method: 'POST',
            body: formData,
        }).then(res => res.json())
            .then(data => setLabel(`http://localhost:3001/images/${data.path}`))
            .catch(err => console.error(err));
    }

    function editLabelAlt (e) {
        setLabelAlt(e.target.value);
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
                name, slug, supplier, type, amount, label, labelAlt,
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
                        <input defaultValue={slug}  type="text" className="form-control" id="slugname" placeholder="Slug" disabled />
                    </div>
                </div>
                <div className="Col-12">
                    <label htmlFor="supplier" className="form-label">Supplier</label>
                    <select onChange={editSupplier} value={supplier} className="form-select" id="supplier">
                        <option value="">Open this select menu</option>
                        <option value="vasaris">Vasaris</option>
                        <option value="pavasaris">Pavasaris</option>
                        <option value="optima">Optima</option>
                        <option value="minima">Minima</option>
                    </select>
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
                    <label htmlFor="amount" className="form-label">Amount, units</label>              
                    <input onChange={editAmount} value={amount}  type="number" className="form-control" id="amount" placeholder="Amount" />
                    <div className="invalid-feedback">
                        Valid Amount value is required.
                    </div> 
                </div>
                <hr className="my-3" />
                <h4 className="mb-3">Label</h4>
                <div className="col-12">
                    <img src={label ? label : preview} alt="preview" style={{width: 300, height: 300, objectFit: 'contain'}} />
                    <label className="form-label d-flex p-2" htmlFor="label">Upload label</label>
                    <input onChange={editLabel} type="file" className="form-control my-3" id="label" />
                    <div className="invalid-feedback">
                        Valid Label image is required.
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="labelAlt" className="form-label">Label alt text</label>
                    <input onChange={editLabelAlt} value={labelAlt}  type="text" className="form-control" id="labelAlt" placeholder="Label alt text" />
                    <div className="invalid-feedback">
                        Valid Label Alt name is required.
                    </div>
                </div>
            </div>
               <hr className="my-3" />
            <button className="w-100 btn btn-warning me-3 btn-lg" type="submit">Create product</button>
        </form>
    </div>
</>
);
}

