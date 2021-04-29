import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
//import ValorDevuelto from "../Expresiones/ValorDevuelto";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class Print implements Instruccion{

    public expresion : Expresion;
    public instruccion : Instruccion;
    public NoEsAsignacion :boolean;
    public linea : number;
    public columna : number;

    constructor(expresion ,NoEsAsignacion,linea, columna) {
        if (NoEsAsignacion){
            this.expresion =expresion;
        }else{
            this.instruccion = expresion;
        }
        this.NoEsAsignacion=NoEsAsignacion;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(controlador: Controlador, ts: TablaSimbolos): string {
        return "Print"
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        //TODO: verificar que el tipo del valor sea primitivo 
        
        //let valor = this.expresion.getTipo(controlador,ts);
            
            if (this.NoEsAsignacion){
                console.log("imprimiendo valor primitivo")
                
                let valor2 = this.expresion.getValor(controlador,ts);
                
                
                let valor_tipo = this.expresion.getTipo(controlador,ts);
                //console.log(valor_tipo)
                if ( valor_tipo === tipo.CADENA || valor_tipo === tipo.BOOLEANO ||  valor_tipo === tipo.ENTERO ||  valor_tipo === tipo.DOBLE ||  valor_tipo === tipo.CARACTER){   
                    console.log("imprimiendo: ")
                    console.log(valor2)                                    
                    controlador.append(valor2); 
                }else{
                
                    let error = new Errores('Semantico', `Error al imprimir, los datos no son de tipo valido. `, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(`Error al imprimir, los datos no son de tipo valido. `+ "Linea: " +this.linea );
                    return null;
                    console.log("Error al imprimir datos")
                    //let realizada = this.instruccion.ejecutar(controlador,ts)
                    //controlador.append(realizada);                
                }
                
            }
        
        return null;
    }

    recorrer(): Nodo {
        let padre = new Nodo("Print",""); 
        padre.AddHijo(new Nodo("print",""));
        padre.AddHijo(new Nodo("(",""));

        let hijo = new Nodo("exp","");
        hijo.AddHijo(this.expresion.recorrer());
        
        padre.AddHijo(hijo);
        padre.AddHijo(new Nodo(")",""));
        
       return padre;
    }


}