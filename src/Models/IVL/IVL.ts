import { Mstk } from "../Mstk";
import { IV } from "./IV";

export interface IVL {
    ivlstamp: string;
    ivstamp: string;
    numdoc: number;
    sigla: string;
    referenc: string;
    descricao: string;
    quant: number;
    unidade: string;
    armazem: number;
    preco: number;
    totall: number;
    status: boolean;
    servico: boolean;
    difer: number;
    nmovstk: boolean;
    remotestamp: string;
    tit: boolean;
    ordem: number;
    titstamp: string;
    lote: string;
    lotevalid: string;
    lotelimft: string;
    usalote: boolean;
    iV: IV;
    mstk: Mstk[];
}