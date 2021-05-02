import { Expression } from "@angular/compiler";
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import Identificador from "src/Clases/Expresiones/Identificador";
import Primitivo from "src/Clases/Expresiones/Primitivo";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";


export default class Retornar implements Instruccion{

    public valor : Expresion
    public linea : number;
    public columna : number;

    constructor(valor, linea, columna) {
        this.valor = valor
        this.linea = linea
        this.columna = columna
    }
    getTipo(controlador: Controlador, ts: TablaSimbolos): any {
        return this.valor.getTipo(controlador,ts);
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let devolver = this.valor.getValor(controlador,ts)
        console.log("El return devuelve")
        console.log(devolver)
        //return this.valor.getValor(controlador,ts);
        //if (this.valor instanceof Identificador){
            this.valor =  new Primitivo(devolver,this.valor.getTipo(controlador,ts),this.linea,this.columna)
        //}
        return this;       
    }

    recorrer(): Nodo {
        let padre = new Nodo("Return","");
        padre.AddHijo(new Nodo("return",""))
        let hijoexp = new Nodo("expresion","")
        hijoexp.AddHijo(this.valor.recorrer())
        padre.AddHijo(hijoexp);        
        return padre;
    }

}