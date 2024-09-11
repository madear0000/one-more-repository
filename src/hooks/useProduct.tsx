import { useState, useEffect } from "react";

type productMap = Map<number, Product>;

interface Product {
    name: string;
    check: boolean;
}

export const useProducts = () => {
    const [productMap, setProductMap] = useState(new Map());  
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

    const validationNotPass = () => {
        setValidationInput(false);
    };

    const handleAddNewProductButtonClick = (product: string) => {
        const nameProduct = product.trim();
        if (nameProduct) {
            addProduct(product);
        } else {
            validationNotPass();
        }
    }

    const addProduct = (product: string) => {
        const newProduct = {
            name: product,
            check: false
        }
        const newProductMap = new Map(productMap); 
        newProductMap.set(productIdCounter, newProduct); 
        setProductMap(newProductMap); 
        setProductIdCounter(productIdCounter => productIdCounter + 1); 
    };

    const deleteAll = () => {
        setProductMap(new Map()); 
        setProductIdCounter(1);
        localStorage.removeItem("productMap");
        localStorage.removeItem("productIdCounter");
    };

    const deleteProduct = (valueToDelete: string) => {
        const newProductMap = new Map(productMap); 
        let keyToDelete: number | null = null;
        newProductMap.forEach((val, key) => {
            if (val.name === valueToDelete) {
                keyToDelete = key;
            }
        });

        if (keyToDelete !== null) {
            newProductMap.delete(keyToDelete);
    }
        setProductMap(newProductMap);
    };

    const crossOut = (valuseToCross: string) => {
        const newProductMap = new Map(productMap);
        newProductMap.forEach((val) => {
            if (val.name === valuseToCross) {
                val.check = true;
            }
        });

        setProductMap(newProductMap);
    }

    return {
        productMap,
        addProduct,
        deleteProduct,
        validationNotPass,
        deleteAll,
        handleAddNewProductButtonClick,
        validationInput,
        setValidationInput,
        crossOut
    };
}