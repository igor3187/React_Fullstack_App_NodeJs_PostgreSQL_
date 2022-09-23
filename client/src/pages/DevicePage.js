import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStarImg from '../assets/big_star_img.png'
import {useParams} from "react-router-dom";
import {fetchOneDevices} from "../http/deviceAPI";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevices(id).then(data => setDevice(data))
    }, [])

    return (
        <Container className={'mt-3'}>
            <Row>
                <Col md={4} className={'d-flex justify-content-center'}>
                    <Image width={'400'} height={'auto'} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4} className={'d-flex flex-column justify-content-center align-items-center'}>
                    <h2>{device.name}</h2>
                    <div
                        className={'d-flex align-items-center justify-content-center'}
                        style={{
                            background: `url(${bigStarImg}) no-repeat center center`,
                            width: '250px',
                            height: '240px',
                            backgroundSize: 'cover',
                            fontSize: '64'
                        }}
                    >
                        {device.rating}
                    </div>
                </Col>
                <Col md={4}>
                    <Card
                        className={'d-flex flex-column align-items-center justify-content-around'}
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>From: {device.price}$</h3>
                        <Button variant={'outline-dark'}>Add To Basket</Button>
                    </Card>
                </Col>
                <Col className={'d-flex flex-column m-2'}>
                    <h1>Description</h1>
                    {device.info.map((info, index) =>
                        <div
                            key={info.id}
                            style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}
                        >
                            {info.title}: {info.description}
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default DevicePage;