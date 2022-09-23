import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const getAuth = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <Container
            className={'d-flex justify-content-center align-items-center'}
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className={'p-5'}>
                <h2 className={'m-auto'}>{isLogin ? 'Login' : 'Register'}</h2>
                <Form className={'d-flex flex-column'}>
                    <Form.Control
                        className={'mt-3'}
                        placeholder={'Enter your email...'}
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <Form.Control
                        className={'mt-3'}
                        placeholder={'Enter your password...'}
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        type={'password'}
                    />
                    <Row className={'d-flex justify-content-between mt-3'}>
                        <Col className={'col-8 d-flex justify-content-start align-items-center'}>
                            {isLogin ?
                                <div>
                                    Didn't have an account? <NavLink to={REGISTRATION_ROUTE}>Create an account</NavLink>
                                </div>
                                :
                                <div>
                                    Already have an account? <NavLink to={LOGIN_ROUTE}>Login</NavLink>
                                </div>
                            }
                        </Col>
                        <Col className={'col-4 text-end'}>
                            <Button
                                variant={'outline-success'}
                                onClick={getAuth}
                            >
                                {isLogin ? 'Login' : 'Register'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;