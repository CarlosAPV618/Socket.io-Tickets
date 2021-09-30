import React, { useContext, useState } from 'react';

import { Redirect, useHistory } from 'react-router-dom';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Button, Divider } from 'antd';

import {SocketContext} from '../context/SocketContext'

import useMenu from '../hooks/useMenu';
import { getUsuarioStorage } from '../functions/getUsuarioStorage';

const {Title, Text} = Typography

const Desktop = () => {

    useMenu(true)

    const [ usuario ] = useState(getUsuarioStorage())
    const [siguienteTicket, setSiguienteTicket] = useState('...')
    const [quedanTickets, setQuedanTickets] = useState(true)
    const {socket} = useContext(SocketContext)
    const history = useHistory()
    
    const exit = () => {
        localStorage.clear()
        history.replace('/ingresar')
    }
    const next = () => {
        socket.emit('siguiente-ticket', usuario, ({numero}) => {
            if (!numero) setQuedanTickets(false)
            else {
                setQuedanTickets(true)
                setSiguienteTicket(numero)
            }
        })
    }

    if (!usuario.agente || !usuario.escritorio) return <Redirect to='/ingresar'/>
    
    return (
        <>
            <Row>
                <Col span={20}>
                    <Title level={2}>{usuario.agente}</Title>
                    <Text>Escritorio </Text>
                    <Text type='success'>{usuario.escritorio}</Text>
                </Col>

                <Col span={4} align='right'>
                    <Button
                        shape='round'
                        type='danger'
                        onClick={exit}
                    >
                        <CloseCircleOutlined />
                        Salir
                    </Button>
                </Col>
            </Row>

            <Divider />

            <Row>
                <Col>
                    {quedanTickets ? 
                    <>
                        <Text>Esta atendiendo el ticket </Text>
                        <Text style={{fontSize: 30}} type='danger'>{siguienteTicket}</Text>
                    </>
                    : <Text type='success'>No quedan mas tickets</Text>
                    }
                </Col>
            </Row>

            <Row>
                <Col offset={18} span={6} align='right'>
                    <Button
                        type='primary'
                        shape='round'
                        onClick={next}
                    >
                        <RightOutlined />
                        Siguiente
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default Desktop;