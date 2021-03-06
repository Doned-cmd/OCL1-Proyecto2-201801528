//import { type } from "node:os";
import Errores from "src/Clases/Ast/Errores";
import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operaciones";


export default class Aritmetica extends Operacion  implements Expresion {

    public tipo : any;
    public constructor(exp1 : Expresion, operador : Operacion, exp2, linea, columna, expU ) {
        super(exp1, operador, exp2, linea, columna, expU);
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos) : tipo{
        //let valor = this.getValor(controlador, ts);

        //if(typeof valor === 'number'){   
        //    return tipo.DOBLE;
        //}else if(typeof valor === 'string'){
        //    return tipo.CADENA;
        //}else if(typeof valor === 'boolean'){
        //    return tipo.BOOLEANO;
        //}
        return this.tipo
    }

    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let valor_exp1;
        let valor_exp2;
        let valor_expU;
        
        
        if(this.expU == false){
            valor_exp1 = this.exp1.getValor(controlador, ts);
            valor_exp2 = this.exp2.getValor(controlador, ts);
        }else{
            valor_expU = this.exp1.getValor(controlador, ts);
        }

        /**
         * Para las siguientes validaciones nos basamos en la tabla de 
         * de las operaciones aritmeticas permitidas que soporta el lenguaje descrito en el enunciado.
         */
        switch (this.operador) {

/**
 * -------------SUMA----------------------------------------------------------------------------------------------
 */
            case Operador.SUMA:
                if( this.exp1.getTipo(controlador,ts) == tipo.ENTERO){
                    if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                        this.tipo = 0;
                        return valor_exp1 + valor_exp2;                        
                    }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){
                        this.tipo = 1;
                        return valor_exp1 + valor_exp2; 
                    }else if(this.exp2.getTipo(controlador,ts) == tipo.BOOLEANO){
                        let num = 1;
                        if(valor_exp2 == false){
                            num = 0;
                        }
                        this.tipo = 0;
                        return valor_exp1 + num;
                    }else if( this.exp2.getTipo(controlador,ts) == tipo.CARACTER){                       
                        let numascii = valor_exp2.charCodeAt(0);
                        this.tipo = 0;
                        return valor_exp1 + numascii;
                    }else if(this.exp2.getTipo(controlador,ts) == tipo.CADENA){
                        this.tipo = 4
                        return valor_exp1 + valor_exp2; //se convierte a cadena                        
                    }else{
                        let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden sumar por ser incompatibles.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden sumar por ser incompatibles.`+ "Linea: " +this.linea );
                        
                    }
                }else if( this.exp1.getTipo(controlador,ts) == tipo.DOBLE){
                    if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                        this.tipo = 1;
                        return valor_exp1 + valor_exp2;                        
                    }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){
                        this.tipo = 1;
                        return valor_exp1 + valor_exp2; 
                    }else if(this.exp2.getTipo(controlador,ts) == tipo.BOOLEANO){
                        let num = 1.0;
                        if(valor_exp2 == false){
                            num = 0.0;
                        }
                        this.tipo = 1;
                        return valor_exp1 + num;
                    }else if( this.exp2.getTipo(controlador,ts) == tipo.CARACTER){                       
                        let numascii = valor_exp2.charCodeAt(0);
                        this.tipo = 1;
                        return valor_exp1 + numascii;
                    }else if(this.exp2.getTipo(controlador,ts) == tipo.CADENA){
                        this.tipo = 4
                        return valor_exp1 + valor_exp2; //se convierte a cadena                        
                    }else{
                        let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden sumar por ser incompatibles.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden sumar por ser incompatibles.`+ "Linea: " +this.linea );
                    }
                }else if(this.exp1.getTipo(controlador,ts) == tipo.BOOLEANO){
                    if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                        let num = 1;
                        if(valor_exp1 == false){
                            num = 0;
                        }
                        this.tipo = 0;
                        return num + valor_exp2;
                    }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){
                        let num = 1.0;
                        if(valor_exp1 == false){
                            num = 0.0;
                        }
                        this.tipo = 1;
                        return num + valor_exp2;                    
                    }else if(this.exp2.getTipo(controlador,ts) == tipo.BOOLEANO){
                        let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden sumar por ser incompatibles.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden sumar por ser incompatibles.`+ "Linea: " +this.linea );
                        //TODO: agregar error semantico.
                    }else if(this.exp2.getTipo(controlador,ts) == tipo.CARACTER){
                        let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden sumar por ser incompatibles.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden sumar por ser incompatibles.`+ "Linea: " +this.linea );
                        //TODO: agregar error semantico.
                    }else if(this.exp2.getTipo(controlador,ts) == tipo.CADENA){                    
                        let variable:string = "true"
                        if(valor_exp1 == false){
                            variable = "false";
                        }
                        this.tipo = 4
                        return variable + valor_exp2
                    }else{
                        let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden sumar por ser incompatibles.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden sumar por ser incompatibles.`+ "Linea: " +this.linea );
                    }
                }else if( this.exp1.getTipo(controlador,ts) == tipo.CARACTER){
                    //if(valor_exp1.length == 1){
                    if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){                            
                        let numascii = valor_exp1.charCodeAt(0);                        
                        this.tipo = 0;
                        return numascii + valor_exp2;       
                    }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){                            
                        let numascii = valor_exp1.charCodeAt(0);
                        this.tipo = 1;
                        return numascii + valor_exp2;       

                    }else if((this.exp2.getTipo(controlador,ts) == tipo.CARACTER)||(this.exp2.getTipo(controlador,ts) == tipo.CADENA)){
                        
                        this.tipo = 4
                        return valor_exp1 + valor_exp2;
                       
                    }else{
                        let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden sumar por ser incompatibles.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden sumar por ser incompatibles.`+ "Linea: " +this.linea );
                    }
                                     
                }else if( this.exp1.getTipo(controlador,ts) == tipo.CADENA){
                    //}else{
                        if((this.exp2.getTipo(controlador,ts) == tipo.CARACTER)||(this.exp2.getTipo(controlador,ts) == tipo.CADENA)||(this.exp2.getTipo(controlador,ts) == tipo.ENTERO)||(this.exp2.getTipo(controlador,ts) == tipo.DOBLE)||(this.exp2.getTipo(controlador,ts) == tipo.BOOLEANO)){
                            //si es de tama??o 1 es un caracter
                            this.tipo = 4
                            return valor_exp1 + valor_exp2;                            
                        }else{
                            let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden sumar por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden sumar por ser incompatibles.`+ "Linea: " +this.linea );
                        }
                        //}   
                }                
                break;

/**
 * -------------RESTA----------------------------------------------------------------------------------------------
 */
            case Operador.RESTA:
                if( this.exp1.getTipo(controlador,ts) == tipo.ENTERO){
                    if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                        this.tipo = 0;
                        return valor_exp1 - valor_exp2;                        
                    }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){
                        this.tipo = 1;
                        return valor_exp1 - valor_exp2; 
                    }else if(this.exp2.getTipo(controlador,ts) == tipo.BOOLEANO){
                        let num = 1;
                        if(valor_exp2 == false){
                            num = 0;
                        }
                        this.tipo = 0;
                        return valor_exp1 - num;
                    }else if( this.exp2.getTipo(controlador,ts) == tipo.CARACTER){                       
                        let numascii = valor_exp2.charCodeAt(0);
                        this.tipo = 0;
                        return valor_exp1 - numascii;
                    }else{
                        let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden restar por ser incompatibles.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden restar por ser incompatibles.`+ "Linea: " +this.linea );
                    }
                }else if( this.exp1.getTipo(controlador,ts) == tipo.DOBLE){
                    if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                        this.tipo = 1;
                        return valor_exp1 - valor_exp2;                        
                    }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){
                        this.tipo = 1;
                        return valor_exp1 - valor_exp2; 
                    }else if(this.exp2.getTipo(controlador,ts) == tipo.BOOLEANO){
                        let num = 1.0;
                        if(valor_exp2 == false){
                            num = 0.0;
                        }
                        this.tipo = 1;
                        return valor_exp1 - num;
                    }else if( this.exp2.getTipo(controlador,ts) == tipo.CARACTER){                       
                        let numascii = valor_exp2.charCodeAt(0);
                        this.tipo = 1;
                        return valor_exp1 - numascii;
                    }else{
                        let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden restar por ser incompatibles.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden restar por ser incompatibles.`+ "Linea: " +this.linea );
                    }
                }else if(this.exp1.getTipo(controlador,ts) == tipo.BOOLEANO){
                    if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                        let num = 1;
                        if(valor_exp1 == false){
                            num = 0;
                        }
                        this.tipo = 0
                        return num - valor_exp2;
                    }else if((this.exp2.getTipo(controlador,ts) == tipo.DOBLE)){
                        let num = 1;
                        if(valor_exp1 == false){
                            num = 0;
                        }
                        this.tipo = 1
                        return num - valor_exp2;
                    }else{
                        let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden restar por ser incompatibles.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden restar por ser incompatibles.`+ "Linea: " +this.linea );
                    }
                }else if(this.exp1.getTipo(controlador,ts) == tipo.CARACTER){                    
                    if(this.exp1.getTipo(controlador,ts) == tipo.ENTERO){                        
                        let numascii = valor_exp1.charCodeAt(0);
                        this.tipo = 0
                        return numascii - valor_exp2;                            
                    }else if(this.exp1.getTipo(controlador,ts) == tipo.DOBLE){
                        let numascii = valor_exp1.charCodeAt(0);
                        this.tipo = 1
                        return numascii - valor_exp2;
                    }else{
                        let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden restar por ser incompatibles.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden restar por ser incompatibles.`+ "Linea: " +this.linea );
                    }
                                       
                }else{
                    let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden restar por ser incompatibles.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden restar por ser incompatibles.`+ "Linea: " +this.linea );
                }                
                break;
