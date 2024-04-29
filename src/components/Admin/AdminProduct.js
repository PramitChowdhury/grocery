import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import './AdminProduct.css';

export default function AdminProduct() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        productName: "",
        quantity: "",
        expiryDate: new Date(), // Initialize expiryDate with current date
        currentMRP: "",
        productPrice: ""
    });
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({
        productName: "",
        quantity: "",
        expiryDate: new Date(), // Initialize expiryDate with current date
        currentMRP: "",
        productPrice: ""
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get("http://localhost:8081/api/product/getAll")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    };

    const addProduct = () => {
        axios.post("http://localhost:8081/api/product/add", newProduct)
            .then(response => {
                setProducts([response.data, ...products]); // Prepend new product to the array
                setNewProduct({
                    productName: "",
                    quantity: "",
                    expiryDate: new Date(),
                    currentMRP: "",
                    productPrice: ""
                });
            })
            .catch(error => {
                console.error("Error adding product:", error);
            });
    };

    const deleteProduct = (id) => {
        axios.delete(`http://localhost:8081/api/product/delete/${id}`)
            .then(() => {
                setProducts(products.filter(product => product.productId !== id));
            })
            .catch(error => {
                console.error("Error deleting product:", error);
            });
    };

    const updateProduct = (id, updatedProduct) => {
        axios.put(`http://localhost:8081/api/product/update/${id}`, updatedProduct)
            .then(() => {
                const updatedProducts = products.map(product =>
                    product.productId === id ? updatedProduct : product
                );
                setProducts(updatedProducts);
                setEditingProductId(null);
                setEditedProduct({
                    productName: "",
                    quantity: "",
                    expiryDate: new Date(),
                    currentMRP: "",
                    productPrice: ""
                });
            })
            .catch(error => {
                console.error("Error updating product:", error);
            });
    };

    const handleEdit = (product) => {
        setEditingProductId(product.productId);
        setEditedProduct(product);
    };

    return (
        <div>
            <AdminNavbar />
            <div>
                <div className="product-container">
                    <div className="product-card add-product">
                        <h2>Add Product</h2>
                        <label>Product Name:</label>
                        <input
                            type="text"
                            value={newProduct.productName}
                            onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
                        />
                        <label>Quantity:</label>
                        <input
                            type="text"
                            value={newProduct.quantity}
                            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                        />
                        <label>Expiry Date:</label>
                        <DatePicker
                            selected={newProduct.expiryDate}
                            onChange={(date) => setNewProduct({ ...newProduct, expiryDate: date })}
                            dateFormat="yyyy-MM-dd"
                        />
                        <label>Current MRP:</label>
                        <input
                            type="text"
                            value={newProduct.currentMRP}
                            onChange={(e) => setNewProduct({ ...newProduct, currentMRP: e.target.value })}
                        />
                        <label>Product Price:</label>
                        <input
                            type="text"
                            value={newProduct.productPrice}
                            onChange={(e) => setNewProduct({ ...newProduct, productPrice: e.target.value })}
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
                                    <label>Expiry Date:</label>
                                    <DatePicker
                                        selected={editedProduct.expiryDate}
                                        onChange={(date) => setEditedProduct({ ...editedProduct, expiryDate: date })}
                                        dateFormat="yyyy-MM-dd"
                                    />
                                    <label>Current MRP:</label>
                                    <input
                                        type="text"
                                        value={editedProduct.currentMRP}
                                        onChange={(e) => setEditedProduct({ ...editedProduct, currentMRP: e.target.value })}
                                    />
                                    <label>Product Price:</label>
                                    <input
                                        type="text"
                                        value={editedProduct.productPrice}
                                        onChange={(e) => setEditedProduct({ ...editedProduct, productPrice: e.target.value })}
                                    />
                                    <button onClick={() => updateProduct(product.productId, editedProduct)}>Update</button>
                                </>
                            ) : (
                                <>
                                    {/* Show product details */}
                                    <h2>{product.productName}</h2>
                                    <p>Quantity: {product.quantity}</p>
                                    <p>Expiry Date: {new Date(product.expiryDate).toLocaleDateString()}</p>
                                    <p>Current MRP: {product.currentMRP}</p>
                                    <p>Product Price: {product.productPrice}</p>
                                    <button onClick={() => handleEdit(product)}>Edit</button>
                                    <button onClick={() => deleteProduct(product.productId)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
