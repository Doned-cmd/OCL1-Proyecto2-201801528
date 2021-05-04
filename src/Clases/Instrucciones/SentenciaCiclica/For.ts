//import { Console } from "node:console";
//import { Console } from "node:console"
import Errores from "src/Clases/Ast/Errores";
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { TablaSimbolosGraf } from "src/Clases/TablaSimbolos/TablaSimbolosGraf";
import Detener from "../SentenciaTransferencia/Break";
import Continuar from "../SentenciaTransferencia/Continue";
import Return from "../SentenciaTransferencia/Return";


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
                
                // poner la iteracion aqui si es que esta mal el codigo, copiarla

                seguir:
                while(this.condicion.getValor(controlador,ts_local)){
                    let ts_local_ciclo = new TablaSimbolos(ts_local);
                    
                    controlador.ListaTablaSimbolos.push(new TablaSimbolosGraf(ts_local_ciclo, "CICLO FOR"));
                    for(let ins of this.lista_instrucciones){
                        let res = ins.ejecutar(controlador,ts_local_ciclo);

                        //this.ejecutar(controlador,ts)
                        if(ins instanceof Detener || res instanceof Detener ){
                            return null;
                        }else if (ins instanceof Return || res instanceof Return){
                            return res
                        }else if (ins instanceof Continuar || res instanceof Continuar){
                            
                            if( this.iteracion.getTipo(controlador,ts_local) == "Asignacion"){
                                //console.log(this.declaracion.getTipo(controlador,ts_local))
                                this.iteracion.ejecutar(controlador,ts_local)
                            }
        
                            if( this.iteracion.getTipo(controlador,ts_local) == "AsignacionTardia"){
                                this.iteracion.ejecutar(controlador,ts_local)
                            }
                            continue seguir;
                        }                 
                    }

                    if( this.iteracion.getTipo(controlador,ts_local) == "Asignacion"){
                        //console.log(this.declaracion.getTipo(controlador,ts_local))
                        this.iteracion.ejecutar(controlador,ts_local)
                    }

                    if( this.iteracion.getTipo(controlador,ts_local) == "AsignacionTardia"){
                        this.iteracion.ejecutar(controlador,ts_local)
                    }

                    if( !(this.iteracion.getTipo(controlador,ts_local) == "AsignacionTardia" )&&!(this.iteracion.getTipo(controlador,ts_local) == "Asignacion" )){
                        let error = new Errores('Semantico', `Error en la iteracion del for. `, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Error en la iteracion del for. `+ "Linea: " +this.linea );
                        return null;
                    }

                    continue seguir;
                }
            }else{
                let error = new Errores('Semantico', `Error en la conidicon del for`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Error en la condicion del for`+ "Linea: " +this.linea );
                return null;
            }
        }else{        
            this.declaracion.ejecutar(controlador, ts)
            //let valor_condicion = this.condicion.getValor(controlador,ts)
            if (typeof this.condicion.getValor(controlador,ts) === 'boolean') {    
                
                // copiar la iteracion de asignacion aqui 
                seguir2:
                while(this.condicion.getValor(controlador,ts)){
                    let ts_local_ciclo = new TablaSimbolos(ts);
                    
                    controlador.ListaTablaSimbolos.push(new TablaSimbolosGraf(ts_local_ciclo, "CICLO FOR"));
                    for(let ins of this.lista_instrucciones){
                        let res = ins.ejecutar(controlador,ts_local_ciclo);

                        //this.ejecutar(controlador,ts)
                        if(ins instanceof Detener || res instanceof Detener ){
                            return null;
                        }else if (ins instanceof Return || res instanceof Return){
                            return res
                        }else if (ins instanceof Continuar || res instanceof Continuar){
                            if( this.iteracion.getTipo(controlador,ts) == "AsignacionTardia"){
                                this.iteracion.ejecutar(controlador,ts)
                            }
                            if( this.iteracion.getTipo(controlador,ts) == "Asignacion"){
                                //console.log(this.declaracion.getTipo(controlador,ts_local))
                                this.iteracion.ejecutar(controlador,ts)
                            }
                            continue seguir2;
                        }
                    }
                    if( this.iteracion.getTipo(controlador,ts) == "AsignacionTardia"){
                        this.iteracion.ejecutar(controlador,ts)
                    }
                    if( this.iteracion.getTipo(controlador,ts) == "Asignacion"){
                        //console.log(this.declaracion.getTipo(controlador,ts_local))
                        this.iteracion.ejecutar(controlador,ts)
                    }
                    if( !(this.iteracion.getTipo(controlador,ts) == "AsignacionTardia") && !(this.iteracion.getTipo(controlador,ts) == "Asignacion" )){
                        let error = new Errores('Semantico', `Error en la iteracion del for. `, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Error en la iteracion del for. `+ "Linea: " +this.linea );
                        return null;
                    }
                    continue seguir2;
                }
            }else{
                let error = new Errores('Semantico', `Error en la conidicon del for. `, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Error en la condicion del for. `+ "Linea: " +this.linea );
                return null;
            }
        }
        return null
    }
    recorrer(): Nodo {
        let padre = new Nodo("For","");
        padre.AddHijo(new Nodo("For",""))
        padre.AddHijo(new Nodo("(",""))
        let hijoInicio = new Nodo("Declaracion","")
        hijoInicio.AddHijo(this.declaracion.recorrer())
        let hijoCondicion = new Nodo("Condicion","")
        hijoCondicion.AddHijo(this.condicion.recorrer())
        let hijoIteracion = new Nodo("Iteracion","")
        hijoIteracion.AddHijo(this.iteracion.recorrer())
        padre.AddHijo(hijoInicio)
        padre.AddHijo(hijoCondicion)
        padre.AddHijo(hijoIteracion)
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