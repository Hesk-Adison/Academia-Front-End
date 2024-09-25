
import { Injectable } from "@angular/core";
import { dmzviewgrelha } from "../Interfaces/Grade/dmzviewgrelha";
@Injectable({
    providedIn: 'root'
})

export class ResultPedata{
    guardarSessaope(peDadosss: dmzviewgrelha) {
        localStorage.setItem("pessao", JSON.stringify(peDadosss))
      }
    
      obterSessao() {
    
        const dataGuardar = localStorage.getItem("pessao");
    
        const utilizador = JSON.parse(dataGuardar!);
        return utilizador;
      }
    
      eliminarSessao() {
        localStorage.removeItem("pessao");
      }
    
      isAutenticated() {
        return (localStorage.getItem("pessao")) !== null ? true : false;
      }
}