import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
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
        return "AsignacionTardia"
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        //verificamos si existe en la tabla de simbolos 

        if(ts.existe(this.identificador)){
            let ValorIniciar = ts.getSimbolo(this.identificador)
            let valor = this.valor.getValor(controlador,ts );
            let tipo_valor = this.valor.getTipo(controlador,ts)
            //TODO: Validar si son del mismo tipo
            console.log(tipo_valor, ts.getSimbolo(this.identificador).tipo.type);
            if(  (ts.getSimbolo(this.identificador).tipo.type == tipo.DOBLE && tipo_valor == tipo.ENTERO) || (ts.getSimbolo(this.identificador).tipo.type == tipo.ENTERO && tipo_valor == tipo.DOBLE)|| (ts.getSimbolo(this.identificador).tipo.type == tipo.ENTERO && tipo_valor == tipo.ENTERO) || (ts.getSimbolo(this.identificador).tipo.type == tipo.DOBLE && tipo_valor == tipo.DOBLE)/**|| (tipo_valor == tipo.CARACTER && ts.getSimbolo(this.identificador).tipo.type == tipo.CADENA)**/){
                let devolver = ValorIniciar.valor
                ts.getSimbolo(this.identificador).setValor(valor + ValorIniciar.valor);
                console.log("sumado exitosamente 1 con ++" + devolver)
                return devolver
                
            }else{
                console.log("error al sumar 1 con ++, el tipo de la variable no es correcto")


            }
            
        }else{
            console.log("error al sumar 1 con ++, No existe el identificador")
            //TODO: reportar error no existe variable.
        }
        return null
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}