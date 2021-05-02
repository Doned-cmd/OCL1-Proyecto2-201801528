import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";


export default class Continuar implements Instruccion{

    public linea : number;
    public columna : number;
    constructor(linea, columna) { 
        this.linea = linea
        this.columna = columna
    }
    getTipo(controlador: Controlador, ts: TablaSimbolos): string {
        return "Continue";
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        return this;
    }
    recorrer(): Nodo {
        let padre = new Nodo("Continue","");
        return padre; 
    }

}