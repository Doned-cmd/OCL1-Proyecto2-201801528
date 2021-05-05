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

        if(ts.existeEnActual(this.identificador.toLowerCase())){
            let error = new Errores('Semantico', `La variable ${this.identificador.toLowerCase()} ya existe en el entorno actual.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(` Error Critico Semantico : La variable ${this.identificador.toLowerCase()} ya existe en el entorno actual. En la linea ${this.linea} y columna ${this.columna}`);
            return null;
        }

        if(this.EsDecPorLista){
            for (let exp of this.ListaVector){                
                if(this.type.type == exp.getTipo(controlador,ts) ){

                }else{
                    let error = new Errores('Semantico', `La variable ${this.identificador.toLowerCase()} y el valor a asignar no son del mismo tipo `, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`La variable ${this.identificador.toLowerCase()} y el valor a asignar no son del mismo tipo `+ "Linea: " +this.linea );
                    return null;
                }
            }
            
            let arreglonuevo = new Array<any>()
            for (let exp of this.ListaVector){

                arreglonuevo.push(exp.getValor(controlador,ts))

            }
            
            //crear el nuevo simbolo en la 
            let nuevo_simb = new Simbolos(1, this.type, this.identificador.toLowerCase(), arreglonuevo);
            ts.agregar(this.identificador.toLowerCase(), nuevo_simb);
            console.log("Variable asignada")
        }else{

        }
        
        return null
    }

    recorrer(): Nodo {
        let padre = new Nodo("Declaracion Vectores","")
        let hijoTipo = new Nodo("tipo","")

        if(this.type.type == tipo.BOOLEANO){
            hijoTipo.AddHijo(new Nodo("BOOLEANO",""))
        }else if(this.type.type == tipo.CADENA){
            hijoTipo.AddHijo(new Nodo("CADENA",""))
        }else if(this.type.type == tipo.CARACTER){
            hijoTipo.AddHijo(new Nodo("CARACTER",""))
        }else if(this.type.type == tipo.DOBLE){
            hijoTipo.AddHijo(new Nodo("DOBLE",""))
        }else if(this.type.type == tipo.ENTERO){
            hijoTipo.AddHijo(new Nodo("ENTERO",""))
        }

        padre.AddHijo(hijoTipo)
        
        
        let contador : number = 0
        
        
        return padre
    }

}