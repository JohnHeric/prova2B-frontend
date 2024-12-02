import { Button, Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function FormCadUsuarios(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado || { nickname: '', urlAvatar: '', senha: '' });
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.modoEdicao) {
                // Alterar usuário
                props.alterarUsuario(usuario);
                toast.success('Usuário alterado com sucesso!');
            } else {
                // Adicionar novo usuário
                props.adicionarUsuario(usuario);
                toast.success('Usuário cadastrado com sucesso!');
            }
            props.setExibirTabela(true);
            props.setUsuarioSelecionado(null);
        } else {
            setFormValidado(true);
        }
    }

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setUsuario({ ...usuario, [name]: value });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Col md="12">
                    <Form.Group controlId="nickname">
                        <Form.Label>Nickname</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="nickname"
                            value={usuario.nickname}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">Por favor, insira o nickname!</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md="12">
                    <Form.Group controlId="urlAvatar">
                        <Form.Label>URL do Avatar</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="urlAvatar"
                            value={usuario.urlAvatar}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">Por favor, insira a URL do avatar!</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md="12">
                    <Form.Group controlId="senha">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            name="senha"
                            value={usuario.senha}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">Por favor, insira a senha!</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md="1">
                    <Button type="submit">{props.modoEdicao ? 'Alterar' : 'Cadastrar'}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => props.setExibirTabela(true)}>Voltar</Button>
                </Col>
            </Row>
            <Toaster position="top-right" />
        </Form>
    );
}
