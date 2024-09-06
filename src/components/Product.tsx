import { Card, CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faL } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Product({ value, onDelete }) { 

    const [isStrikeThrough, setisStrikeThrough] = useState(false);

    const handleToggleStrikeThrough = () => {
        setisStrikeThrough(!isStrikeThrough);
    }

    const deleteProduct = () => {
        onDelete(value);
    }

    return (
        <Card>
            <CardBody>
                <div className="flex justify-between items-center">
                    <p style={{textDecoration: isStrikeThrough ? 'line-through' : ''}}>{value}</p>
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
