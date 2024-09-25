import { Planopag } from "./planoPag";

export interface Planopagp {
    planopagpstamp: string;
    planopagstamp: string;
    ordem: number;
    descricao: string;
    data: string;
    parecela: number;
    valorbruto: number;
    valordesc: number;
    valorextra: number;
    valordescextra: number;
    valorTotal: number;
    titulo: string;
    pzerro: boolean;
    planopag: Planopag;
}