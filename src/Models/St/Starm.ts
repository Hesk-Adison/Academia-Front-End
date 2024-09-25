import { St } from "./St";

export interface Starm {
    starmstamp: string;
    ststamp: string;
    codarm: number;
    descricao: string;
    ref: string;
    stock: number;
    stockMin: number;
    stockMax: number;
    reserva: number;
    encomenda: number;
    vendido: number;
    comprado: number;
    padrao: boolean;
    endereco: string;
    st: St;
}