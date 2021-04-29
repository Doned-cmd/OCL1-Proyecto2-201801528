import Errores from "src/Clases/Ast/Errores";
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/Clases/TablaSimbolos/Tipo";
import Detener from "../SentenciaTransferencia/Break";
import Return from "../SentenciaTransferencia/Return";


export default class Ifs implements Instruccion{

     public condicion : Expresion;
     public lista_ifs : Array<Instruccion>;
     public lista_elses : Array<Instruccion>;
     public linea : number;
     public columna : number;

     constructor(condicion, lista_ifs, lista_elses, linea, columna) {
         this.condicion = condicion;
         this.lista_ifs = lista_ifs;
         this.lista_elses = lista_elses;
         this.columna = columna;
         this.linea = linea;
     }
    getTipo(controlador: Controlador, ts: TablaSimbolos) {
        return "If"
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let ts_local = new TablaSimbolos(ts);

        let valor_condicion = this.condicion.getValor(controlador, ts);

        if(this.condicion.getTipo(controlador, ts) == tipo.BOOLEANO){
            if(valor_condicion){
                for(let ins of this.lista_ifs){
                    let res = ins.ejecutar(controlador, ts_local);
                    //TODO verificar si res es de tipo CONTINUE, BREAK, RETORNO 
                    if(ins instanceof Detener || res instanceof Detener  ){
                        return res;
                    }else if (ins instanceof Return || res instanceof Return){
                        return res
                    }//else if (ins instanceof Continuar || res instanceof Continuar){
                    //    return null;
                    //}  
                }
            }else{
                for(let ins of this.lista_elses){
                    let res = ins.ejecutar(controlador,ts_local);
                    //TODO verificar si res es de tipo CONTINUE, RETORNO 
                    if(ins instanceof Detener || res instanceof Detener  ){
                        return res;
                    }else if (ins instanceof Return || res instanceof Return){
                        return res
                    }//else if (ins instanceof Continuar || res instanceof Continuar){
                    //    return null;
                    //}  
                }
            }
        }else{
            let error = new Errores('Semantico', `Error en la conidicon del if.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error en la condicion del if. `+ "Linea: " +this.linea );
            return null;
        }
        return null;
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }


}