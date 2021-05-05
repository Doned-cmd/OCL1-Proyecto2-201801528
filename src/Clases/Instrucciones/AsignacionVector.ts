import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import Primitivo from "../Expresiones/Primitivo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class AsignacionVector implements Instruccion{

    public identificador : string;
    public tamano : Expresion;
    public valor : Expresion;
    public linea : number;
    public columna : number;

    constructor(identificador, tamano, valor, linea, columna) {
        this.identificador = identificador;
        this.tamano = tamano;
        this.valor = valor;
        this.linea =linea;
        this.columna = columna;
    }
    getTipo(controlador: Controlador, ts: TablaSimbolos): string {
        return "Asignacion"
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        //verificamos si existe en la tabla de simbolos 
        if(ts.existe(this.identificador.toLowerCase())){
            //let arreglo = new Array<any>();
            let arreglo = ts.getSimbolo(this.identificador.toLowerCase()).valor;

            let valorasignar = this.valor.getValor(controlador,ts );
            let tipo_valor = this.valor.getTipo(controlador,ts)

            let tipo_id = ts.getSimbolo(this.identificador.toLowerCase()).tipo.type;

            let valortamano = this.tamano.getValor(controlador,ts)

            if(this.tamano.getTipo(controlador,ts) != tipo.ENTERO){
                let error = new Errores('Semantico', `El index del  vector ${this.identificador}, solo puede ser entero `, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`El index del  vector ${this.identificador}, solo puede ser entero `+ "Linea: " +this.linea );
                return null;
            }

            let tipolocal : tipo
            if (tipo_id == tipo.BOOLEANOVEC){
                tipolocal = tipo.BOOLEANO
            }else if(tipo_id == tipo.CADENAVEC){
                tipolocal = tipo.CADENA
            }else if(tipo_id == tipo.CARACTERVEC){
                tipolocal = tipo.CARACTER
            }else if(tipo_id == tipo.DOBLEVEC){
                tipolocal = tipo.DOBLE
            }else if(tipo_id == tipo.ENTEROVEC){
                tipolocal = tipo.ENTERO
            }

            if(tipo_valor == tipolocal){
                console.log("Asignar en ", valortamano, "de tamano " ,arreglo.length-1)
                if(arreglo.length-1 >=  valortamano){
                    arreglo[valortamano] = valorasignar
                    ts.getSimbolo(this.identificador.toLowerCase()).setValor(arreglo);
                }else{
                    let error = new Errores('Semantico', `El index del  vector ${this.identificador}, excede el tamaño de este `, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`El index del  vector ${this.identificador}, excede el tamaño de este ` + "Linea: " +this.linea );
                    return null;
                }

            }else{
                let error = new Errores('Semantico', `error al re-asignar, los tipos del valor ${this.identificador} y la variable no coinciden.`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`error al re-asignar, los tipos del valor ${this.identificador} y la variable no coinciden.`+ "Linea: " +this.linea );
                return null;
                console.log("error al re-asignar, los tipos del valor y la variable no coinciden.")
            } 

        }else{
            let error = new Errores('Semantico', `Error No existe la variable ${this.identificador} en la tabla de simbolos.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`Error No existe la variable ${this.identificador} en la tabla de simbolos.`+ "Linea: " +this.linea );
            return null;            
        }

        
        return null
    }
    recorrer(): Nodo {
        let Padre = new Nodo("Asignacion","")        
        Padre.AddHijo(new Nodo(this.identificador,""))
        Padre.AddHijo(new Nodo("=",""))
        let igualacion =  new Nodo("expresion","")
        igualacion.AddHijo(this.valor.recorrer())        
        Padre.AddHijo(igualacion)
        return Padre
    }

}