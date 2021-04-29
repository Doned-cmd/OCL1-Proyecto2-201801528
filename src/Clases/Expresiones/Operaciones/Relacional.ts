import Errores from "src/Clases/Ast/Errores";
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/Clases/TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operaciones";

export default class Relacional extends Operacion implements Expresion{
    
    public constructor(exp1: Expresion, op: string, exp2: Expresion, linea: number, columna:number, expU :boolean) {
        super(exp1,op,exp2,linea,columna,expU);        
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos) : tipo{
        let valor = this.getValor(controlador,ts);
        
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
            valor_exp1 = this.exp1.getValor(Controlador, TablaSimbolos);
            valor_exp2 = this.exp2.getValor(Controlador, TablaSimbolos);
        }else{
            valor_expU = this.exp1.getValor(Controlador, TablaSimbolos);
        }

        /**
         * Para las siguientes validaciones nos basamos en la tabla de 
         * de las operaciones relacionales permitidas que soporta el lenguaje descrito en el enunciado.
         */
        switch (this.operador) {
            case Operador.MENORQUE:
                if(typeof valor_exp1 === 'number'){
                    if(typeof valor_exp2 === 'number'){
                        return valor_exp1 < valor_exp2;
                    }else if(this.exp2.getTipo(Controlador,TablaSimbolos) == tipo.CARACTER){                        
                        let num_ascii = valor_exp2.charCodeAt(0);
                        return valor_exp1 < num_ascii;
                        
                    }else{
                        let error = new Errores('Semantico', `No se puede operar Relacionalmente "<" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`, this.linea, this.columna);
                        Controlador.errores.push(error);
                        Controlador.append(`No se puede operar Relacionalmente "<" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`+ "Linea: " +this.linea );                        
                    }
                }else if(this.exp1.getTipo(Controlador,TablaSimbolos) == tipo.CARACTER){
                    let num_ascii = valor_exp1.charCodeAt(0);

                    if(typeof valor_exp2 === 'number'){
                        return num_ascii < valor_exp2;
                    }else if(this.exp2.getTipo(Controlador,TablaSimbolos) == tipo.CARACTER){                        
                        let num_ascii2 = valor_exp2.charCodeAt(0);
                        return num_ascii < num_ascii2;                        
                    }else{
                        let error = new Errores('Semantico', `No se puede operar Relacionalmente "<" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`, this.linea, this.columna);
                        Controlador.errores.push(error);
                        Controlador.append(`No se puede operar Relacionalmente "<" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`+ "Linea: " +this.linea );                        
                    }
                }else{
                    let error = new Errores('Semantico', `No se puede operar Relacionalmente "<" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`, this.linea, this.columna);
                    Controlador.errores.push(error);
                    Controlador.append(`No se puede operar Relacionalmente "<" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`+ "Linea: " +this.linea );                        
                }
                
                break;
            case Operador.MAYORQUE:
                if(typeof valor_exp1 === 'number'){
                    if(typeof valor_exp2 === 'number'){
                        return valor_exp1 > valor_exp2;
                    }else if(this.exp2.getTipo(Controlador,TablaSimbolos) == tipo.CARACTER){                        
                        let num_ascii = valor_exp2.charCodeAt(0);
                        return valor_exp1 > num_ascii;
                        
                    }else{
                        let error = new Errores('Semantico', `No se puede operar Relacionalmente ">" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`, this.linea, this.columna);
                        Controlador.errores.push(error);
                        Controlador.append(`No se puede operar Relacionalmente ">" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`+ "Linea: " +this.linea );                        
                    }
                    
                }else if(this.exp1.getTipo(Controlador,TablaSimbolos) == tipo.CARACTER){
                    let num_ascii = valor_exp1.charCodeAt(0);

                    if(typeof valor_exp2 === 'number'){
                        return num_ascii > valor_exp2;
                    }else if(this.exp2.getTipo(Controlador,TablaSimbolos) == tipo.CARACTER){                        
                        let num_ascii2 = valor_exp2.charCodeAt(0);
                        return num_ascii > num_ascii2;                        
                    }else{
                        let error = new Errores('Semantico', `No se puede operar Relacionalmente ">" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`, this.linea, this.columna);
                        Controlador.errores.push(error);
                        Controlador.append(`No se puede operar Relacionalmente ">" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`+ "Linea: " +this.linea );                        
                    }
                }else{
                    let error = new Errores('Semantico', `No se puede operar Relacionalmente ">" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`, this.linea, this.columna);
                    Controlador.errores.push(error);
                    Controlador.append(`No se puede operar Relacionalmente ">" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`+ "Linea: " +this.linea );                        
                }
                    
                    break;
            case Operador.IGUALIGUAL:
                if(this.exp1.getTipo(Controlador,TablaSimbolos) == this.exp2.getTipo(Controlador,TablaSimbolos)){
                    return valor_exp1 == valor_exp2;
                }else{
                    let error = new Errores('Semantico', `No se puede operar Relacionalmente "==" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`, this.linea, this.columna);
                    Controlador.errores.push(error);
                    Controlador.append(`No se puede operar Relacionalmente "==" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`+ "Linea: " +this.linea );                        
                }
                break;
            case Operador.NOTIGUAL:
                if(this.exp1.getTipo(Controlador,TablaSimbolos) == this.exp2.getTipo(Controlador,TablaSimbolos)){                    
                    return valor_exp1 != valor_exp2;                    
                }else{
                    let error = new Errores('Semantico', `No se puede operar Relacionalmente "!=" ${valor_exp2} y ${valor_exp2}, ya que no son de tipos validos`, this.linea, this.columna);
                    Controlador.errores.push(error);
                    Controlador.append(`No se puede operar Relacionalmente "!=" ${valor_exp2} y ${valor_exp2}, ya que no son de tipos validos`+ "Linea: " +this.linea );                        
                }
                break;
            case Operador.MAYORIGUAL:
                if(typeof valor_exp1 === 'number'){
                    if(typeof valor_exp2 === 'number'){
                        return valor_exp1 >= valor_exp2;
                    }else if(this.exp2.getTipo(Controlador,TablaSimbolos) == tipo.CARACTER){                        
                        let num_ascii = valor_exp2.charCodeAt(0);
                        return valor_exp1 >= num_ascii;
                        
                    }else{
                        let error = new Errores('Semantico', `No se puede operar Relacionalmente ">=" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`, this.linea, this.columna);
                        Controlador.errores.push(error);
                        Controlador.append(`No se puede operar Relacionalmente ">=" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`+ "Linea: " +this.linea );                        
                    }
                }else if(this.exp1.getTipo(Controlador,TablaSimbolos) == tipo.CARACTER){
                    let num_ascii = valor_exp1.charCodeAt(0);

                    if(typeof valor_exp2 === 'number'){
                        return num_ascii >= valor_exp2;
                    }else if(this.exp2.getTipo(Controlador,TablaSimbolos) == tipo.CARACTER){                        
                        let num_ascii2 = valor_exp2.charCodeAt(0);
                        return num_ascii >= num_ascii2;                        
                    }else{
                        let error = new Errores('Semantico', `No se puede operar Relacionalmente ">=" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`, this.linea, this.columna);
                        Controlador.errores.push(error);
                        Controlador.append(`No se puede operar Relacionalmente ">=" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`+ "Linea: " +this.linea );                        
                    }
                }else{
                    let error = new Errores('Semantico', `No se puede operar Relacionalmente ">=" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`, this.linea, this.columna);
                    Controlador.errores.push(error);
                    Controlador.append(`No se puede operar Relacionalmente ">=" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`+ "Linea: " +this.linea );                        
                }
                    break;

            case Operador.MENORIGUAL:
                if(typeof valor_exp1 === 'number'){
                    if(typeof valor_exp2 === 'number'){
                        return valor_exp1 <= valor_exp2;
                    }else if(this.exp2.getTipo(Controlador,TablaSimbolos) == tipo.CARACTER){                        
                        let num_ascii = valor_exp2.charCodeAt(0);
                        return valor_exp1 <= num_ascii;
                        
                    }else{
                        let error = new Errores('Semantico', `No se puede operar Relacionalmente "<=" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`, this.linea, this.columna);
                        Controlador.errores.push(error);
                        Controlador.append(`No se puede operar Relacionalmente "<=" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`+ "Linea: " +this.linea );                        
                    }
                }else if(this.exp1.getTipo(Controlador,TablaSimbolos) == tipo.CARACTER){
                    let num_ascii = valor_exp1.charCodeAt(0);

                    if(typeof valor_exp2 === 'number'){
                        return num_ascii <= valor_exp2;
                    }else if(this.exp2.getTipo(Controlador,TablaSimbolos) == tipo.CARACTER){                        
                        let num_ascii2 = valor_exp2.charCodeAt(0);
                        return num_ascii <= num_ascii2;                        
                    }else{
                        let error = new Errores('Semantico', `No se puede operar Relacionalmente "<=" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`, this.linea, this.columna);
                        Controlador.errores.push(error);
                        Controlador.append(`No se puede operar Relacionalmente "<=" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`+ "Linea: " +this.linea );                        
                    }
                }else{
                    let error = new Errores('Semantico', `No se puede operar Relacionalmente "<=" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`, this.linea, this.columna);
                    Controlador.errores.push(error);
                    Controlador.append(`No se puede operar Relacionalmente "<=" ${valor_exp1} y ${valor_exp2}, ya que no son de tipos validos`+ "Linea: " +this.linea );                        
                }
                
                break;                  
            default:
                break;
        }
    }
    

    recorrer(): Nodo {
        throw new Error("Method not implemented.");
    }
    
}