import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import React, { useState, useEffect } from "react";
import Product from "./Product"; 
import { useProducts } from "../hooks/useProduct";




const Layout: React.FC = () => {
    const [product, setProduct] = useState("");
    const { productMap, addProduct, deleteProduct, validationNotPass, deleteAll, handleAddNewProductButtonClick, validationInput, setValidationInput, crossOut } = useProducts();
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitting form with product:");
        handleAddNewProductButtonClick(product);
    };

   return (
        <>
            <h1 className="text-5xl">
                Shopping List
            </h1>
            <form onSubmit={handleSubmit} role="form">
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
                    <Product
                        key={key}
                        value={item.name}
                        onDelete={() => deleteProduct(item.name)}
                        onToggle={() => crossOut(item.name)}
                        isBought={item.check}
                    />
                ))}
            </div>
        </>
    );
}

export default Layout;