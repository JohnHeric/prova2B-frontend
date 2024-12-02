/*import { useState } from 'react';
import { Container, Form, Row, Col, Button, FloatingLabel, Spinner } from 'react-bootstrap';

export default function FormCadCategorias(props) {
    return (
        <Container>
            <Form noValidate>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Código:"
                                className="mb-3"
                            >

                                <Form.Control
                                    type="text"
                                    placeholder="0"
                                    id="codigo"
                                    name="codigo"
                                    disabled />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o código da categoria!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Categoria:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe a descrição da categoria"
                                    id="descricao"
                                    name="descricao"
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a descrição da categoria!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} offset={5}>
                        <Button type="button" variant={"secondary"}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );

}*/

import { Button, Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function FormCadMensagem(props) {
    const [mensagem, setMensagem] = useState(
        props.mensagemSelecionada || { id: '', dataHora: '', lida: false, mensagem: '', usuario: '' }
    );
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (props.modoEdicao) {
                // Alterar mensagem
                props.alterarMensagem(mensagem);
                toast.success('Mensagem alterada com sucesso!');
            } else {
                // Adicionar nova mensagem
                props.adicionarMensagem(mensagem);
                toast.success('Mensagem cadastrada com sucesso!');
            }
            props.setExibirTabela(true);
            props.setMensagemSelecionada(null);
        } else {
            setFormValidado(true);
        }
    }

    function manipularMudanca(evento) {
        const { name, value, type, checked } = evento.target;
        setMensagem({ ...mensagem, [name]: type === 'checkbox' ? checked : value });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Col md="12">
                    <Form.Group controlId="id">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="id"
                            value={mensagem.id}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">Por favor, insira o ID!</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md="12">
                    <Form.Group controlId="dataHora">
                        <Form.Label>Data e Hora</Form.Label>
                        <Form.Control
                            required
                            type="datetime-local"
                            name="dataHora"
                            value={mensagem.dataHora}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">Por favor, insira a data e hora!</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md="12">
                    <Form.Group controlId="lida">
                        <Form.Check
                            type="checkbox"
                            name="lida"
                            label="Mensagem Lida"
                            checked={mensagem.lida}
                            onChange={manipularMudanca}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md="12">
                    <Form.Group controlId="mensagem">
                        <Form.Label>Mensagem</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            rows={3}
                            name="mensagem"
                            value={mensagem.mensagem}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">Por favor, insira a mensagem!</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md="12">
                    <Form.Group controlId="usuario">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="usuario"
                            value={mensagem.usuario}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type="invalid">Por favor, insira o usuário!</Form.Control.Feedback>
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
