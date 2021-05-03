import Errores from "src/Clases/Ast/Errores";
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import Detener from "../SentenciaTransferencia/Break";
import Continuar from "../SentenciaTransferencia/Continue";
import Retornar from "../SentenciaTransferencia/Return";


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
            siguiente:  
            while(this.condicion.getValor(controlador,ts)){
                
                let ts_local = new TablaSimbolos(ts);
                controlador.agregarTabla(ts_local);
                for(let ins of this.lista_instrucciones){
                    let res = ins.ejecutar(controlador,ts_local);
                     //TODO verificar si res es de tipo CONTINUE, BREAK, RETORNO 
                     //console.log(ins.getTipo(controlador,ts_local));

                     if(ins instanceof Detener || res instanceof Detener ){
                        console.log("un break en el while " + "linea: " + this.linea)
                        return null;
                    }
                     if (ins instanceof Retornar || res instanceof Retornar){
                        console.log("un return en el while " + "linea: " + this.linea)
                        console.log(res)
                        return res
                    }
                     if (ins instanceof Continuar || res instanceof Continuar){
                        //console.log("un continue en el while " + "linea: " + this.linea)
                        continue siguiente;  
                    }

                }
                continue siguiente;                
            }
        }else{
            let error = new Errores('Semantico', `Error en la conidicon del while. `, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error en la condicion del while. `+ "Linea: " +this.linea );
            return null;
        }
        //return null
    }
    
    recorrer(): Nodo {
        let padre = new Nodo("While","");
        padre.AddHijo(new Nodo("while",""))
        padre.AddHijo(new Nodo("(",""))
        let hijoCondicion = new Nodo("Condicion","")
        hijoCondicion.AddHijo(this.condicion.recorrer())
        padre.AddHijo(hijoCondicion)
        padre.AddHijo(new Nodo(")",""))
        padre.AddHijo(new Nodo("{",""))
        let HijoInstruccion = new Nodo("instrucciones","")
        for(let ins of this.lista_instrucciones){
            HijoInstruccion.AddHijo(ins.recorrer())
        }        
        padre.AddHijo(HijoInstruccion)
        padre.AddHijo(new Nodo("}",""))
        return padre
    }

}