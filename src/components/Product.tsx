import { Card, CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faL } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import React from 'react'; 

interface ProductProps {
    value: string;
    onDelete: (value: string) => void;
    isBought: boolean;
    onToggle: (value: string) => void; 
}

const Product: React.FC<ProductProps> = ({ value, onDelete, onToggle, isBought }) => { 

    const handleToggleStrikeThrough = () => {
        onToggle(value);
    }

    const deleteProduct = () => {
        onDelete(value);
    }

    return (
        <Card>
            <CardBody>
                <div className="flex justify-between items-center">
                    <span style={{textDecoration: isBought ? 'line-through' : ''}}>{value}</span>
                    <div>
                        <Button onClick={handleToggleStrikeThrough} size="sm" color="success" variant="flat" data-testid="toggle-button">
                            <FontAwesomeIcon icon={faCheck} /> 
                        </Button> 
                        <Button onClick={deleteProduct} className="ml-1" size="sm" color="danger" variant="flat" data-testid="delete-button">
                            <FontAwesomeIcon icon={faXmark} />
                        </Button> 
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default Product;
