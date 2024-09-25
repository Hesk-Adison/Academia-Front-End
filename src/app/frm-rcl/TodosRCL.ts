
// export interface rCL
// {
//     rclstamp :string;
//     numero :number;
//     tRclstamp :string;
//     data : Date;    
//     nuit :number;
//     morada :string;
//     localidade :string;
//     no :string;
//     nome :string;
//     moeda :string;
//     banco :string;    
//     total :number;    
//     mtotal :number;
//     obs :string;
//     process :boolean;
//     rcladiant :boolean;//Recibo de adiantamento
//     dprocess :Date;
//     anulado :boolean;
//     ccusto :string;
//     numdoc :number;
//     sigla :string;
//     nomedoc :string;
//     codmovcc :number;
//     descmovcc :string;
//     codmovtz :number;
//     descmovtz :string;
//     nomecomerc :string;
//     integra :boolean;
//     nodiario :number;
//     diario :string;
//     ndocCont :number;
//     descDocCont :string;
//     estabno :number;
//     estabnome :string;
    
//     cambiousd :number;
//     moeda2 :string;
//     especial :boolean; //Usado definir se pode ser visivel, ou recebe pagamento especial
//     pjno :number;
//     pjstamp :string;
//     clstamp :string;
//     pjNome :string;
    
//     descontofin :number;
    
//     mDescontofin :number;
    
//     perdescfin :number;
//     usrstamp :string;
//     ccustamp :string;
//     pos :boolean;//Indica a factura foi feita no pos
//                                  //
//     cursostamp :string;
//     desccurso :string;
//     turmastamp :string;
//     descturma :string;
//     anosem :string;
//     etapa :string;
//     cc: cc[];
//     formasp: formasp[];
//     rcll: rcll[];
// }
   
   
   
// export interface cc
// {
//     ccstamp:string;
//     origem:string;
//     oristamp:string;
//     nrdoc:number;
//     no:string;
//     nome:string;
//     data:Date;
//     vencim:Date;
   
//     debito:number;       
//     debitom:number;       
//     debitof:number;       
//     debitofm:number;       
//     credito:number;       
//     creditom:number;       
//     creditof:number;       
//     creditofm:number;
//     documento:string;
//     moeda:string;
   
//     saldo:number;
//     codmov:number;
//     factstamp:string;
//     rclstamp:string;
//     clstamp:string;
//     usrstamp:string;
//     rdstamp:string;
//     ccusto:string;
//     numinterno:string;
//     estabno:number;
//     estabnome:string;
    
//     cambiousd:number;
    
//     descontofin:number;
    
//     mDescontofin:number;
//     rcladiant:boolean;//Recibo de adiantamento
//     entidadebanc:string;
//     referencia:string;
//     pos:boolean;//Indica a factura foi feita no pos 
// }
   
//  export interface formasp
// {
//     formaspstamp :string;
//     titulo :string;
//     numtitulo :string;
//     dcheque :Date;
//     banco :string;
//     banco2 :string;
//     //[Required(ErrorMessage = "A conta tesouraria não pode ser vazio")]
//     contatesoura :string;
//      valor :number;
//     //[Required(ErrorMessage = "O número da tesouraria não pode ser vazio")]
//     codtz :number;
//     codtz2 :number;
//     contatesoura2 :string;
//     contasstamp2 :string;
//      trf :boolean;
//      numer :boolean;
//      tipo :boolean;
//      obgTitulo :boolean;
//     rclstamp :string;
//     oristamp :string;
//     factstamp :string;
//     faccstamp :string;
//     pgfstamp :string;
//     perclstamp :string;
//      status :boolean;
//     distamp :string;
//      cpoc :number;
//      contaPgc :number;
//     origem :string;
//      mvalor :number;
//      codmovtz :number;
//     descmovtz :string;
//      codmovtz2 :number;
//     descmovtz2 :string;
//     usrLogin :string;//RECEBE O STAMP DO UTILIZADOR 
//      aberturaCaixa :boolean;
//     no :number;
//     nome :string;
//     numero :number;
//     ccusto :string;
   
//     contasstamp :string;
//     ccustamp :string;
//     moeda :string;
//      cambiousd :number;
          

// }
// export interface rcll
// {
//     rcllstamp:string;
//     rclstamp:string;
//     ccstamp:string;
//     data:Date;
//     nrdoc:string;
//     descricao:string;
//     valorpreg:number;
//     valordoc:number;
//     mValordoc:number;
//     valorreg:number;
//     valorPend:number;
//     mvalorPend:number;
//     anulado:boolean;
//     numinterno:string
//     cambiousd:number;
//     origem:string;
//     mvalorpreg:number;
//     mvalorreg:number;
//     descontofin:number;//Desconto Financeiro 
//     mDescontofin:number;//Moeda Desconto financeiro 
//     perdescfin:number;//Percentagem de desconto financeiro 
//     rcladiant:boolean;//Recibo de adiantamento
// }
   


