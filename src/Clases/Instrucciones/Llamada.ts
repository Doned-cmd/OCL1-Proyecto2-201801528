import Errores from "../Ast/Errores";
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
        return ts.getSimbolo(this.identificador.toLocaleLowerCase()).tipo.type
    }


    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        //Verificar si la funcion/metodo existe 

        if(ts.existe(this.identificador.toLowerCase())){
            let ts_local = new TablaSimbolos(ts);

            let simbolo_funcion = ts.getSimbolo(this.identificador.toLowerCase()) as Funcion;
            
            //TODO: Hacer un metodo para validar si los parametros de la llamada son del mismo tipo que el de la funcion
            
            if(this.VerificarParametros(this.parametros, simbolo_funcion.lista_params, controlador, ts, ts_local)){
                
                let r = simbolo_funcion.ejecutar(controlador,ts_local);

                if(r != null){
                    console.log("la llamada devuelve")
                    console.log(r)
                    return r
                }    
                
            }else{
                let error = new Errores('Semantico', `Los parametros de la funcion ${this.identificador} son erroneos. `, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Los parametros de la funcion ${this.identificador} son erroneos. `+ "Linea: " +this.linea );
                return null;
            }

                    
        }else{
            //TODO: reportar error semantico
        }
        return null
    }

    VerificarParametros(parametrosllamada : Array<Expresion>, parametrosfuncion : Array<Simbolos>, controlador, ts:TablaSimbolos, ts_local:TablaSimbolos):boolean{
        console.log(parametrosllamada.length )
        let booleano : boolean = false;
        if(parametrosllamada.length == parametrosfuncion.length ){
            let aux : Simbolos;
            let id_aux : string;
            let tipo_aux;

            let exp_aux : Expresion;
            let tipo_valor;
            let valor_aux;

            for (let i =0; i < parametrosfuncion.length; i++){
                aux = parametrosfuncion[i] as Simbolos
                id_aux = aux.identificador.toLowerCase()
                tipo_aux = aux.tipo.type


                exp_aux = parametrosllamada[i] as Expresion
                valor_aux = exp_aux.getValor(controlador,ts)
                tipo_valor = exp_aux.getTipo(controlador,ts)
                


                if((tipo_aux == tipo_valor ) || (tipo_aux == tipo.DOBLE && tipo_valor == tipo.ENTERO) ){

                    let simbolo = new Simbolos(aux.simbolo, aux.tipo, id_aux, valor_aux)
                    ts_local.agregar(id_aux,simbolo)
                    booleano = true
                }else{
                    return false
                }
            }
        }if(parametrosllamada.length == 0 ){
            booleano = true
        }

        return booleano
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