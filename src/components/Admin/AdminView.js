import React, { useState, useEffect } from "react";
import axios from "axios";

import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import './AdminView.css';

export default function AdminView() {
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
            </div>
        </div>

    );
}
