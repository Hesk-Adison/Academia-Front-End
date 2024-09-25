
export interface matriculaAluno
{    
     matriculaAlunostamp:string;
     planopagstamp :string;
     numero :number;
     numdoc :number;
     codigo :string;
     refonecedor :string;
     anolectivo :number;
     descplano :number; 
     datapartida :Date;
     cursostamp :string;
     data :Date;//Data de Criacao 
     anoSemstamp :string;
     clstamp :string;
     descricao :string;
     sitcao :string;
     no :number;
     nome :string;
     curso :string;
     codcurso :string;
     datamat :Date;
     turno :string;
     periodo :string;
     anoSem :string;
     codtur :string;
     anolect :string;
     localmat :string;
     emails :string;        
     obs :string;
     gradestamp :string;
     descGrade :string;
     etapa :string;
     turmadiscstamp :string;
     ststamp :string;
     turmastamp :string;
     turnostamp :string;
     codfac :string;//contasstamp
     alauxiliarstamp :string;
     semstamp :string;
     nivelac :string;
     formaingresso :string;        
     ccusto :string;
     ccustostamp :string;
     coddep :string;
     departamento :string;
     faculdade :string;
     descanoaem :string;
     tipo :string;
     activo :boolean;//True=matrícula cancelada e false = matrícula activa        
     motivo :string;//Motivo pelo qual lhe leva ao cancelamento da matrícula
    matriculaTurmaAlunol: matriculaTurmaAlunol[];
    disciplinaTumra:disciplinaTumra[];
    matdisc:matdisc[];
     inscricao :boolean;
     matricula :boolean;
     nomedoc :string;
}
   
export interface matriculaTurmaAlunol
{        
    matriculaTurmaAlunolstamp:string;
    matriculaAlunostamp:string; 
    codigo:string;
    descricao:string;
   anoSemstamp:string;
    descanoaem:string;
    descurso:string;
    cursostamp:string;
    descgrade:string;
    gradestamp:string;
    etapa:string;
    sala:string;
    turno:string;
     vagasmin:number;
     vagasmax:number;
    responsavel:string;
    responsavel2:string;
     semanaslec:number;//Nº de semanas lectivas 
     horasaulas:number;//Nº de horas aulas por semana 
    formaaval:string;//Forma de avaliacao 
    situacao:string;//Selecione a situação da turma entre Em Inscrição (matrículas), Em Andamento (turma em atividade) e Concluída (finalizada)
    obs:string;
      datain:Date;
     datafim:Date;
     horain:Date;
     horafim:Date;
    turmastamp:string;
    turmadiscstamp:string;
    padrao:boolean;//True=matrícula cancelada e false = matrícula activa

  
}
export interface  disciplinaTumra
{        
     disciplinaTumrastamp:string;
     disciplina:string;
     referenc:string;
     matriculaAlunostamp:string;
     turmastamp:string;
     codigo:string;
     ststamp:string;
     clstamp:string;
     sitcao:string;
    activo:boolean;//True=matrícula cancelada e false = matrícula activa       
     motivo:string;//Motivo pelo qual lhe leva ao cancelamento da matrícula
}
   
export interface  matdisc
{
 matdiscstamp:string;
 matstamp:string;
 coddisc:string;
 disc:string;
}
export interface tdocMat
{
    tdocMatstamp:string;
   numdoc:number;
    descricao:string;
    sigla:string;
   defa:boolean;
    inscricao:boolean;
    matricula:boolean;
}

export interface tdocMat
{
    tdocMatstamp:string;
   numdoc:number;
    descricao:string;
    sigla:string;
   defa:boolean;
    inscricao:boolean;
    matricula:boolean;
}

export interface planopag
{   
    planopagstamp:string;
    codigo:string;
    descricao:string;
     parcelas:string;
    anosem:string;
     anolectivo:string;
     valor:string;
     valorextra:number;
     desconto:number;
     valorparzero:number;
     datapartida:Date;
     datafim:Date;
     diauteis:boolean;
     pularsabados:boolean;
     pulardomingos:boolean;
     pularferiados:boolean;
     tipo:number;
     distrato:boolean;
     valordistrato:number;
     diasvenc:number;//Dias de vencimento 
     tipoValdistrato:number;//1-Valor Fixo, 2-Percentagem
    descdistrato:string;//Cursando,Falecido,Matricula cancelada,formando
    cursostamp:string;
    desccurso:string;
    descanosem:string;
    anoSemstamp:string;
    //planopagp:planopagp[];
   // planopagt:planopagt[];
}


   export interface planopagp//Plano de pagamento parcelas 
   {
        planopagpstamp:string;
        planopagstamp:string;
        ordem:number;
        descricao:string;
       data:Date;
        parecela:number;
        valorbruto:number;
        valordesc:number;//valor Desconto 
        valorextra:number;
        valordescextra:number;//Valor desconto extra 
        valorTotal:number;//Valor Total 
        titulo:string;
      pzerro:boolean;//Parcela Zerro
   }
   export interface planopagt
{
     planopagtstamp :string;
     planopagstamp: string;
     codcurso: string;
     codturma: string;
     descturma: string;
     turmastamp: string;
}
export interface tRcl
{
    tRclstamp:string;
    numdoc:Number;
    descricao:string;
    sigla:string;
    descmovcc:string;
    codmovcc:Number;
    codmovtz:Number;
    descmovtz:string;
    contastesoura:string;
    codtz:Number;
    titulo:string;
    ccusto:string;
    obs:string;
    entida:Number;
    activo:Boolean;
    defa:Boolean;
    alteranum:Boolean;
    usaemail:Boolean;
    usaanexo:Boolean;
    integra:Boolean;
    nodiario:Number;
    diario:string;
    ndocCont:Number;
    descDocCont:string;
    nomfile:string;
    nomfile2:string;//Nome do Ficheiro A5
    nomfilePOS:string;
    especial:Boolean; //Usado definir se pode ser visivel, ou emite recibo especial
     rcladiant:Boolean;//Recibo de adiantamento
    reportXml:string;
    xmlString:string;
    xmlStringA5:string;
    xmlStringPOS:string;
}