import Errores from "src/Clases/Ast/Errores";
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/Clases/TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operaciones";

export default class Logica extends Operacion implements Expresion{

    public constructor(exp1: Expresion, op: string, exp2: Expresion, linea: number, columna:number, expU :boolean) {
        super(exp1,op,exp2,linea,columna,expU);        
    }

    getTipo(Controlador: Controlador, TablaSimbolos: TablaSimbolos): tipo {
        let valor = this.getValor(Controlador,TablaSimbolos);
        
        if(typeof valor == 'number'){
            return tipo.DOBLE;
        }else if(typeof valor == 'string'){
            return tipo.CADENA;
        }else if(typeof valor == 'boolean'){
            return tipo.BOOLEANO;
        }
    }

    getValor(Controlador: Controlador, TablaSimbolos: TablaSimbolos) {
        let valor_exp1;
        let valor_exp2;
        let valor_expU;
        
        if(this.expU == false){
            valor_exp1 = this.exp1.getValor(Controlador,TablaSimbolos);
            valor_exp2 = this.exp2.getValor(Controlador,TablaSimbolos);
        }else{
            valor_expU = this.exp1.getValor(Controlador,TablaSimbolos);
        }

        /**
         * Para las siguientes validaciones nos basamos en la tabla de 
         * de las operaciones Logicas permitidas que soporta el lenguaje descrito en el enunciado.
         */
        switch (this.operador) {
            case Operador.AND:
                if(this.exp1.getTipo(Controlador,TablaSimbolos) == tipo.BOOLEANO){
                    if(typeof valor_exp2 == 'boolean'){
                        return valor_exp1 && valor_exp2;
                    }else{
                        return valor_exp1 && true;
                    }
                }else{
                    if(typeof valor_exp2 == 'boolean'){
                        return true && valor_exp2;
                    }else{
                        return true && true;
                    }                    
                }
                break;
            case Operador.NOT:
                    if(typeof valor_expU == 'boolean'){
                        return !valor_expU;
                    }else{
                        let error = new Errores('Semantico', `No se puede negar ${valor_expU} ya que el valor no es booleano.`, this.linea, this.columna);
                        Controlador.errores.push(error);
                        Controlador.append(`No se puede negar ${valor_expU} ya que el valor no es booleano.`+ "Linea: " +this.linea );
            return null;
                    }
                    break;
            case Operador.OR:
                if(typeof valor_exp1 == 'boolean'){
                    if(typeof valor_exp2 == 'boolean'){
                        return valor_exp1 || valor_exp2;
                    }else{
                        return valor_exp1 || true;
                    }
                }else{
                    if(typeof valor_exp2 == 'boolean'){
                        return true || valor_exp2;
                    }else{
                        return true || true;
                    }                    
                }

                break;
                            
            default:
                let error = new Errores('Semantico', `Error critico, no se uso ningun operador logico reconocido`, this.linea, this.columna);
                Controlador.errores.push(error);
                Controlador.append(`Error critico, no se uso ningun operador logico reconocido`+ "Linea: " +this.linea );
                break;
        }
    }

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }

}