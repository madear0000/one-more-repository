import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import Product from "./Product"; 

export default function Form() {
    const [productList, setProductList] = useState([]);
    const [product, setProduct] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (product.trim()) { 
            setProductList([...productList, product]); 
            setProduct(""); 
        }
    };

    const deleteAll = () => {
        setProductList([]);
        console.log(productList);
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
                {productList.map((item, index) => (
                    <Product key={index} value={item} />
                ))}
            </div>
        </>
    );
}
