import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/Clases/TablaSimbolos/Tipo";
import Detener from "../SentenciaTransferencia/Break";


export default class Default_SW implements Instruccion{

    
    public lista_instrucciones : Array<Instruccion>;     
    public linea : number;
    public columna : number;

    constructor( lista_instrucciones, linea, columna) {
       
        this.lista_instrucciones = lista_instrucciones;
        this.columna = columna;
        this.linea = linea;
    }
    getTipo(controlador: Controlador, ts: TablaSimbolos) {
        return "Default_SW"
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let ts_local = new TablaSimbolos(ts);

        for(let ins of this.lista_instrucciones){
            let res = ins.ejecutar(controlador,ts_local);

            if(ins instanceof Detener || res instanceof Detener  ){
                return res;
            }

        }
        return null;
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }


}