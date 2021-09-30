import React, { useContext, useState } from 'react';

import { Button, Col, Row, Typography } from 'antd';
import {DownloadOutlined} from '@ant-design/icons'

import useMenu from '../hooks/useMenu';
import { SocketContext } from '../context/SocketContext';

const {Title, Text} = Typography

const NewTicket = () => {
    
    useMenu(false)

    const [ticket, setTicket] = useState(null)

    const {socket} = useContext(SocketContext)

    const nuevoTicket = () => {
        socket.emit('nuevo-ticket', null, ({numero}) => {
            setTicket(numero)
        })
    }
    
    return (
        <>
            <Row>
                <Col span={14} offset={5} align='center'>
                    <Title level={3}>Presione el boton para un nuevo ticket</Title>
                    <Button
                        type='primary'
                        shape='round'
                        icon={<DownloadOutlined />}
                        size='large'
                        onClick={nuevoTicket}
                    >
                        Nuevo Ticket
                    </Button>
                </Col>
            </Row>

            <Row style={{ marginTop: 130 }}>
                <Col span={14} offset={5} align='center'>
                    <Text style={{fontSize:16}}>Su numero </Text>
                    <br/>
                    <Text style={{fontSize: 55}} type='success'>{ticket}</Text>
                </Col>
            </Row>
        </>
    );
};

export default NewTicket;