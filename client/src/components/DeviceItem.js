import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.png'
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    return (
        <Col md={3} className={'mb-2'} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className={'p-2'}>
                    <div className={'mt-1 d-flex text-black-50 align-items-center justify-content-between'}>
                        <div>Samsung...</div>
                        <div className={'d-flex align-items-center'}>
                            <div className={'me-2'}>
                                {device.rating}
                            </div>
                            <Image width={15} height={15} src={star}/>
                        </div>
                    </div>
                    <div>
                        {device.name}
                    </div>
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;