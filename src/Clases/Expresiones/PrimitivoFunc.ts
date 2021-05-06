import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class  PrimitivoFunc implements Expresion{

    public selector: number;
    public valor : Expresion; 
    public tipo : tipo; 
    
    public linea : number;
    public columna : number;

    /**
     * @constructor creamos un nuevo primitivo
     * @param primitivo hace referencia a los valores enteros, dobles, cadenas, caracteres, booleanos
     * @param linea idica la linea donde se encuentra
     * @param columna indica la columna donde se encuentra
     */
    constructor(selector:number ,valor : any ,linea: number, columna : number) {
        this.selector = selector        
        this.columna = columna;
        this.linea = linea;
        this.valor = valor;
    }

    getTipo(controlador: Controlador, ts: TablaSimbolos) :tipo {
        //let valor = this.getValor(controlador, ts);

        //if(typeof valor === 'number'){   
        //    return tipo.DOBLE;
        //}else if(typeof valor === 'string'){
        //    if (valor.length == 1){
        //        return tipo.CARACTER
        //    }else{
        //        return tipo.CADENA;
        //    }        
        //}else if(typeof valor === 'boolean'){
        //    return tipo.BOOLEANO;
        //}
        //if(this.selector == 0 || this.selector  == 1){
        //    return this.valor.getTipo(controlador,ts)
       // }
       return this.tipo
    }

    /**
     * @returns retorna el valor exacto del primitivo 
     */
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let valorloc = this.valor.getValor(controlador,ts)
        let tipoloc = this.valor.getTipo(controlador,ts)
        if (this.selector == 0){//tolower
            if (typeof valorloc === 'string'){
                this.tipo = tipo.CADENA
                return valorloc.toLowerCase()
            }else{
                let error = new Errores('Semantico', `El tipo de la expresion a convertir es invalido `, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`El tipo de la expresion a convertir es invalido `+ "Linea: " +this.linea );
                return null;
            }
        }else if (this.selector == 1){//toupper
            if (typeof valorloc === 'string'){
                this.tipo = tipo.CADENA
                return valorloc.toUpperCase()
            }else{
                let error = new Errores('Semantico', `El tipo de la expresion a convertir es invalido `, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`El tipo de la expresion a convertir es invalido `+ "Linea: " +this.linea );
                return null;
            }
        }else if(this.selector == 2){//(int)
            if (typeof valorloc === 'number'){
                this.tipo = tipo.ENTERO
                return Math.trunc(valorloc)
            }else if(typeof valorloc === 'string'){
                if (tipoloc == tipo.CARACTER ){
                    this.tipo = tipo.ENTERO
                    return valorloc.charCodeAt(0)
                }else{
                    let error = new Errores('Semantico', `El tipo de la expresion a convertir es invalido `, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`El tipo de la expresion a convertir es invalido `+ "Linea: " +this.linea );
                    return null;
                }
            }
            else{
                let error = new Errores('Semantico', `El tipo de la expresion a convertir es invalido `, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`El tipo de la expresion a convertir es invalido `+ "Linea: " +this.linea );
                return null;
            }
        }else if (this.selector == 3){//(double)
            if (typeof valorloc === 'number'){
                this.tipo = tipo.DOBLE
                return valorloc
            }else if(typeof valorloc === 'string'){
                if (tipoloc == tipo.CARACTER ){
                    this.tipo = tipo.DOBLE
                    return valorloc.charCodeAt(0)
                }else{
                    let error = new Errores('Semantico', `El tipo de la expresion a convertir es invalido `, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`El tipo de la expresion a convertir es invalido `+ "Linea: " +this.linea );
                    return null;
                }
            }
            else{
                let error = new Errores('Semantico', `El tipo de la expresion a convertir es invalido `, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`El tipo de la expresion a convertir es invalido `+ "Linea: " +this.linea );
                return null;
            }
        }else if (this.selector == 4){//(string)
            if (typeof valorloc === 'number'){
                this.tipo = tipo.CADENA
                return valorloc+""
            }else{
                let error = new Errores('Semantico', `El tipo de la expresion a convertir es invalido `, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`El tipo de la expresion a convertir es invalido `+ "Linea: " +this.linea );
                return null;
            }
        }else if (this.selector == 5){//(char)
            if (typeof valorloc === 'number'){
                if (tipoloc == tipo.ENTERO ){
                    this.tipo = tipo.CARACTER
                    return String.fromCharCode(valorloc)
                }else{
                    let error = new Errores('Semantico', `El tipo de la expresion a convertir es invalido `, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`El tipo de la expresion a convertir es invalido `+ "Linea: " +this.linea );
                    return null;
                }
            }else{
                let error = new Errores('Semantico', `El tipo de la expresion a convertir es invalido `, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`El tipo de la expresion a convertir es invalido `+ "Linea: " +this.linea );
                return null;
            }
        }else if (this.selector == 6){//LENGHT¨
            let validolenght:boolean  = false
            let validolenghtnotvec:boolean  = false
            this.tipo = tipo.ENTERO
            if (tipoloc == tipo.BOOLEANOVEC){
                validolenght = true
            }else if(tipoloc== tipo.CADENAVEC){
                validolenght = true
            }else if(tipoloc== tipo.CARACTERVEC){
                validolenght = true
            }else if(tipoloc == tipo.DOBLEVEC){
                validolenght = true
            }else if(tipoloc == tipo.ENTEROVEC){
                validolenght = true
            }else if (tipoloc == tipo.CADENA){
                validolenghtnotvec = true
            }

            if (validolenght){
                let valorvector = Array<any>()
                valorvector = valorloc
                return valorvector.length
            }else if(validolenghtnotvec){
                if (typeof valorloc == 'string'){
                    return valorloc.length
                }else{
                    let error = new Errores('Semantico', `El tipo de la variable o cadena a obtener longitud es invalido.  `, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`El tipo de la variable o cadena a obtener longitud es invalido.  `+ "Linea: " +this.linea );
                    return null;
                }
            }else{
                let error = new Errores('Semantico', `El tipo de la variable o cadena a obtener longitud es invalido.  `, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`El tipo de la variable o cadena a obtener longitud es invalido.  `+ "Linea: " +this.linea );
                return null;
            }
            
        }else if (this.selector == 7){//TRUNCATE¨
            if (typeof valorloc === 'number'){
                this.tipo = tipo.ENTERO
                return Math.trunc(valorloc)
            }else{
                let error = new Errores('Semantico', `El tipo de la expresion a convertir es invalido `, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`El tipo de la expresion a convertir es invalido `+ "Linea: " +this.linea );
                return null;
            }
        }else if (this.selector == 8){//ROUND¨
            this.tipo = tipo.ENTERO
            if (typeof valorloc === 'number'){
                this.tipo = tipo.ENTERO
                return Math.round(valorloc);
            }else{
                let error = new Errores('Semantico', `El tipo de la expresion a convertir es invalido `, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(`El tipo de la expresion a convertir es invalido `+ "Linea: " +this.linea );
                return null;
            }
            
        }else if (this.selector == 9){//TYPEOF¨
            this.tipo = tipo.CADENA
            if (tipoloc == tipo.BOOLEANOVEC){
                return "VectorBoolean"
            }else if(tipoloc== tipo.CADENAVEC){
                return "VectorString"
            }else if(tipoloc== tipo.CARACTERVEC){
                return "VectorChar"
            }else if(tipoloc == tipo.DOBLEVEC){
                return "VectorDouble"
            }else if(tipoloc == tipo.ENTEROVEC){
                return "VectorInt"
            }else if(tipoloc == tipo.BOOLEANO){
                return "boolean"
            }else if(tipoloc == tipo.CADENA){
                return "string"
            }else if(tipoloc == tipo.CARACTER){
                return "char"
            }else if(tipoloc == tipo.DOBLE){
                return "double"
            }else if(tipoloc == tipo.ENTERO){
                return "int"
            }
        }else if (this.selector == 10){//TOSTRING
            this.tipo = tipo.CADENA
            if(tipoloc == tipo.BOOLEANO){
                if(valorloc == true){
                    return "true"
                }   
                return "false"
            }else{
                return valorloc + ""
            }
        }
    }


    convert(num) {
        return num
            .toString()    // convert number to string
            .split('')     // convert string to array of characters
            .map(Number)   // parse characters as numbers
            .map(n => (n || 10) + 64)   // convert to char code, correcting for J
            .map(c => String.fromCharCode(c))   // convert char codes to strings
            .join('');     // join values together
    }

    recorrer(): Nodo {
       let padre = new Nodo("Primitivo funcion","");
        padre.AddHijo(new Nodo(this.valor.toString(),""));

       return padre;
    }

}