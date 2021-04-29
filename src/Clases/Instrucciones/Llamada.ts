import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";
import Funcion from "./Funcion";

export default class Llamada implements Instruccion{

    public identificador : string;
    public parametros : Array<Expresion>;
    public linea : number;
    public columna : number;

    constructor(id, param, linea, col) {
        this.identificador = id;
        this.parametros = param;
        this.columna = col;
        this.linea = linea;
    }
    getTipo(controlador: Controlador, ts: TablaSimbolos): any {
        return ts.getSimbolo(this.identificador).tipo.type
    }


    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        //Verificar si la funcion/metodo existe 

        if(ts.existe(this.identificador)){
            let ts_local = new TablaSimbolos(ts);

            let simbolo_funcion = ts.getSimbolo(this.identificador) as Funcion;
            
            //TODO: Hacer un metodo para validar si los parametros de la llamada son del mismo tipo que el de la funcion
            
            if(this.VerificarParametros(this.parametros, simbolo_funcion.lista_params, controlador, ts, ts_local)){
                
                let  a = simbolo_funcion.ejecutar(controlador,ts)
                console.log("esto esta imprimiendo")
                console.log(a )
                return a
                
            }

            let r = simbolo_funcion.ejecutar(controlador,ts);

            ///if(r != null){
                console.log("la llamada devuelve")
                console.log(r)
                return r
            //}            
        }else{
            //TODO: reportar error semantico
        }
        return null
    }

    VerificarParametros(parametrosllamada : Array<Expresion>, parametrosfuncion : Array<Simbolos>, controlador, ts:TablaSimbolos, ts_local:TablaSimbolos):boolean{

        if(parametrosllamada.length == parametrosfuncion.length){
            let aux : Simbolos;
            let id_aux : string;
            let tipo_aux;

            let exp_aux : Expresion;
            let tipo_valor;
            let valor_aux;

            for (let i =0; i < parametrosfuncion.length; i++){
                aux = parametrosfuncion[i] as Simbolos
                id_aux = aux.identificador
                tipo_aux = aux.tipo.type


                exp_aux = parametrosllamada[i] as Expresion
                tipo_valor = exp_aux.getTipo(controlador,ts)
                valor_aux = exp_aux.getValor(controlador,ts)


                if((tipo_aux == tipo_valor ) || (tipo_aux == tipo.DOBLE && tipo_valor == tipo.ENTERO) ){

                    let simbolo = new Simbolos(aux.simbolo, aux.tipo, id_aux, valor_aux)
                    ts_local.agregar(id_aux,simbolo)
                    return true
                }
            }
        }
        return false
    }   


    recorrer(): Nodo {
        let padre = new Nodo("Llamada",""); 
        padre.AddHijo(new Nodo(this.identificador,""));
        padre.AddHijo(new Nodo("(",""));

        //TODO: AGREGAR NODOS HIJOS DE PARAMETROS
        
        padre.AddHijo(new Nodo(")",""));
        
       return padre;
    }

}