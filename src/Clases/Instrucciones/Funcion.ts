import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo from "../TablaSimbolos/Tipo";
import Detener from "./SentenciaTransferencia/Break";
import Continuar from "./SentenciaTransferencia/Continue";
import Return from "./SentenciaTransferencia/Return";
import { tipo } from "../TablaSimbolos/Tipo";
import { TablaSimbolosGraf } from "../TablaSimbolos/TablaSimbolosGraf";

export default class Funcion extends Simbolos implements Instruccion{

    public lista_instrucciones : Array<Instruccion>;
    public linea : number;
    public columna : number;
    
    constructor(simbolo : number, tipo : Tipo, identificador : string, lista_params, metodo, lista_instrucciones, linea, columna) {
        super(simbolo,tipo,identificador,null,lista_params, metodo);
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna =columna;
    }
    getTipo(controlador: Controlador, ts: TablaSimbolos): string {
        return "Funcion"
    }

    agregarSimboloFuncion(controlador: Controlador, ts: TablaSimbolos){
        if(!(ts.existe(this.identificador))){
            ts.agregar(this.identificador,this);
        }else{
            let error = new Errores('Semantico', `Error , El simbolo ${this.identificador} ya existe en este contexto`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error , El simbolo ${this.identificador} ya existe en este contexto`+ "Linea: " +this.linea );
        }
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let ts_local = new TablaSimbolos(ts);
        controlador.ListaTablaSimbolos.push(new TablaSimbolosGraf(ts_local,"Funcion: " + this.identificador));
        let comprobadorReturns : boolean = true;
        for(let ins of this.lista_instrucciones){
            let r = ins.ejecutar(controlador,ts_local);

            if ( r instanceof Return || ins instanceof Return){
                if(r != null){
                    //controlador.append("primer tipo" + ins.getTipo(controlador,ts) + "tipo de funcion " + this.tipo.type);
                    if((r.getTipo(controlador,ts) == this.tipo.type)){
                        console.log("la funcion esta devolviendo")
                        console.log(r)
                        comprobadorReturns = false;
                        return r;
                    }else{
                        let error = new Errores('Semantico', `Error semantico, el tipo del return no coincide con el tipo de funcion`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Error semantico, el tipo del return no coincide con el tipo de funcion`+ "Linea: " +this.linea );
                        return
                    }
                    
                }
            }else if(r instanceof Detener || ins instanceof Detener) {
                let error = new Errores('Sintactico', `Error sintactico, el Break no esta dentro de un ciclo`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Error, el Break no esta dentro de un ciclo`+ "Linea: " +this.linea );
                //return null;
            }else if (ins instanceof Continuar || r instanceof Continuar){
                let error = new Errores('Sintactico', `Error sintactico, el Continue no esta dentro de un ciclo`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Error, el Continue no esta dentro de un ciclo`+ "Linea: " +this.linea );
            }  

        }
        if(!(this.tipo.type == tipo.VOID)){
            if(comprobadorReturns){
                let error = new Errores('Semantico', `La funcion deberia de devolver un valor`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Error, La funcion deberia de devolver un valor`+ "Linea: " +this.linea );
            }
        }
        return null;
    }


    recorrer(): Nodo {
        let padre = new Nodo("Funcion",""); 
        padre.AddHijo(new Nodo(this.tipo.stype,""));
        padre.AddHijo(new Nodo(this.identificador,""));

        padre.AddHijo(new Nodo("(",""));

        //TODO: AGREGAR NODOS PARAMETROS SOLO SI HAY

        let contador : number = 0
        let Hijoparametros =  new Nodo("parametros","")
        for(let inst of this.lista_params){
            let hijoTipo = new Nodo("tipo","")
            if(inst.tipo.type == tipo.BOOLEANO){
                hijoTipo.AddHijo(new Nodo("BOOLEANO",""))
            }else if(inst.tipo.type == tipo.CADENA){
                hijoTipo.AddHijo(new Nodo("CADENA",""))
            }else if(inst.tipo.type == tipo.CARACTER){
                hijoTipo.AddHijo(new Nodo("CARACTER",""))
            }else if(inst.tipo.type == tipo.DOBLE){
                hijoTipo.AddHijo(new Nodo("DOBLE",""))
            }else if(inst.tipo.type == tipo.ENTERO){
                hijoTipo.AddHijo(new Nodo("ENTERO",""))
            }
            Hijoparametros.AddHijo(hijoTipo)


            let hijoID = new Nodo("ID","")

            hijoID.AddHijo(new Nodo(inst.identificador,""))
            Hijoparametros.AddHijo(hijoID)

            if (this.lista_params.length-1 != contador){
                Hijoparametros.AddHijo(new Nodo(",",""))
            }
    
        }

        padre.AddHijo( Hijoparametros)

        padre.AddHijo(new Nodo(")",""));

        padre.AddHijo(new Nodo("{",""));

        let hijo_instrucciones = new Nodo("Instrucciones","");
        for(let inst of this.lista_instrucciones){
            hijo_instrucciones.AddHijo(inst.recorrer());
        }
        
        padre.AddHijo(hijo_instrucciones);
        padre.AddHijo(new Nodo("}",""));
        
       return padre;
    }

}