import { useState } from "react";
import { slugify } from "../lib/slugify";

export function AddProduct () {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');

    function updateName (e) {
        setName(e.target.value);
        setSlug(slugify(e.target.value));
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
            }),
        })
            .then(res => res.json())
            .then(console.log)
            .catch(err => console.error(err));
               
    }

    
    return (
    <>
        <h1 className="h1 mt-3 mb-5 pb-2 border-bottom">Add product</h1>
        <div className="col-md-7 col-lg-8">
        <form onSubmit={handleSubmit}>
            <div className="row g-3">
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
            </div>
            <hr className="my-4" />
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="same-address" />
                <label className="form-check-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="save-info" />
                <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
            </div>
            <hr className="my-4" />
            <button className="w-100 btn btn-primary btn-lg" type="submit">Create product</button>
        </form>
    </div>
</>
);
}

