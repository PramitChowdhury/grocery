import React, { useState, useEffect } from "react";
import axios from "axios";

import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import './Customer.css';
import { Link } from 'react-router-dom';

export default function Customer() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        quantity: "",
        custname: ""

    });
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({
        name: "",
        quantity: "",
        custname: ""

    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get("http://localhost:8084/api/product/getAll")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    };

    const addProduct = () => {
        axios.post("http://localhost:8084/api/product/add", newProduct)
            .then(response => {
                setProducts([response.data, ...products]); // Prepend new product to the array
                setNewProduct({
                    name: "",
                    quantity: "",
                    custname: ""

                });
            })
            .catch(error => {
                console.error("Error adding product:", error);
            });
    };

    const deleteProduct = (id) => {
        axios.delete(`http://localhost:8084/api/product/delete/${id}`)
            .then(() => {
                setProducts(products.filter(product => product.id !== id));
            })
            .catch(error => {
                console.error("Error deleting product:", error);
            });
    };



    const handleEdit = (product) => {
        setEditingProductId(product.productId);
        setEditedProduct(product);
    };

    return (
        <div>

            <div>
                <div className="product-container">
                    <div className="product-card add-product">
                        <h2>Add Product</h2>
                        <label>Product Name:</label>
                        <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <label>Quantity:</label>
                        <input
                            type="text"
                            value={newProduct.quantity}
                            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                        />
                        <label>Customer Name:</label>
                        <input
                            type="text"
                            value={newProduct.custname}
                            onChange={(e) => setNewProduct({ ...newProduct, custname: e.target.value })}
                        />

                        <button onClick={addProduct}>Add</button>
                    </div>
                    {products.map(product => (
                        <div className="product-card" key={product.productId}>
                            {/* Conditionally render input fields for editing a product */}
                            {editingProductId === product.productId ? (
                                <>
                                    <label>Product Name:</label>
                                    <input
                                        type="text"
                                        value={editedProduct.productName}
                                        onChange={(e) => setEditedProduct({ ...editedProduct, productName: e.target.value })}
                                    />
                                    <label>Quantity:</label>
                                    <input
                                        type="text"
                                        value={editedProduct.quantity}
                                        onChange={(e) => setEditedProduct({ ...editedProduct, quantity: e.target.value })}
                                    />




                                </>
                            ) : (
                                <>
                                    {/* Show product details */}
                                    <h4>Customer Name: {product.custname}</h4>
                                    <h6>Product Name: {product.name}</h6>
                                    <p>Quantity: {product.quantity}</p>


                                    <button onClick={() => deleteProduct(product.id)}>Delete</button>


                                </>




                            )}
                        </div>


                    ))}

                    <button type="submit" ><Link to="/confirmation"> Submit </Link> </button>
                </div>
            </div>
        </div>
    );
}
