import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import React, { useState, useEffect } from "react";
import Product from "./Product"; 

export default function Layout() {
    const [productMap, setProductMap] = useState(new Map()); 
    const [product, setProduct] = useState("");
    const [productIdCounter, setProductIdCounter] = useState(1);
    const [validationInput, setValidationInput] = useState(true);

    useEffect(() => {
        window.onload = () => {
            const savedProductMap = localStorage.getItem("productMap");
            const savedCounter = localStorage.getItem("productIdCounter");

            if (savedProductMap) {
                setProductMap(new Map(JSON.parse(savedProductMap)));  
            }
            if (savedCounter) {
                setProductIdCounter(parseInt(savedCounter, 10)); 
            }
        };
    }, []);

    useEffect(() => {
        window.onbeforeunload = () => {
            localStorage.setItem("productMap", JSON.stringify([...productMap]));
            localStorage.setItem("productIdCounter", productIdCounter.toString());
        };
    }, [productMap, productIdCounter]);

    const checkValidation = () => {
        if (product.trim() !== '') {
            addProduct();
        } else {
            setValidationInput(false);
        }
    };

    const addProduct = () => {
        const newProductMap = new Map(productMap); 
        newProductMap.set(productIdCounter, product); 
        setProductMap(newProductMap); 
        setProductIdCounter(productIdCounter + 1); 
        setProduct(""); 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        checkValidation();
    };

    const deleteAll = () => {
        setProductMap(new Map()); 
        setProductIdCounter(1);
        localStorage.removeItem("productMap");
        localStorage.removeItem("productIdCounter");
    };

    const deleteProduct = (valueToDelete) => {
        const newProductMap = new Map(productMap); 
        for (let [key, val] of newProductMap.entries()) {
            if (val === valueToDelete) {
                newProductMap.delete(key);
                break;
            }
        }
        setProductMap(newProductMap);
    };

    return (
        <>
            <h1 className="text-5xl">
                Shopping List
            </h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    label="Product"
                    className="pt-10"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)} 
                    color={validationInput ? "default" : "danger"}
                    onClick={() => setValidationInput(true)}
                />
                <p style={{display: validationInput ? 'none' : 'block'}} className="text-red-600">Please enter the product</p>
                <div className="pt-5">
                    <Button type="submit" color="primary" variant="ghost" className="w-1/2">
                        Add Product
                    </Button>
                    <Button onClick={deleteAll} type="button" color="danger" variant="ghost" className="w-1/2">
                        Delete All
                    </Button>
                </div>
            </form>

            <div className="pt-10">
                {[...productMap].map(([key, item]) => (
                    <Product key={key} value={item} onDelete={() => deleteProduct(item)} />
                ))}
            </div>
        </>
    );
}
