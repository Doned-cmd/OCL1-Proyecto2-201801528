import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";


export default class DeclaracionVectores implements Instruccion{
    
    public type : Tipo;
    public identificador : string;

    public tamano: Expresion
   
    public ListaVector: Array<Expresion>
    public EsDecPorLista: boolean
    public type2 : Tipo

    public linea : number;
    public columna: number;

    constructor(type :Tipo, identificador:string ,EsDecPorLista:boolean, datos, linea, columna ,type2?) {
        this.type = type;
        this.identificador = identificador
        this.EsDecPorLista = EsDecPorLista
        if (EsDecPorLista){
            this.ListaVector = datos
        }else{
            this.tamano = datos
            this.type2 = type2
        }
        this.linea = linea 
        this.columna = columna
    }
    getTipo(controlador: Controlador, ts: TablaSimbolos): string {
        return "Declaracion"
    }

    
    ejecutar(controlador: Controlador, ts: TablaSimbolos) {

        let tipolocal : tipo
        if (this.type.type == tipo.BOOLEANOVEC){
            tipolocal = tipo.BOOLEANO
        }else if(this.type.type == tipo.CADENAVEC){
            tipolocal = tipo.CADENA
        }else if(this.type.type == tipo.CARACTERVEC){
            tipolocal = tipo.CARACTER
        }else if(this.type.type == tipo.DOBLEVEC){
            tipolocal = tipo.DOBLE
        }else if(this.type.type == tipo.ENTEROVEC){
            tipolocal = tipo.ENTERO
        }else{
            let error = new Errores('Sintactico', `El tipo del vector no es valido `, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(`El tipo del vector no es valido `+ "Linea: " +this.linea );
            return null;
        }

        if(ts.existeEnActual(this.identificador.toLowerCase())){
            let error = new Errores('Semantico', `La variable ${this.identificador.toLowerCase()} ya existe en el entorno actual.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(` Error Critico Semantico : La variable ${this.identificador.toLowerCase()} ya existe en el entorno actual. En la linea ${this.linea} y columna ${this.columna}`);
            return null;
        }
        
        if(this.EsDecPorLista){
            let arreglonuevo = new Array<any>()
            for (let exp of this.ListaVector){             
                let valor = exp.getValor(controlador,ts)
                
                if( tipolocal == exp.getTipo(controlador,ts) ){
                    arreglonuevo.push(valor)
                }else{
                    let error = new Errores('Semantico', `La variable ${this.identificador.toLowerCase()} y el valor a asignar no son del mismo tipo `, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`La variable ${this.identificador.toLowerCase()} y el valor a asignar no son del mismo tipo `+ "Linea: " +this.linea );
                    return null;
                }
            }
                       
            
            //crear el nuevo simbolo en la tabla 
            let nuevo_simb = new Simbolos(1, this.type, this.identificador.toLowerCase(), arreglonuevo);
            ts.agregar(this.identificador.toLowerCase(), nuevo_simb);
            console.log("Variable asignada")
        }else{
            let valor = this.tamano.getValor(controlador,ts)
            console.log("tamano del nuevo vector",valor)
            let arreglonuevo = new Array<any>()
            //llenar el arreglo hasta el tamano definido
            if(this.tamano.getTipo(controlador,ts) == tipo.ENTERO){
                for (let i:number =0; i<valor; i++){
                    //console.log(i)
                    arreglonuevo.push(0);                    
                }
            //crear el nuevo simbolo en la tabla     
            let nuevo_simb = new Simbolos(4, this.type, this.identificador.toLowerCase(), arreglonuevo);
            ts.agregar(this.identificador.toLowerCase(), nuevo_simb);
            console.log("Vector asignado, su tamano es " , arreglonuevo.length)
            }else{
                let error = new Errores('Semantico', `El tamaño de la variable ${this.identificador}, solo puede ser entero `, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`El tamaño de la variable ${this.identificador}, solo puede ser entero `+ "Linea: " +this.linea );
                return null;
            }
        }
        
        return null
    }

    recorrer(): Nodo {
        let padre = new Nodo("Declaracion Vectores","")
        let hijoTipo = new Nodo("tipo","")

        if(this.type.type == tipo.BOOLEANOVEC){
            hijoTipo.AddHijo(new Nodo("BOOLEANO[]",""))
        }else if(this.type.type == tipo.CADENAVEC){
            hijoTipo.AddHijo(new Nodo("CADENA[]",""))
        }else if(this.type.type == tipo.CARACTERVEC){
            hijoTipo.AddHijo(new Nodo("CARACTER[]",""))
        }else if(this.type.type == tipo.DOBLEVEC){
            hijoTipo.AddHijo(new Nodo("DOBLE[]",""))
        }else if(this.type.type == tipo.ENTEROVEC){
            hijoTipo.AddHijo(new Nodo("ENTERO[]",""))
        }

        padre.AddHijo(hijoTipo)
        
        let hijoID = new Nodo("Id", "")
        hijoID.AddHijo(new Nodo(this.identificador,""))
        padre.AddHijo(hijoID)
        padre.AddHijo(new Nodo("=", ""))
        
        let contador : number = 0
        if(this.EsDecPorLista){
            let hijoValores = new Nodo("valores", "")
            for (let exp of this.ListaVector){
                if(contador != this.ListaVector.length){
                    let hijorec = (new Nodo("expresion",""))
                    hijorec.AddHijo(exp.recorrer())
                    hijoValores.AddHijo(hijorec)
                }else{
                    let hijorec = (new Nodo("expresion",""))
                    hijorec.AddHijo(exp.recorrer())
                    hijoValores.AddHijo(hijorec)
                    hijoValores.AddHijo(new Nodo(",", ""))        
                }
            }

            padre.AddHijo(new Nodo("{", ""))
            padre.AddHijo(hijoValores)
            padre.AddHijo(new Nodo("}", ""))
        }else{
            let hijoValores = new Nodo("inicializacion", "")
            hijoValores.AddHijo(new Nodo("new", ""))

            let hijonuevotipo = new Nodo("Tipo","")

            if(this.type.type == tipo.BOOLEANO){
                hijonuevotipo.AddHijo(new Nodo("BOOLEANO",""))
            }else if(this.type.type == tipo.CADENA){
                hijonuevotipo.AddHijo(new Nodo("CADENA",""))
            }else if(this.type.type == tipo.CARACTER){
                hijonuevotipo.AddHijo(new Nodo("CARACTER",""))
            }else if(this.type.type == tipo.DOBLE){
                hijonuevotipo.AddHijo(new Nodo("DOBLE",""))
            }else if(this.type.type == tipo.ENTERO){
                hijonuevotipo.AddHijo(new Nodo("ENTERO",""))
            }
            hijoValores.AddHijo(hijonuevotipo)
            hijoValores.AddHijo(new Nodo("[",""))
            let hijotamano = new Nodo('tamano ',"")
            hijotamano.AddHijo(this.tamano.recorrer())
            hijoValores.AddHijo(hijotamano)
            hijoValores.AddHijo(new Nodo("]",""))
            padre.AddHijo(hijoValores)
        }
        
        return padre
    }

}