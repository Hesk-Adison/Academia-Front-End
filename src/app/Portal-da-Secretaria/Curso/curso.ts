import { cursoacto } from "./cursoacto";
import { cursodoc } from "./cursodoc";
import { cursograd } from "./cursograd";

export interface curso
{        
    cursostamp:string;
    codcurso:string;
    desccurso:string;
    tipo:number; //1-Normal, 2- Modular, 3- ETC
    status:string;
    nivel:string;
    nivelstamp:string;
    cargahora:number;//Carga Horaria 
    cursoeq:string; //Curso Equivalente     
    duracao:number; //Duracao da Hora 
    codmec:string; //Codigo do Ministerio da Educacao 
   habmec:string; //Habilitacoes do Ministerio da Educacao    
    obs:string;
    imagem:any;
    cCusto:string;
    ccustamp:string;
    ccudepstamp:string;
    departamento:string;
    pestamp:string;
    director:string;
    cursoacto:cursoacto[];
    cursodoc:cursodoc[];
    cursograd:cursograd[];
    //turma:turma[];
}