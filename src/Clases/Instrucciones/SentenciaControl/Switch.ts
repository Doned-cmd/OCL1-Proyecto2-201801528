import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/Clases/TablaSimbolos/Tipo";
import Detener from "../SentenciaTransferencia/Break";
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

        let valor_condicionPrincipal = this.condicionPrincipal.getValor(controlador, ts);
        
        let EjecutarDefault : boolean = true;
        

        for (let insact of this.lista_casos){            
            if (insact instanceof Case_SW){
                
                console.log("Comparando valores del switch");
                
                if (insact.getTipo(controlador,ts_local) === valor_condicionPrincipal ){
                    console.log(valor_condicionPrincipal, insact.getTipo(controlador,ts_local));
                    let ejecucion = insact.ejecutar(controlador,ts_local)
                    if(ejecucion instanceof Detener){
                        return ejecucion;
                    }
                    EjecutarDefault = false
                }
            }else if (insact instanceof Default_SW){                            
                if (EjecutarDefault){
                    let ejecucion = insact.ejecutar(controlador,ts_local)
                    if(ejecucion instanceof Detener){
                        return ejecucion;
                    }
                    
                    
                }
            }else{
                    
                console.log("error")
            }
            
            
        }
        
        
        return null;
    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }


}