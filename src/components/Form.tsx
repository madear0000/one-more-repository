import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import Product from "./Product"; 

export default function Form() {
    const [productMap, setProductMap] = useState(new Map()); 
    const [product, setProduct] = useState("");
    const [productIdCounter, setProductIdCounter] = useState(1);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (product.trim()) { 
            const newProductMap = new Map(productMap); 
            newProductMap.set(productIdCounter, product); 
            setProductMap(newProductMap); 
            setProductIdCounter(productIdCounter + 1); 
            setProduct(""); 
            console.log(productMap);
        }
    };

    const deleteAll = () => {
        setProductMap(new Map()); 
        setProductIdCounter(1);
    };

    const deleteProduct = (valueToDelete) => {
        const newProductMap = new Map(productMap); 
        for (let [key, val] of newProductMap.entries()) {
            if (val == valueToDelete) {
                newProductMap.delete(key);
                break;
            }
        }
        setProductMap(newProductMap);
    }   

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    label="Product"
                    className="pt-10"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)} 
                />
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
                    <Product key={key} value={item} onDelete={deleteProduct}/>
                ))}
            </div>
        </>
    );
}
