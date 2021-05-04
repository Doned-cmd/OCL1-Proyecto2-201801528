import Errores from "src/Clases/Ast/Errores";
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/Clases/TablaSimbolos/Tipo";
import Detener from "../SentenciaTransferencia/Break";
import Continuar from "../SentenciaTransferencia/Continue";
import Retornar from "../SentenciaTransferencia/Return";

import Case_SW from "./Case_SW";
import Default_SW from "./Default_SW";


export default class Switch implements Instruccion{

    public condicionPrincipal : Expresion;
    public lista_casos : Array<Instruccion>;     
    public linea : number;
    public columna : number;    

    constructor(condicionPrincipal, lista_casos, linea, columna) {
        this.condicionPrincipal = condicionPrincipal;
        this.lista_casos = lista_casos;        
        this.columna = columna;
        this.linea = linea;
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos) {
        return "switch"
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let ts_local = new TablaSimbolos(ts);
        controlador.agregarTabla(ts_local, "sentencia SWITCH");
        let valor_condicionPrincipal = this.condicionPrincipal.getValor(controlador, ts);
        let tipo_condicionPrincipal = this.condicionPrincipal.getTipo(controlador, ts);
        let EjecutarDefault : boolean = true;
        let contadorDefaults : number = 0;
        for (let insact of this.lista_casos){
            if (insact instanceof Case_SW){}
            else if (insact instanceof Default_SW){
                contadorDefaults++;
            }
            else{
                let error = new Errores('Semantico', `Error en el switch`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Error en el switch`+ "Linea: " +this.linea );
                return null;
            }            
        }

        //comprobar numero de defaults
        if (contadorDefaults > 1){
                let error = new Errores('Sintactico', `Error se esperaba solo un default en el switch. `, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Error se esperaba solo un default en el switch. `+ "Linea: " +this.linea );
                return null;
        }


        for (let insact of this.lista_casos){
                        
            if (insact instanceof Case_SW){
                if (insact.getTipo(controlador,ts) === tipo_condicionPrincipal){
                    console.log("Comparando valores del switch");
                    
                    if (insact.getValor(controlador,ts_local) === valor_condicionPrincipal ){
                        console.log(valor_condicionPrincipal, insact.getTipo(controlador,ts_local));
                        let ejecucion = insact.ejecutar(controlador,ts_local)
                        if(ejecucion instanceof Detener || insact instanceof Detener){
                            return ejecucion;
                        }else if (ejecucion instanceof Retornar || insact instanceof Retornar){
                            return ejecucion
                        }else if (ejecucion instanceof Continuar || insact instanceof Continuar){
                            return ejecucion;
                        }  
                        EjecutarDefault = false
                    }
                }else{
                    let error = new Errores('Semantico', `Error en el switch, el tipo de la condicion del case y switch son distintos`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`Error en el switch, el tipo de la condicion del case y switch son distintos`+ "Linea: " +this.linea );
                    return null;
                }                   
            }else if (insact instanceof Default_SW){                            
                if (EjecutarDefault){
                    let ejecucion = insact.ejecutar(controlador,ts_local)
                    if(ejecucion instanceof Detener || insact instanceof Detener){
                        return ejecucion;
                    }else if (ejecucion instanceof Retornar || insact instanceof Retornar){
                        return ejecucion
                    }else if (ejecucion instanceof Continuar || insact instanceof Continuar){
                        return ejecucion;
                    }  
                    
                    
                }
            }else{
                let error = new Errores('Semantico', `Error en el switch`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Error en el switch`+ "Linea: " +this.linea );
                return null;
            }
            
            
        }
        
        
        return null;
    }

    recorrer(): Nodo {
        let Padre = new Nodo("Switch","")
        Padre.AddHijo(new Nodo("Switch",""))
        Padre.AddHijo(new Nodo("(",""))
        let hijoCondicion = new Nodo("expresion","")
        hijoCondicion.AddHijo(this.condicionPrincipal.recorrer())    
        Padre.AddHijo(hijoCondicion)
        Padre.AddHijo(new Nodo(")",""))
        Padre.AddHijo(new Nodo("{",""))
        let HijoCasos = new Nodo("casos","")
        for ( let cases of this.lista_casos){
            HijoCasos.AddHijo(cases.recorrer())
        }
        Padre.AddHijo(HijoCasos)
        Padre.AddHijo(new Nodo("}",""))
        return Padre
    }


}