//const urlBase = 'https://bcc-backend-lp-2-three.vercel.app/produtos';
//const urlBase = 'https://localhost:3000/produtos';
const urlBase = 'https://sistema-backend-five.vercel.app/produtos';

//const urlBase = 'https://backend-bcc-2-b.vercel.app/usuario';
export async function gravarProduto(produto){
    const resposta = await fetch(urlBase,{
        'method':"POST",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(produto)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarProduto(produto){
    const resposta = await fetch(urlBase + "/" + produto.codigo,{
        'method':"PUT",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(produto)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirProduto(produto){
    const resposta = await fetch(urlBase + "/" + produto.codigo,{
        'method':"DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarProduto() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}