/**
 * -------------MULTIPLICACION----------------------------------------------------------------------------------------------
 */
                case Operador.MULTI:
                    if(this.exp1.getTipo(controlador,ts) == tipo.ENTERO){
                        if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                            this.tipo = 0
                            return valor_exp1 * valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){
                            this.tipo = 1
                            return valor_exp1 * valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.CARACTER){
                            let numascii = valor_exp2.charCodeAt(0);
                            this.tipo = 0
                            return valor_exp1 * valor_exp2;
                        }else {
                            let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`+ "Linea: " +this.linea ); 
                        }
                    }else if(this.exp1.getTipo(controlador,ts) == tipo.DOBLE){
                        if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                            this.tipo = 1
                            return valor_exp1 * valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){
                            this.tipo = 1
                            return valor_exp1 * valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.CARACTER){
                            let numascii = valor_exp2.charCodeAt(0);
                            this.tipo = 1
                            return valor_exp1 * valor_exp2;
                        }else {
                            let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`+ "Linea: " +this.linea );   
                        }
                    }else if(this.exp1.getTipo(controlador,ts) == tipo.CARACTER){                    
                        if(this.exp1.getTipo(controlador,ts) == tipo.ENTERO){                        
                            let numascii = valor_exp1.charCodeAt(0);
                            this.tipo = 0
                            return numascii * valor_exp2;                            
                        }else if(this.exp1.getTipo(controlador,ts) == tipo.DOBLE){
                            let numascii = valor_exp1.charCodeAt(0);
                            this.tipo = 1
                            return numascii * valor_exp2;
                        }else{
                            let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`+ "Linea: " +this.linea ); 
                        }                                           
                    }else{
                        let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`+ "Linea: " +this.linea ); 
                    } 
                    break;

