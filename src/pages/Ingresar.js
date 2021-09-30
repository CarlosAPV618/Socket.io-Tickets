import { SaveOutlined } from '@ant-design/icons';
import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { getUsuarioStorage } from '../functions/getUsuarioStorage';
import useMenu from '../hooks/useMenu';

const { Title, Text  } = Typography

const Ingresar = () => {
    
    useMenu(true)

    const [ usuario ] = useState(getUsuarioStorage())
    
    const history = useHistory()
    
    const onFinish = ({agente, escritorio}) => {
        localStorage.setItem('agente', agente)
        localStorage.setItem('escritorio', escritorio)
        history.push('/desktop')
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    if (usuario.agente && usuario.escritorio) return <Redirect to='/desktop'/>
    
    return (
        <>
            <Title>Ingresar</Title>
            <Text style={{fontSize: 15}}>Ingrese su nombre y numero de escritorio</Text>
            <Divider />
            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Nombre del agente"
                    name="agente"
                    rules={[
                    {
                        required: true,
                        message: 'Debes ingresar tu nombre',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Escritorio"
                    name="escritorio"
                    rules={[
                    {
                        required: true,
                        message: 'Debes indicar el numero de escritorio',
                    },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                    offset: 12,
                    span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" shape='round'>
                        <SaveOutlined />
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Ingresar