/*
Para fazer o deploy no Rancher de produção, é necessário fazer a configuração interna
das rotas da API via variavel de ambiente para que se adeque a rota raiz que lhe for 
dada pela configuração do rancher.
*/
const rootEndpoint: string = process.env.CETURB_ROOT_ENDPOINT || ''; //endpoint raiz no rancher

export class Endpoints {
    constructor(
        readonly rotaRaiz: string = rootEndpoint
    ) { }
}