/**
 * -------------MULTIPLICACION----------------------------------------------------------------------------------------------
 */
                case Operador.MULTI:
                    if(this.exp1.getTipo(controlador,ts) == tipo.ENTERO){
                        if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                            this.tipo = 0
                            return valor_exp1 * valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){
                            this.tipo = 1
                            return valor_exp1 * valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.CARACTER){
                            let numascii = valor_exp2.charCodeAt(0);
                            this.tipo = 0
                            return valor_exp1 * valor_exp2;
                        }else {
                            let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`+ "Linea: " +this.linea );  
                        }
                    }else if(this.exp1.getTipo(controlador,ts) == tipo.DOBLE){
                        if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                            this.tipo = 1
                            return valor_exp1 * valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){
                            this.tipo = 1
                            return valor_exp1 * valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.CARACTER){
                            let numascii = valor_exp2.charCodeAt(0);
                            this.tipo = 1
                            return valor_exp1 * valor_exp2;
                        }else {
                            let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`+ "Linea: " +this.linea );  
                        }
                    }else if(this.exp1.getTipo(controlador,ts) == tipo.CARACTER){                    
                        if(this.exp1.getTipo(controlador,ts) == tipo.ENTERO){                        
                            let numascii = valor_exp1.charCodeAt(0);
                            this.tipo = 0
                            return numascii * valor_exp2;                            
                        }else if(this.exp1.getTipo(controlador,ts) == tipo.DOBLE){
                            let numascii = valor_exp1.charCodeAt(0);
                            this.tipo = 1
                            return numascii * valor_exp2;
                        }else{
                            let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`+ "Linea: " +this.linea ); 
                        }                                           
                    }else{
                            let error = new Errores('Semantico', `Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`Los valores: ${valor_exp1} y ${valor_exp2}, no se pueden multiplicar por ser incompatibles.`+ "Linea: " +this.linea ); 
                    } 
                    break;

