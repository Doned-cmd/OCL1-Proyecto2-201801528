import Errores from "../Ast/Errores";
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

        if(ts.existe(this.identificador.toLowerCase())){
            let valor = this.valor.getValor(controlador,ts );
            let tipo_valor = this.valor.getTipo(controlador,ts)
            //TODO: Validar si son del mismo tipo
           // if(valor instanceof Primitivo){
                if((tipo_valor == ts.getSimbolo(this.identificador.toLowerCase()).tipo.type) || (ts.getSimbolo(this.identificador.toLowerCase()).tipo.type == tipo.ENTERO && tipo_valor == tipo.DOBLE) /**|| (tipo_valor == tipo.CARACTER && ts.getSimbolo(this.identificador).tipo.type == tipo.CADENA)**/){
                    ts.getSimbolo(this.identificador.toLowerCase()).setValor(valor);
                }else{
                    let error = new Errores('Semantico', `error al re-asignar, los tipos del valor ${this.identificador} y la variable no coinciden.`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`error al re-asignar, los tipos del valor ${this.identificador} y la variable no coinciden.`+ "Linea: " +this.linea );
                    return null;
                    console.log("error al re-asignar, los tipos del valor y la variable no coinciden.")
                }                                   
        }else{
            let error = new Errores('Semantico', `Error No existe la variable ${this.identificador} en la tabla de simbolos.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error No existe la variable ${this.identificador} en la tabla de simbolos.`+ "Linea: " +this.linea );
            return null;            
        }
        return null
    }
    recorrer(): Nodo {
        let Padre = new Nodo("Asignacion","")        
        Padre.AddHijo(new Nodo(this.identificador,""))
        Padre.AddHijo(new Nodo("=",""))
        let igualacion =  new Nodo("expresion","")
        igualacion.AddHijo(this.valor.recorrer())        
        Padre.AddHijo(igualacion)
        return Padre
    }

}