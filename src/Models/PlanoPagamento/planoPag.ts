import { Planopagp } from "./Planopagp";
import { Planopagt } from "./Planopagt";

export interface Planopag {
    planopagstamp: string;
    codigo: string;
    descricao: string;
    parcelas: number;
    anosem: string;
    anolectivo: number;
    valor: number;
    valorextra: number;
    desconto: number;
    valorparzero: number;
    datapartida: Date;
    datafim: Date;
    diauteis: boolean;
    pularsabados: boolean;
    pulardomingos: boolean;
    pularferiados: boolean;
    tipo: number;
    distrato: boolean;
    valordistrato: number;
    diasvenc: number;
    tipoValdistrato: number;
    descdistrato: string;
    cursostamp: string;
    desccurso: string;
    descanosem: string;
    anoSemstamp: string;
    planopagp: Planopagp[];
    planopagt: Planopagt[];
}