import Errores from "src/Clases/Ast/Errores";
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import Detener from "../SentenciaTransferencia/Break";
import Continuar from "../SentenciaTransferencia/Continuar";
import Return from "../SentenciaTransferencia/Return";

export default class While implements Instruccion{

    public condicion: Expresion;
    public lista_instrucciones : Array<Instruccion>;
    public linea : number;
    public columna : number;

    constructor(condicion, lista_instrucciones, linea, columna) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(controlador: Controlador, ts: TablaSimbolos): string {
        return "While"
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let valor_condicion = this.condicion.getValor(controlador, ts);

        if(typeof valor_condicion == 'boolean'){

            while(this.condicion.getValor(controlador,ts)){

                let ts_local = new TablaSimbolos(ts);

                for(let ins of this.lista_instrucciones){
                    let res = ins.ejecutar(controlador,ts_local);
                     //TODO verificar si res es de tipo CONTINUE, BREAK, RETORNO 
                     if(ins instanceof Detener || res instanceof Detener ){
                        return res;
                    }else if (ins instanceof Return || res instanceof Return){
                        return res
                    }//else if (ins instanceof Continuar || res instanceof Continuar){
                    //    return null;
                     
                    //}

                }
            }
        }else{
            let error = new Errores('Semantico', `Error en la conidicon del while. `, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error en la condicion del while. `+ "Linea: " +this.linea );
            return null;
        }
        return null
    }
    
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}