import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
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
                let valor = this.expresion.getTipo(controlador,ts);
                console.log(valor)
                if ( valor === tipo.CADENA || valor === tipo.BOOLEANO ||  valor === tipo.ENTERO ||  valor === tipo.DOBLE ||  valor === tipo.CARACTER){   
                    //console.log(valor)
                    let valor2 = this.expresion.getValor(controlador,ts);                 
                    controlador.append(valor2);
                    }
                
            }else{
                let realizada = this.instruccion.ejecutar(controlador,ts)
                controlador.append(realizada);                
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