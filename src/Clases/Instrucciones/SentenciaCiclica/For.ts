//import { Console } from "node:console";
//import { Console } from "node:console"
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import Detener from "../SentenciaTransferencia/Break";


export default class Asignacion implements Instruccion{
    
    public declaracion: Instruccion;
    public condicion: Expresion;
    public iteracion: Instruccion;
    public lista_instrucciones : Array<Instruccion>;
    public linea : number;
    public columna : number;
    public EsAsignacion: boolean;

    constructor(declaracion ,condicion, iteracion, lista_instrucciones, EsAsignacion, linea, columna) {        
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.iteracion = iteracion;
        this.EsAsignacion = EsAsignacion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(controlador: Controlador, ts: TablaSimbolos): string {
        return "For"
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        console.log(this.EsAsignacion)
        if(!this.EsAsignacion){           

            let ts_local = new TablaSimbolos(ts);
            this.declaracion.ejecutar(controlador, ts_local)
            //let valor_condicion = this.condicion.getValor(controlador,ts)
            if (typeof this.condicion.getValor(controlador,ts_local) === 'boolean') {    
                
                while(this.condicion.getValor(controlador,ts_local)){
                    let ts_local_ciclo = new TablaSimbolos(ts_local);
                    
                    if( this.iteracion.getTipo(controlador,ts_local) == "Asignacion"){
                        //console.log(this.declaracion.getTipo(controlador,ts_local))
                        this.iteracion.ejecutar(controlador,ts_local)
                    }
                    for(let ins of this.lista_instrucciones){
                        let res = ins.ejecutar(controlador,ts_local_ciclo);

                        //this.ejecutar(controlador,ts)
                        if(ins instanceof Detener || res instanceof Detener ){
                            return res;
                        }                   
                    }
                    if( this.iteracion.getTipo(controlador,ts_local) == "AsignacionTardia"){
                        this.iteracion.ejecutar(controlador,ts_local)
                    }
                }
            }
        }else{        
            this.declaracion.ejecutar(controlador, ts)
            //let valor_condicion = this.condicion.getValor(controlador,ts)
            if (typeof this.condicion.getValor(controlador,ts) === 'boolean') {    
                
                while(this.condicion.getValor(controlador,ts)){
                    let ts_local_ciclo = new TablaSimbolos(ts);
                    
                    if( this.iteracion.getTipo(controlador,ts) == "Asignacion"){
                        //console.log(this.declaracion.getTipo(controlador,ts_local))
                        this.iteracion.ejecutar(controlador,ts)
                    }
                    for(let ins of this.lista_instrucciones){
                        let res = ins.ejecutar(controlador,ts_local_ciclo);

                        //this.ejecutar(controlador,ts)
                        if(ins instanceof Detener || res instanceof Detener ){
                            return res;
                        }                   
                    }
                    if( this.iteracion.getTipo(controlador,ts) == "AsignacionTardia"){
                        this.iteracion.ejecutar(controlador,ts)
                    }
                }
            }
        }
        return null
    }
    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
    
}