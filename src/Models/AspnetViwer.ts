import { AspnetUser } from "./DMZusers";

export interface ViewAspnetuser{
    [x: string]: any;

    AspnetUser: AspnetUser[]
}



// export interface DmzUser  {
//     tipoPerfil: number;
//     usrstamp: string | null;
//     numero: number | null;
//     tipoAcesso: number | null;
//     nome: string | null;
//     login: string | null;
//     pos: boolean;
//     usradmin: boolean;
//     codccu: string | null;
//     ccusto: string | null;
//     contacto: string | null;
//     codposto: number | null;
//     posto: string | null;
//     pw: string | null;
//     mostraLimpar: boolean;
//     codtz: number | null;
//     contaTesoura: string | null;
//     codarm: number | null;
//     armazem: string | null;
//     supervisor: boolean;
//     mudasenha: boolean;
//     sigla: string | null;
//     codgrupo: number | null;
//     grupo: string | null;
//     aprovaPagamento: boolean;
//     desconto: boolean;
//     fechacaixa: boolean;
//     abrecaixa: boolean;
//     status: string | null;
//     codstatus: string | null;
//     contasstamp: string | null;
//     valorMaxPagamento: number | null;
//     mostraprcompra: boolean;
//     reabrePj: boolean;
//     alteracambio: boolean;
//     alteraNumero: boolean;
//     mostrasaldo: boolean;
//     mostraextrato: boolean;
//     naoMostrafacturacao: boolean;
//     naoMostraProcessos: boolean;
//     naoMostraCadastro: boolean;
//     naoMostraConfig: boolean;
//     naoMostracompras: boolean;
//     naoMostravendas: boolean;
//     naoMostraAnalises: boolean;
//     usanormal: boolean;
//     impnormal: string | null;
//     imppos: string | null;
//     lingua: number | null;
//     armazemstamp: string | null;
//     ccustamp: string | null;
//     tipousr: number | null;
//     naoaltera: boolean;
//     clstamp: string | null;
//     peStam: string | null;
//     fncStam: string | null;
// }

