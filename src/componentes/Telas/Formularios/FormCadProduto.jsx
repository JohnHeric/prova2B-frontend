/*import { Button, Spinner, Col, Form, InputGroup, Row} from 'react-bootstrap';
import { consultarCategoria } from '../../../servicos/servicoCategoria';
//import { alterarProduto, gravarProduto } from '../../../servicos/servicoProduto';
import toast, {Toaster} from 'react-hot-toast';
// redux
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { editarProdutoReducer, inserirProdutoReducer, buscarProdutos } from '../../../redux/produtoReducer';


export default function FormCadProdutos(props) {
    const [produto, setProduto] = useState(props.produtoSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [temCategorias, setTemCategorias] = useState(false);

    const despachante = useDispatch();

    useEffect(()=>{
        despachante(buscarProdutos());
    },[despachante]);

    useEffect(()=>{
        consultarCategoria().then((resultado)=>{
            if (Array.isArray(resultado)){
                setCategorias(resultado);
                setTemCategorias(true);
                toast.success("Categorias Carregadas com Sucesso!");
            }
            else{
                toast.error("Não foi possível carregar as categorias");
            }
        }).catch((erro)=>{
            setTemCategorias(false);
            toast.error("Não foi possível carregar as categorias");
        });
        
    },[]); //didMount
    function selecionarCategoria(evento){
        setProduto({...produto, categoria:{codigo:evento.currentTarget.value}})

    }
    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                //cadastrar o produto
                // gravarProduto(produto)
                // .then((resultado)=>{
                //     if(resultado.status){
                //         props.setExibirTabela(true);
                //         toast.success("Produto Cadastrado!");
                //     }
                //     else{
                //         toast.error(resultado.mensagem);
                //     }
                // });
                // redux
                despachante(inserirProdutoReducer(produto));
            }
            else {
                //editar o produto
                /*altera a ordem dos registros
                props.setListaDeProdutos([...props.listaDeProdutos.filter(
                    (item) => {
                        return item.codigo !== produto.codigo;
                    }
                ), produto]);*/

                //antigo
                //  alterarProduto(produto)
                //     .then((resultado)=>{
                //     if (resultado.status){
                //         props.setModoEdicao(false);
                //         toast.success("Produto Alterado");
                //     }
                //     else
                //         toast.error(resultado.mensagem);
                // });

                /*props.setListaDeProdutos(props.listaDeProdutos.map((item) => {
                    if (item.codigo !== produto.codigo)
                        return item
                    else
                        return produto
                }));

                //voltar para o modo de inclusão
                //redux
                despachante(editarProdutoReducer(produto));
                props.setModoEdicao(false);
            }
            props.setModoEdicao(false);
                props.setProdutoSelecionado({
                codigo: 0,
                descricao: "",
                precoCusto: 0,
                precoVenda: 0,
                qtdEstoque: 0,
                urlImagem: "",
                dataValidade: ""
                });
                props.setExibirTabela(true);
        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setProduto({ ...produto, [elemento]: valor });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={produto.codigo}
                        disabled
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={produto.descricao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a descrição do produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Preço de Custo:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="precoCusto">R$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="precoCusto"
                            name="precoCusto"
                            aria-describedby="precoCusto"
                            value={produto.precoCusto}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o preço de custo!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Preço de Venda:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="precoVenda">R$</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="precoVenda"
                            name="precoVenda"
                            aria-describedby="precoVenda"
                            value={produto.precoVenda}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o preço de venda!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Qtd em estoque:</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="qtdEstoque">+</InputGroup.Text>
                        <Form.Control
                            type="text"
                            id="qtdEstoque"
                            name="qtdEstoque"
                            aria-describedby="qtdEstoque"
                            value={produto.qtdEstoque}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a quantidade em estoque!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Url da imagem:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="urlImagem"
                        name="urlImagem"
                        value={produto.urlImagem}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a url da imagem do produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Válido até:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="dataValidade"
                        name="dataValidade"
                        value={produto.dataValidade}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a data de validade do produto!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={7}>
                    <Form.Label>Categoria:</Form.Label>
                    <Form.Select id='categoria' name='categoria' onChange={selecionarCategoria}>
                        {// criar em tempo de execução as categorias existentes no banco de dados
                            categorias.map((categoria) =>{
                                return <option value={categoria.codigo}>
                                            {categoria.descricao}
                                       </option>
                            })
                        }
                        
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md={1}>
                    {
                      !temCategorias ? <Spinner className='mt-4' animation="border" variant="success" />
                      : ""
                    }
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit" disabled={!temCategorias}>{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
            <Toaster position="top-right"/>
        </Form>
        
    );
}*/

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
