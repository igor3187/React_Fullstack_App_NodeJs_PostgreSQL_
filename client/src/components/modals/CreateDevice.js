import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createDevice, fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceAPI";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [brand, setBrand] = useState(null)
    const [type, setType] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
            setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeItem = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    const selectFile = event => {
        setFile(event.target.files[0]);
    }
    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(() => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{device.selectedType.name || 'Choice Type'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => device.setSelectedType(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{device.selectedBrand.name || 'Choice Brand'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands?.map(brand =>
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => device.setSelectedBrand(brand)}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        value={name}
                        onChange={event => setName(event.target.value)}
                        className={'mt-3'}
                        placeholder={'Enter device name'}
                    />
                    <Form.Control
                        value={price}
                        onChange={event => setPrice(Number(event.target.value))}
                        className={'mt-3'}
                        placeholder={'Enter device prise'}
                        type={'number'}
                    />
                    <Form.Control
                        className={'mt-3'}
                        type={'file'}
                        onChange={selectFile}
                    />

                    <hr/>

                    <Button
                        variant={'outline-dark'}
                        onClick={addInfo}
                    >
                        Add new property
                    </Button>
                    {info.map(i =>
                        <Row className={'mt-4'} key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={event => changeInfo('title', event.target.value, i.number)}
                                    placeholder={'Enter name of property'}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={event => changeInfo('description', event.target.value, i.number)}
                                    placeholder={'Enter description of property'}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant={'outline-danger'}
                                    onClick={() => removeItem(i.number)}
                                >
                                    Delete property
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Close</Button>
                <Button variant={'outline-success'} onClick={addDevice}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;