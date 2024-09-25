import { rltview } from "src/app/Interfaces/rltview";

export interface  rtlviewsingleheader
{
    modulo: string
    ctitulorelatorio: string
    origem: string
    condicaoorigem: string
    condicao: string
    filtrado: string
    tbClientenome: string
    tbClienteno: string
    tbClientestam: string
    formasp: string
     dmzddn1: boolean
    dmzddn1dt :string 
    dmzdata1 :string   
    tbccusto: string
    tbccustostamp: string
    moeda: string
    tbpj: string
    tbusr: string
    tbusrstamp: string
    tbcurso: string
    tbcursostamp: string
    tbturma: string
    tbturmastamp: string
    profstamp: string
    prof: string
    tbcorredor: string
    tbcorredorstamp: string
    tbanosem: string
    tbanosemstamp: string
    tbdisciplina: string
    tbdisciplinastamp: string
    tbplano: string
    tbplanostamp: string
    tbetapa: string
    tbetapastamp: string
    tesouraria: string
    tesourariastamp: string
    rltview :rltview
     filtrodata : string
     dmzentreanos1: boolean
     dmzentreanos1nume: Number
     dmzentreanos2nume: Number
     dmzentredatas1: boolean
     dmzentredatas1nume :string 
     dmzentredatas2nume  :string 
}