/**
 * -------------DIVICION----------------------------------------------------------------------------------------------
 */
                case Operador.DIV:
                    if(this.exp1.getTipo(controlador,ts) == tipo.ENTERO){
                        if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                            this.tipo = 1
                            return valor_exp1 / valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){
                            this.tipo = 1
                            return valor_exp1 / valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.CARACTER){
                            let numascii = valor_exp2.charCodeAt(0);
                            this.tipo = 1
                            return valor_exp1 / valor_exp2;
                        }else {
                            let error = new Errores('Semantico', `El valor: ${valor_exp1}, no se pueden dividir entre : ${valor_exp2}  por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`El valor: ${valor_exp1}, no se pueden dividir entre : ${valor_exp2}  por ser incompatibles.`+ "Linea: " +this.linea ); 
                        }
                    }else if(this.exp1.getTipo(controlador,ts) == tipo.DOBLE){
                        if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                            this.tipo = 1
                            return valor_exp1 / valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){
                            this.tipo = 1
                            return valor_exp1 / valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.CARACTER){
                            let numascii = valor_exp2.charCodeAt(0);
                            this.tipo = 1
                            return valor_exp1 / valor_exp2;
                        }else {
                            let error = new Errores('Semantico', `El valor: ${valor_exp1}, no se pueden dividir entre : ${valor_exp2}  por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`El valor: ${valor_exp1}, no se pueden dividir entre : ${valor_exp2}  por ser incompatibles.`+ "Linea: " +this.linea );   
                        }
                    }else if(this.exp1.getTipo(controlador,ts) == tipo.CARACTER){                    
                        if(this.exp1.getTipo(controlador,ts) == tipo.ENTERO){                        
                            let numascii = valor_exp1.charCodeAt(0);
                            this.tipo = 1
                            return numascii / valor_exp2;                            
                        }else if(this.exp1.getTipo(controlador,ts) == tipo.DOBLE){
                            let numascii = valor_exp1.charCodeAt(0);
                            this.tipo = 1
                            return numascii / valor_exp2;
                        }else{
                            let error = new Errores('Semantico', `El valor: ${valor_exp1}, no se pueden dividir entre : ${valor_exp2}  por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`El valor: ${valor_exp1}, no se pueden dividir entre : ${valor_exp2}  por ser incompatibles.`+ "Linea: " +this.linea );
                        }                                           
                    }else{
                        let error = new Errores('Semantico', `El valor: ${valor_exp1}, no se pueden dividir entre : ${valor_exp2}  por ser incompatibles.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`El valor: ${valor_exp1}, no se pueden dividir entre : ${valor_exp2}  por ser incompatibles.`+ "Linea: " +this.linea );
                    } 
                    break;

/**
 * -------------POTENCIA----------------------------------------------------------------------------------------------
 */
                case Operador.POTENCIA:
                    if(this.exp1.getTipo(controlador,ts) == tipo.ENTERO){
                        if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                            this.tipo = 0
                            return valor_exp1 ** valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){
                            this.tipo = 1
                            return valor_exp1 ** valor_exp2;
                        }else {
                            let error = new Errores('Semantico', `El valor: ${valor_exp1}, no se pueden elevar a : ${valor_exp2}  por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`El valor: ${valor_exp1}, no se pueden elevar a : ${valor_exp2}  por ser incompatibles.`+ "Linea: " +this.linea );  
                        }
                    }else if(this.exp1.getTipo(controlador,ts) == tipo.DOBLE){
                        if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                            this.tipo = 1
                            return valor_exp1 ** valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){
                            this.tipo = 1
                            return valor_exp1 ** valor_exp2;
                        }else {
                            let error = new Errores('Semantico', `El valor: ${valor_exp1}, no se pueden elevar a : ${valor_exp2}  por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`El valor: ${valor_exp1}, no se pueden elevar a : ${valor_exp2}  por ser incompatibles.`+ "Linea: " +this.linea );  
                        }
                    }else{
                        let error = new Errores('Semantico', `El valor: ${valor_exp1}, no se pueden elevar a : ${valor_exp2}  por ser incompatibles.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`El valor: ${valor_exp1}, no se pueden elevar a : ${valor_exp2}  por ser incompatibles.`+ "Linea: " +this.linea ); 
                    } 
                    break;

/**
 * -------------MODULO----------------------------------------------------------------------------------------------
 */
                case Operador.MODULO:
                    if(this.exp1.getTipo(controlador,ts) == tipo.ENTERO){
                        if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                            this.tipo = 1
                            return valor_exp1 % valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){
                            this.tipo = 1
                            return valor_exp1 % valor_exp2;
                        }else {
                            let error = new Errores('Semantico', `El valor: ${valor_exp1}, no se pueden dividir  entre : ${valor_exp2} para obtener el residuo por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`El valor: ${valor_exp1}, no se pueden dividir  entre : ${valor_exp2} para obtener el residuo por ser incompatibles.`+ "Linea: " +this.linea );   
                        }
                    }else if(this.exp1.getTipo(controlador,ts) == tipo.DOBLE){
                        if(this.exp2.getTipo(controlador,ts) == tipo.ENTERO){
                            this.tipo = 1
                            return valor_exp1 % valor_exp2;
                        }else if(this.exp2.getTipo(controlador,ts) == tipo.DOBLE){
                            this.tipo = 1
                            return valor_exp1 % valor_exp2;
                        }else {
                            let error = new Errores('Semantico', `El valor: ${valor_exp1}, no se pueden dividir  entre : ${valor_exp2} para obtener el residuo por ser incompatibles.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(`El valor: ${valor_exp1}, no se pueden dividir  entre : ${valor_exp2} para obtener el residuo por ser incompatibles.`+ "Linea: " +this.linea );  
                        }
                    }else{
                        let error = new Errores('Semantico', `El valor: ${valor_exp1}, no se pueden dividir  entre : ${valor_exp2} para obtener el residuo por ser incompatibles.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(`El valor: ${valor_exp1}, no se pueden dividir  entre : ${valor_exp2} para obtener el residuo por ser incompatibles.`+ "Linea: " +this.linea );
                    } 
                    break;

            case Operador.UNARIO:
                if(this.exp1.getTipo(controlador,ts) == tipo.ENTERO){
                    this.tipo = 0
                    return -valor_expU;
                }else if(this.exp1.getTipo(controlador,ts) == tipo.DOBLE){
                    this.tipo = 1
                    return -valor_expU;
                }else{
                    let error = new Errores('Semantico', `El valor: ${valor_expU}, no se pueden negar, ya que no es ni entero ni doble`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`El valor: ${valor_expU}, no se pueden negar, ya que no es ni entero ni doble`+ "Linea: " +this.linea );
                }
                break;


            //TODO: Agregar otros casos de aritmeticas (POTENCIA, MODULO)
            default:
                let error = new Errores('Semantico', `Error severo al operar Aritmeticamente, simbolos no reconocidos`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`Error severo al operar Aritmeticamente, simbolos no reconocidos`+ "Linea: " +this.linea );
                break;
        }

    }
    recorrer(): Nodo {
        let padre = new Nodo("Exp","");

        if(this.expU){
            padre.AddHijo(new Nodo(this.op,""));
            padre.AddHijo(this.exp1.recorrer());
        }else{
            padre.AddHijo(this.exp1.recorrer());
            padre.AddHijo(new Nodo(this.op,""));
            padre.AddHijo(this.exp2.recorrer());
        }
        
       return padre;
        
    }
    
}