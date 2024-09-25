import { Facc } from "./Facc";

export interface Faccprest {
    faccpreststamp: string;
    faccstamp: string;
    descricao: string;
    data: string;
    perc: number;
    valor: number;
    obs: string;
    status: boolean;
    facc: Facc;
}