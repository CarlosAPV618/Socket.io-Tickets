import React, { useContext, useEffect, useState } from 'react';

import { Col, Row, Typography, List, Card, Tag, Divider } from 'antd'

import {SocketContext} from '../context/SocketContext'
import useMenu from '../hooks/useMenu';
import getUltimos from '../functions/getUltimos';

const {Title, Text} = Typography

const Cola = () => {
    const [data, setData] = useState([])
    useMenu(false)
    const {socket} = useContext(SocketContext)

    useEffect(() => {
        socket.on('actualizarHistorial', setData)
        return () => socket.off('actualizarHistorial')
    },[socket])

    useEffect(() => {
        getUltimos().then(setData).catch(console.log)
    },[])

    return (
        <>
            <Title>Atendiendo al cliente</Title>
            <Row>
                <Col span={10}>
                    <List 
                        dataSource={data.slice(0,3)}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    style={{marginTop: 16, width: 300, textAlign: 'center'}}
                                    actions={[
                                        <Tag color='blue'>{item.agente}</Tag>,
                                        <Tag color='gold'>Escritorio {item.escritorio}</Tag>,
                                    ]}
                                >
                                    <Title level={3}>Ticket {item.numero}</Title>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Col>

                <Col span={12} offset={1}>
                    <Divider>Historial</Divider>
                    <List 
                        dataSource={data.slice(3, 13)}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta 
                                    title={`Ticket ${item.numero}`}
                                    description={
                                        <>
                                            <Text style={{marginRight: 10}} type='secondary'>
                                                Escritorio: 
                                            </Text>
                                            <Tag color='gold'>{item.escritorio}</Tag>

                                            <Text style={{marginLeft: 10, marginRight: 10}} type='secondary'>
                                                Agente: 
                                            </Text>
                                            <Tag color='blue'>{item.agente}</Tag>
                                        </>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Cola;