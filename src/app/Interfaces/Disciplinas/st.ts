import { stPrecos } from "./stPrecos";
import { stb } from "./stb";
import { stl } from "./stl";

export interface st{
       ststamp:string;
        referenc:string;       
        obs:string;
        refornec:string;
        tipo:string;//Bar; Cozinha; Restaurant,Extras 
        codigoBarras:string;
        status:string;
        unidade:string;
        descricao:string;
        servico:boolean;
       tabiva:number;      
       txiva:number;       
       valor:number;
        ivainc:boolean;
        codfam:string;
        familia:string;
        codsubfam:string;
        subfamilia:string;
        codarm:string;
        armazem:string;
       codmarca:number;
        marca:string;
        matricula:string;
        modelo:string;
        motor:string;
        chassis:string;
       anofab:number;      
       tara:number;//Usado como Nivel Académico NO MÓDULO ACADEMIA//1=Licenciatura//2=Mestrado
       pesobruto:number;
        combustivel:boolean;
        tipoCombustivel:string;
       codfab:number;
        fabricante:string;
        negativo:boolean;
        viatura:boolean;
        avisanegativo:boolean;
        descontinuado:boolean;
        ligaprojecto:boolean;
        composto:boolean;       
       stock:number;
       ultimopreco:number;
       precoponderado:number;
       imagem:any;
       codigobarra:any;
       codigoQr:any;
       codtrailer:number;
        trailer:boolean;
       //Novos campos
        usaconvunid:boolean;//Usa conversão de unidades 
       quantidade:number;//Quantidade de conversao 
        unidsaida:string;//Unidade de saida
        usadoprod:boolean;//Usado na Producao
        dimensao:boolean;//Artigo com dimencoes 
        devolc:boolean;//Sujeito a Devolucao  
        usaserie:boolean;//Usa Series        
       stockmin:number;       
       stockmax:number;       
       reserva:number;       
       encomenda:number;
        nmovstk:boolean;
        pos:boolean;
        motorista:string;
        departanto:string;
        ccusto:string;       
       cilindrada:number; 
        companhia:string;  
        contrato:string;  
       inicio:Date;  
       termino:Date;        
       valorLeasing:number;       
       mensalidade:number;
       //Fim de Leasing 
        bloqueado:boolean;
       assentos:number; 
       portas:number; 
       data:Date; 
        trailref:string; 
        traildesc:string; 
       anomodelo:number; 
       eixos:number; 
       pneus:number; 
       
       carga:number; 
      
       
       vendido:number; 
       
       comprado:number;
        obterpeso:boolean; 
       peso:number; 
       volume:number;
        usalote:boolean; 
        ivametade:boolean; //IVA Metade 
       //Contabilidade 
        cpoc:string; //Codigo de Integracao para vendas e Compras 
        contaInv:string; //Conta de Inventario 
        contaCev:string; //CEV -Conta de Existencias Vendidas  
        contaReo:string; //Conta de REO 
        contaCoi:string; //Conta de COI 
        nofrota:string;
        cor:string;
        gasoleo:boolean; 
        naovisisvel:boolean; //Permite que o produto nao seja visivel na facturacao
       //Imobilizado.........
        activo:boolean;
       tipoartigo:number;//se é:1-Produto,2-Servico, 3-Viatura, 4-Activo
       
       quantvenda:number;
       //Fim de imobilizado 
       usaquant2:boolean;//Utiliza quantidade 2 nas vendas casos de bedidas a pressao 
      
      
        disciplina:boolean;
        sigla:string;
       
       credac:number;//Credito Academico
       
       cargahtotal:number;//Somatorio de teorica e pratica 
       
       cargahteorica:number;//Carga Horaria Teorica 
       
       cargahpratica:number;//Carga Horaria Pratica 
        prec:boolean;//Indica se a disciplina tem precedencia 
      stl:stl[];//Disciplinas de precedencia 
      stb:stb[];//Bibliografia recomendada 
       
       stPrecos:stPrecos[];
        multa:boolean;
        bilhete:boolean;
        bilheteespecial:boolean;
      
       tipoProduto:number;
}