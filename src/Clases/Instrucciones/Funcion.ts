import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo from "../TablaSimbolos/Tipo";
import Detener from "./SentenciaTransferencia/Break";
import Return from "./SentenciaTransferencia/Return";


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
            //error semantico
        }
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let ts_local = new TablaSimbolos(ts);

        for(let ins of this.lista_instrucciones){
            let r = ins.ejecutar(controlador,ts_local);

            if ( r instanceof Return || ins instanceof Return){
                if(r != null){
                    console.log("la funcion esta devolviendo")
                    console.log(r)
                    return r;
                }
            }else if(r instanceof Detener || ins instanceof Detener) {
                console.log("Error")
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