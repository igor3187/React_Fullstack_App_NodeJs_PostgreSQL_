import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Card, Col, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row className={'d-flex'}>
            {device.brands.map(brand =>
                <Col
                    className={'col-2 text-center mb-2'}
                    style={{cursor: 'pointer'}}
                    key={brand.id}
                >
                    <Card
                        className={'p-2'}
                        onClick={() => device.setSelectedBrand(brand)}
                        border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    >
                        {brand.name}
                    </Card>
                </Col>
            )}
        </Row>
    );
});

export default BrandBar;