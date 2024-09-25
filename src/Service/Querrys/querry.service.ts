import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuerryService {

  constructor() { }


  querryTdoc(): string{
    let tdoc="Tdocstamp , Numdoc,Descricao,Sigla,Movstk,Movcc,Descmovcc,Codmovcc,Codmovstk,Descmovstk,Movtz,Codtz,Contastesoura,CCusto,Noneg,Armazem,Tipodoc,Ligapj,Obrigapj,Usaserie,Usalote,Integra,NoDiario,Diario,NDocCont,Descdoccont,Alteranum,CtrlData,Armdefeito,Composto,Obgccusto,Nalteratz,Activo,Defa,Pos,Reserva,Armapenas,Coment,Titulo,Nc,Nomfile,Obs2,No,Nome,Adjudica,Aprova,Codmovtz,Descmovtz,Dias,Nd,Ft,Vd,Usamascara,Mascara,Plafond,Lancaend,Stockmin,Mostraguia,MostraContrato,Lancacustopj,Nomfile2,Nomfile3,Ncobrigadoc,'','',Inscricao,Multa,'',''"
    return tdoc
  }

  querryMaxFtFccDiRcl(campo : string): string{
    let querry=` ISNULL(max(convert(int,${campo})),0) +1 as ${campo}`
    return querry
  }


  QuerryclFact():string {

var fff=`
''Codcurso,''Curso,''Descgrelha,''Gradestamp,''Nivelac,''Coddep,''Departamento,''Faculdade,''Ccusto,
 ''Ccustostamp,''Tipo,''clstamp,''no,''nome,''Email,''nuit,''morada,''localidade,''Moeda,'' Turma,''Turmastampunion, ''entidadebanc union all 
 select Convert(nvarchar(max),Codcurso)Codcurso,CONVERT(nvarchar(max),Curso)Curso,CONVERT(nvarchar(max),Descgrelha)Descgrelha,CONVERT(nvarchar(max),
 Gradestamp)Gradestamp,CONVERT(nvarchar(max),Nivelac)Nivelac,CONVERT(nvarchar(max),Coddep)Coddep,CONVERT(nvarchar(max),Departamento)Departamento,CONVERT(nvarchar(max),Faculdade)Faculdade,CONVERT(nvarchar(max),Ccusto)Ccusto,CONVERT(nvarchar(max),Ccustostamp)Ccustostamp,CONVERT(nvarchar(max),Tipo)Tipo,CONVERT(nvarchar(max),clstamp)clstamp,CONVERT(nvarchar(max),no)no,CONVERT(nvarchar(max),nome)nome,CONVERT(nvarchar(max),Email)Email,CONVERT(nvarchar(max),nuit)nuit,CONVERT(nvarchar(max),morada)morada,CONVERT(nvarchar(max),localidade)localidade,CONVERT(nvarchar(max),Moeda)Moeda ,Turma=(select top 1 Turma.Codigo from Turma join Turmal l on Turma.Turmastamp=l.Turmastamp where l.Clstamp=cl.Clstamp and Turma.Descanoaem=(select AnoSem from param) ),Turmastamp=(select top 1 Turma.Turmastamp from Turma join Turmal l on Turma.Turmastamp=l.Turmastamp where l.Clstamp=cl.Clstamp and Turma.Descanoaem=(select AnoSem from param) ), entidadebanc=(select top 1 Entidadebanc from Contas) `
    return fff
  }
}
