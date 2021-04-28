import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import Primitivo from "../Expresiones/Primitivo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class Asignacion implements Instruccion{

    public identificador : string;
    public valor : Expresion;
    public linea : number;
    public columna : number;

    constructor(identificador, valor, linea, columna) {
        this.identificador = identificador;
        this.valor = valor;
        this.linea =linea;
        this.columna = columna;
    }
    getTipo(controlador: Controlador, ts: TablaSimbolos): string {
        return "Asignacion"
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        //verificamos si existe en la tabla de simbolos 

        if(ts.existe(this.identificador)){
            let valor = this.valor.getValor(controlador,ts );
            let tipo_valor = this.valor.getTipo(controlador,ts)
            //TODO: Validar si son del mismo tipo
           // if(valor instanceof Primitivo){
                if((tipo_valor == ts.getSimbolo(this.identificador).tipo.type) || (ts.getSimbolo(this.identificador).tipo.type == tipo.ENTERO && tipo_valor == tipo.DOBLE) /**|| (tipo_valor == tipo.CARACTER && ts.getSimbolo(this.identificador).tipo.type == tipo.CADENA)**/){
                    ts.getSimbolo(this.identificador).setValor(valor);
                }else{
                    console.log("error al re-asignar, los tipos del valor y la variable no coinciden.")
                }                                   
        }else{
            //TODO: reportar error no existe variable.
        }
        return null
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}