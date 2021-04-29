import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class Ternario implements Expresion{

    public condicion : Expresion;
    public verdadero : Expresion;
    public falso : Expresion;
    public linea : number;
    public columna : number;

    constructor(condicion, verdadero, falso, linea, columna) {
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
        this.linea = linea;
        this.columna = columna;
    }


    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        let valor_condicion = this.condicion.getValor(controlador,ts);

        if(typeof valor_condicion == 'boolean'){
            return valor_condicion ? this.verdadero.getTipo(controlador,ts) : this.falso.getTipo(controlador,ts); 
        }else{
            let error = new Errores('Semantico', `Error al obtener el tipo en la operacion ternaria el valor de condicion no es buleano `, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error al obtener el tipo en la operacion ternaria el valor de condicion no es buleano `+ "Linea: " +this.linea );
            return null;
        }
    }

    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let valor_condicion = this.condicion.getValor(controlador,ts);

        if(typeof valor_condicion == 'boolean'){
            return valor_condicion ? this.verdadero.getValor(controlador,ts) : this.falso.getValor(controlador,ts); 
        }else{
            let error = new Errores('Semantico', `Error al obtener el valor en la operacion ternaria el valor de condicion no es buleano `, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error al obtener el valor en la operacion ternaria el valor de condicion no es buleano `+ "Linea: " +this.linea );
            return null;
        }
    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}