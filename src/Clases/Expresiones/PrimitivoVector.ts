import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class  PrimitivoVector implements Expresion{

    public identificador : string; 
    public index : Expresion;
    public linea : number;
    public columna : number;

    /**
     * @constructor creamos un nuevo primitivo
     * @param primitivo hace referencia a los valores enteros, dobles, cadenas, caracteres, booleanos
     * @param linea idica la linea donde se encuentra
     * @param columna indica la columna donde se encuentra
     */
    constructor(identificador : string, index ,linea: number, columna : number) {
        this.identificador = identificador
        this.index = index;
        this.columna = columna;
        this.linea = linea;
        
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos) :tipo {
        let existe_id = ts.getSimbolo(this.identificador.toLowerCase());

        if(existe_id != null ){
            let tipolocal : tipo
            if (existe_id.tipo.type == tipo.BOOLEANOVEC){
                tipolocal = tipo.BOOLEANO
            }else if(existe_id.tipo.type == tipo.CADENAVEC){
                tipolocal = tipo.CADENA
            }else if(existe_id.tipo.type == tipo.CARACTERVEC){
                tipolocal = tipo.CARACTER
            }else if(existe_id.tipo.type == tipo.DOBLEVEC){
                tipolocal = tipo.DOBLE
            }else if(existe_id.tipo.type == tipo.ENTEROVEC){
                tipolocal = tipo.ENTERO
            }
            return tipolocal; 
        }else{
            let error = new Errores('Semantico', `No existe la variable ${this.identificador} en la tabla de simbolos.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`No existe la variable ${this.identificador} en la tabla de simbolos.`+ "Linea: " +this.linea );
            return null;
        }
    }

    /**
     * @returns retorna el valor exacto del primitivo 
     */
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let existe_id = ts.getSimbolo(this.identificador.toLowerCase());
        let indexvec = this.index.getValor(controlador,ts)

        if(existe_id != null){
            let arreglo = new Array<any>()
            arreglo = ts.getSimbolo(this.identificador.toLowerCase()).valor;

            if(this.index.getTipo(controlador,ts) == tipo.ENTERO){
                if(arreglo.length-1 >= indexvec){
                    console.log(arreglo[indexvec])
                    return arreglo[indexvec]
                }else{
                    let error = new Errores('Semantico', `El index del  vector ${this.identificador}, excede el tamaño de este `, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`El index del  vector ${this.identificador}, excede el tamaño de este ` + "Linea: " +this.linea );
                    return null;
                }

            }else{
                let error = new Errores('Semantico', `El index del  vector ${this.identificador}, solo puede ser entero `, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`El index del  vector ${this.identificador}, solo puede ser entero `+ "Linea: " +this.linea );
                return null;
            }                     
        }else{
            let error = new Errores('Semantico', `No existe la variable ${this.identificador} en la tabla de simbolos.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`No existe la variable ${this.identificador} en la tabla de simbolos.`+ "Linea: " +this.linea );
            return null;
        }
    }
    recorrer(): Nodo {
        let padre = new Nodo("Identificador Vector","");
        padre.AddHijo(new Nodo(this.identificador.toString(),""));
        padre.AddHijo(new Nodo("[",""));
        let hijoexpr =  new Nodo("expresion","")
        hijoexpr.AddHijo(this.index.recorrer())
        padre.AddHijo(hijoexpr)
        padre.AddHijo(new Nodo("]",""));
       return padre;
    }

}