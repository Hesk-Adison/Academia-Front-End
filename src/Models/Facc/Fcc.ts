import { Pgf } from "../Pgf/Pgf";
import { Facc } from "./Facc";

export interface Fcc {
    fccstamp: string;
    origem: string;
    oristamp: string;
    nrdoc: number;
    no: string;
    nome: string;
    data: string;
    vencim: string;
    debito: number;
    debitom: number;
    debitof: number;
    debitofm: number;
    credito: number;
    creditom: number;
    creditof: number;
    creditofm: number;
    documento: string;
    moeda: string;
    saldo: number;
    codmov: number;
    reffornec: string;
    faccstamp: string;
    pgfstamp: string;
    rdfstamp: string;
    ccusto: string;
    pgflstamp: string;
    numinterno: string;
    cambiousd: number;
    rcladiant: boolean;
    pgf: Pgf;
    fncstamp: string;
    usrstamp: string;
    facc: Facc;
}