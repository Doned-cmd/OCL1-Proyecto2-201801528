import { Expression } from "@angular/compiler";
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";


export default class Return implements Instruccion{

    valor : Expresion
    constructor(valor) {
        this.valor = valor
    }
    getTipo(controlador: Controlador, ts: TablaSimbolos): string {
        throw new Error("Method not implemented.");
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let devolver = this.valor.getValor(controlador,ts)
        console.log("El return devuelve")
        console.log(devolver)
        return this.valor.getValor(controlador,ts);
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}