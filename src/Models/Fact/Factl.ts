import { Mstk } from "../Mstk";
import { Fact } from "./Fact";

export interface Factl {
    factlstamp: string;
    factstamp: string;
    ststamp: string;
    entidadestamp: string;
    numdoc: number;
    sigla: string;
    ref: string;
    descricao: string;
    quant: number;
    unidade: string;
    armazem: number;
    preco: number;
    mpreco: number;
    tabiva: number;
    txiva: number;
    valival: number;
    mvalival: number;
    ivainc: boolean;
    activo: boolean;
    perdesc: number;
    descontol: number;
    mdescontol: number;
    subtotall: number;
    msubtotall: number;
    totall: number;
    mtotall: number;
    status: boolean;
    lote: string;
    servico: boolean;
    oristampl: string;
    dispon: number;
    qttOrig: number;
    nmovstk: boolean;
    oristamp: string;
    tit: boolean;
    ordem: number;
    stkprod: boolean;
    lineAnulado: boolean;
    titstamp: string;
    contatz: number;
    pack: number;
    cpoc: number;
    cpoo: number;
    composto: boolean;
    usalote: boolean;
    descarm: string;
    refornec: string;
    usaquant2: boolean;
    quant2: number;
    morada: string;
    telefone: string;
    entrega: boolean;
    dataentrega: string;
    pcontacto: string;
    email: string;
    pais: string;
    guias: string;
    contrato: string;
    gasoleo: boolean;
    cambiousd: number;
    moeda: string;
    moeda2: string;
    ccusto: string;
    codccu: string;
    obs: string;
    armazemstamp: string;
   // fact: Fact;
  //  mstk: Mstk[];
}