import { Dil } from "./Dil/Dil";
import { Faccl } from "./Facc/Faccl";
import { Factl } from "./Fact/Factl";
import { IVL } from "./IVL/IVL";

export interface Mstk {
    mstkstamp: string;
    oristamp: string;
    stampcab: string;
    ststamp: string;
    entidadestamp: string;
    origem: string;
    data: string;
    tipodoc: string;
    nrdoc: number;
    documento: string;
    numdoc: number;
    ref: string;
    descricao: string;
    entrada: number;
    saida: number;
    vendido: number;
    vendidosaida: number;
    comparado: number;
    comparadoentrada: number;
    reserva: number;
    reservasaida: number;
    encomenda: number;
    encomendaentrada: number;
    codarm: number;
    preco: number;
    moeda: string;
    entidade: number;
    no: number;
    nome: string;
    datahora: string;
    lote: string;
    codmovstk: number;
    descmovstk: string;
    numinterno: string;
    factstamp: string;
    faccstamp: string;
    distamp: string;
    ivstamp: string;
    factlstamp: string;
    facclstamp: string;
    dilstamp: string;
    ivlstamp: string;
    turno: string;
    vendedor: string;
    codvend: number;
    serie: string;
    ivainc: boolean;
    tabiva: number;
    txiva: number;
    preco2: number;
    preco3: number;
    lotevalid: string;
    lotelimft: string;
    usalote: boolean;
    qttmedida: number;
    totalmedida: number;
    ccusto: string;
    codccu: string;
    unidade: string;
    armazemstamp: string;
    ccustamp: string;
    usrstamp: string;
    factl: Factl;
    dil: Dil;
    faccl: Faccl;
    iVL: IVL;
}