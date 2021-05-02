import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";


export default class Detener implements Instruccion{

    public linea : number;
    public columna : number;
    constructor(linea, columna) {
        this.linea = linea
        this.columna = columna
     }
    getTipo(controlador: Controlador, ts: TablaSimbolos): string {
        return "Break"
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        return this;
    }
    recorrer(): Nodo {
        let padre = new Nodo("break","");
        return padre;        
    }

}