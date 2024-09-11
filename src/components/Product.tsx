import { Card, CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faL } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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
                    <p style={{textDecoration: isBought ? 'line-through' : ''}}>{value}</p>
                    <div>
                        <Button onClick={handleToggleStrikeThrough} size="sm" color="success" variant="flat">
                            <FontAwesomeIcon icon={faCheck} /> 
                        </Button> 
                        <Button onClick={deleteProduct} className="ml-1" size="sm" color="danger" variant="flat">
                            <FontAwesomeIcon icon={faXmark} />
                        </Button> 
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default Product;
