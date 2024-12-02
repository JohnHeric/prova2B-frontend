import Menu from "./Menu";
import Cabecalho from "./Cabecalho";
import { Container } from "react-bootstrap";

export default function Pagina(props) {
    return (
        <>
            <Container>
                <Cabecalho titulo="Prova LP2" />
                <Menu />
                {
                    props.children
                }
            </Container>
        </>

    );
}