export interface rCL
{
    rclstamp :string;
    numero :number;
    tRclstamp :string;
    data : string;
    nuit :number;
    morada :string;
    localidade :string;
    no :string;
    nome :string;   
    moeda :string;
    banco :string;
    total :number;
    mtotal :number;
    obs :string;
    process :boolean;
    rcladiant :boolean;//Recibo de adiantamento
    dprocess :string;
    anulado :boolean;
    ccusto :string;
    numdoc :number;
    sigla :string;
    nomedoc :string;
    codmovcc :number;
    descmovcc :string;
    codmovtz :number;
    descmovtz :string;
    nomecomerc :string;
    integra :boolean;
    nodiario :number;
    diario :string;
    ndocCont :number;
    descDocCont :string;
    estabno :number;
    estabnome :string;
    cambiousd :number;
    moeda2 :string;
    especial :boolean; //Usado definir se pode ser visivel, ou recebe pagamento especial
    pjno :number;
    pjstamp :string;
    clstamp :string;
    pjNome :string;
    descontofin :number;
    mDescontofin :number;
    perdescfin :number;
    usrstamp :string;
    ccustamp :string;
    pos :boolean;//Indica a factura foi feita no pos
    cursostamp :string;
    desccurso :string;
    turmastamp :string;
    descturma :string;
    anosem :string;
    etapa :string;
    cc: cc[];
    formasp: formasp[];
    rcll: rcll[];
}



export interface cc
{
    ccstamp:string;
    origem:string;
    oristamp:string;
    nrdoc:number;
    no:string;
    nome:string;
    data:string;
    vencim:string;
    debito:number;
    debitom:number;
    debitof:number;
    debitofm:number;
    credito:number;
    creditom:number;
    creditof:number;
    creditofm:number;
    documento:string;
    moeda:string;
    saldo:number;
    codmov:number;
    factstamp:string;
    rclstamp:string;
    clstamp:string;
    usrstamp:string;
    rdstamp:string;
    ccusto:string;
    numinterno:string;
    estabno:number;
    estabnome:string;
    cambiousd:number;
    descontofin:number;
    mDescontofin:number;
    rcladiant:boolean;//Recibo de adiantamento
    entidadebanc:string;
    referencia:string;
    pos:boolean;//Indica a factura foi feita no pos
}

 export interface formasp
{
    formaspstamp :string;
    titulo :string;
    numtitulo :string;
    dcheque :string;
    banco :string;
    banco2 :string;
    //[Required(ErrorMessage = "A conta tesouraria não pode ser vazio")]
    contatesoura :string;
     valor :number;
    //[Required(ErrorMessage = "O número da tesouraria não pode ser vazio")]
    codtz :number;
    codtz2 :number;
    contatesoura2 :string;
    contasstamp2 :string;
     trf :boolean;
     numer :boolean;
     tipo :boolean;
     obgTitulo :boolean;
    rclstamp :string;
    oristamp :string;
    factstamp :string;
    faccstamp :string;
    pgfstamp :string;
    perclstamp :string;
     status :boolean;
    distamp :string;
     cpoc :number;
     contaPgc :number;
    origem :string;
     mvalor :number;
     codmovtz :number;
    descmovtz :string;
     codmovtz2 :number;
    descmovtz2 :string;
    usrLogin :string;//RECEBE O STAMP DO UTILIZADOR
     aberturaCaixa :boolean;
    no :number;
    nome :string;
    numero :number;
    ccusto :string;

    contasstamp :string;
    ccustamp :string;
    moeda :string;
     cambiousd :number;


}
export interface rcll
{
    rcllstamp:string;
    rclstamp:string;
    ccstamp:string;
    data:string;
    nrdoc:string;
    descricao:string;
    valorpreg:number;
    valordoc:number;
    mValordoc:number;
    valorreg:number;
    valorPend:number;
    mvalorPend:number;
    anulado:boolean;
    numinterno:string
    cambiousd:number;
    origem:string;
    mvalorpreg:number;
    mvalorreg:number;
    descontofin:number;//Desconto Financeiro
    mDescontofin:number;//Moeda Desconto financeiro
    perdescfin:number;//Percentagem de desconto financeiro
    rcladiant:boolean;//Recibo de adiantamento
}
