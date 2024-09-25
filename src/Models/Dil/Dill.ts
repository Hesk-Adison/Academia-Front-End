import { Dil } from "./Dil";

export interface Dill {
    dillstamp: string;
    dilstamp: string;
    numdoc: number;
    sigla: string;
    ref: string;
    descricao: string;
    quant: number;
    unidade: string;
    armazem: number;
    armazem2: number;
    preco: number;
    mpreco: number;
    lote: string;
    tabiva: number;
    txiva: number;
    valival: number;
    mvalival: number;
    ivainc: boolean;
    perdesc: number;
    descontol: number;
    mdescontol: number;
    subtotall: number;
    msubtotall: number;
    totall: number;
    mtotall: number;
    ordem: number;
    cambiol: number;
    descarm: string;
    servico: boolean;
    dil: Dil;
    nome: string;
    no: string;
    matricula: string;
}