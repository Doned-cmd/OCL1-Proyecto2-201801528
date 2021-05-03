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
        controlador.ListaTablaSimbolos.push(ts_local);
        let valor_condicion = this.condicion.getValor(controlador, ts);

        if(this.condicion.getTipo(controlador, ts) == tipo.BOOLEANO){
            if(valor_condicion){
                for(let ins of this.lista_ifs){
                    let res = ins.ejecutar(controlador, ts_local);
                    //TODO verificar si res es de tipo CONTINUE, BREAK, RETORNO 
                    if(ins instanceof Detener || res instanceof Detener  ){
                        return res;
                    }else if (ins instanceof Retornar || res instanceof Retornar){
                        return res
                    }else if (ins instanceof Continuar || res instanceof Continuar){
                       return res;
                    }  
                }
            }else{
                for(let ins of this.lista_elses){
                    let res = ins.ejecutar(controlador,ts_local);
                    //TODO verificar si res es de tipo CONTINUE, RETORNO 
                    if(ins instanceof Detener || res instanceof Detener  ){
                        return res;
                    }else if (ins instanceof Retornar || res instanceof Retornar){
                        return res
                    }else if (ins instanceof Continuar || res instanceof Continuar){
                        return res;
                    }  
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
        let padre = new Nodo("if","")
        padre.AddHijo(new Nodo("if",""))
        padre.AddHijo(new Nodo("(",""))
        let condicionif =  new Nodo("condicion","")
        condicionif.AddHijo(this.condicion.recorrer())
        padre.AddHijo(condicionif)
        padre.AddHijo(new Nodo(")",""))


        padre.AddHijo(new Nodo("{",""))
        let HijoInstrucciones = new Nodo("Instrucciones","")

        for(let ins of this.lista_ifs){
            HijoInstrucciones.AddHijo(ins.recorrer())                
        }

        padre.AddHijo(HijoInstrucciones)
        padre.AddHijo(new Nodo("}",""))


        //Recorriendo lista de ifs o elses si hay
        for (let ins of this.lista_elses){
            if(ins instanceof Ifs){
                if(ins.condicion != null){
                    padre.AddHijo(new Nodo("else if",""))
                    padre.AddHijo(new Nodo("(",""))
                    let condicionElseIf = new Nodo("condicion","")
                    condicionElseIf.AddHijo(ins.condicion.recorrer())            
                    padre.AddHijo(condicionElseIf)
                    padre.AddHijo(new Nodo(")",""))
                    padre.AddHijo(new Nodo("{",""))
                    
                    padre.AddHijo(this.DevolverInstrucciones(ins.lista_ifs))
                    
                    padre.AddHijo(new Nodo("}",""))

                    for (let insElse of ins.lista_elses){
                        if(insElse instanceof Ifs){
                            padre = insElse.RecorrerElseIf(padre)
                        }
                    }
                    
                }else{

                    padre.AddHijo(new Nodo("else",""))
                    padre.AddHijo(new Nodo("(",""))
                    padre.AddHijo(new Nodo(")",""))
                    padre.AddHijo(new Nodo("{",""))
                    
                    padre.AddHijo(this.DevolverInstrucciones(ins.lista_ifs))
                    
                    padre.AddHijo(new Nodo("}",""))
                    


                }   
            }
        }


        return padre
    }

    RecorrerElseIf( padre : Nodo):Nodo{
        
        for (let ins of this.lista_elses){
            if(ins instanceof Ifs){
                if(ins.condicion != null){
                    padre.AddHijo(new Nodo("else if",""))
                    padre.AddHijo(new Nodo("(",""))
                    let condicionElseIf = new Nodo("condicion","")
                    condicionElseIf.AddHijo(ins.condicion.recorrer())            
                    padre.AddHijo(condicionElseIf)
                    padre.AddHijo(new Nodo(")",""))
                    padre.AddHijo(new Nodo("{",""))
                    
                    padre.AddHijo(this.DevolverInstrucciones(ins.lista_ifs))
                    
                    padre.AddHijo(new Nodo("}",""))

                    for (let insElse of ins.lista_elses){
                        if(insElse instanceof Ifs){
                            padre = insElse.RecorrerElseIf(padre)
                        }
                    }
                }else{

                    padre.AddHijo(new Nodo("else",""))
                    padre.AddHijo(new Nodo("(",""))
                    padre.AddHijo(new Nodo(")",""))
                    padre.AddHijo(new Nodo("{",""))
                    
                    padre.AddHijo(this.DevolverInstrucciones(ins.lista_ifs))
                    
                    padre.AddHijo(new Nodo("}",""))


                }   
            }
        }

        return padre
    }



    DevolverInstrucciones(lista_instrucciones : Array<Instruccion>): Nodo{
        let Instruct = new Nodo("Instrucciones","")
        for(let ins of lista_instrucciones){
            Instruct.AddHijo(ins.recorrer())
        }
        return Instruct
    }


}