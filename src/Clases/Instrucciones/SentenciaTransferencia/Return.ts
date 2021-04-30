import { Expression } from "@angular/compiler";
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";


export default class Retornar implements Instruccion{

    valor : Expresion
    constructor(valor) {
        this.valor = valor
    }
    getTipo(controlador: Controlador, ts: TablaSimbolos): any {
        return this.valor.getTipo(controlador,ts);
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let devolver = this.valor.getValor(controlador,ts)
        console.log("El return devuelve")
        console.log(devolver)
        //return this.valor.getValor(controlador,ts);
        return this;
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}