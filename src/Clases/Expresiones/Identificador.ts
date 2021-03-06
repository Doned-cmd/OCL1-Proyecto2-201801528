import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class Identificador implements Expresion{

    public identificador : string;
    public linea : number;
    public columna : number;

    constructor(identifador, linea, columna) {
        this.identificador = identifador;
        this.linea = linea;
        this.columna = columna;
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        let existe_id = ts.getSimbolo(this.identificador.toLowerCase());

        if(existe_id != null ){
            return existe_id.tipo.type; // ENTERO, DECIMAL, BOO
        }else{
            let error = new Errores('Semantico', `No existe la variable ${this.identificador} en la tabla de simbolos.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`No existe la variable ${this.identificador} en la tabla de simbolos.`+ "Linea: " +this.linea );
            return null;
        }
    }

    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let existe_id = ts.getSimbolo(this.identificador.toLowerCase());

        if(existe_id != null){
            return existe_id.valor; 
        }else{
            let error = new Errores('Semantico', `No existe la variable ${this.identificador} en la tabla de simbolos.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`No existe la variable ${this.identificador} en la tabla de simbolos.`+ "Linea: " +this.linea );
            return null;
        }
    }

    recorrer(): Nodo {
        let padre = new Nodo("Identificador","");
        padre.AddHijo(new Nodo(this.identificador.toString(),""));

       return padre;
    }
    
}