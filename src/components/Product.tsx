import { Card, CardBody } from "@nextui-org/react";

export default function Product({ value }) { 
    return (
        <Card>
            <CardBody>
                <p>{value}</p>
            </CardBody>
        </Card>
    );
}
