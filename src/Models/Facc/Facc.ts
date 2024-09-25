import { formasp } from "src/app/frm-rcl/TodosRCL";
import { Faccprest } from "./Faccprest";
import { Faccl } from "./Faccl";
import { Fcc } from "./Fcc";
import { Faccanexo } from "./Faccanexo";

export interface Facc {
    faccstamp: string;
    numdoc: number;
    tdocfstamp: string;
    sigla: string;
    numero: number;
    data: string;
    dataven: string;
    no: string;
    nome: string;
    moeda: string;
    subtotal: number;
    perdesc: number;
    desconto: number;
    totaliva: number;
    total: number;
    msubtotal: number;
    mdesconto: number;
    mtotaliva: number;
    mtotal: number;
    anulado: boolean;
    codInterno: string;
    movtz: boolean;
    movstk: boolean;
    movcc: boolean;
    nomedoc: string;
    codmovstk: number;
    descmovstk: string;
    codmovcc: number;
    descmovcc: string;
    numinterno: string;
    ccusto: string;
    obs: string;
    oristamp: string;
    aprovado: boolean;
    tipodoc: number;
    integra: boolean;
    reserva: boolean;
    no2: number;
    nome2: string;
    cambiousd: number;
    moeda2: string;
    pjnome: string;
    pjstamp: string;
    comprado: boolean;
    encomenda: boolean;
    pjno: number;
    requisicao: string;
    fncstamp: string;
    descontofin: number;
    mDescontofin: number;
    perdescfin: number;
    codCondPagamento: number;
    descCondPagamento: string;
    ccustamp: string;
    usrstamp: string;
    nc: boolean;
    nd: boolean;
    ft: boolean;
    vd: boolean;
    nuit: number;
    faccprest: Faccprest[];
    faccl: Faccl[];
    formasp: formasp[];
    fcc: Fcc[];
    faccanexo: Faccanexo[];
}