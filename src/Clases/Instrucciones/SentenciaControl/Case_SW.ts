import Nodo from "src/Clases/Ast/Nodo";
import Controlador from "src/Clases/Controlador";
import { Expresion } from "src/Clases/Interfaces/Expresion";
import { Instruccion } from "src/Clases/Interfaces/Instruccion";
import { TablaSimbolos } from "src/Clases/TablaSimbolos/TablaSimbolos";
import { tipo } from "src/Clases/TablaSimbolos/Tipo";
import Detener from "../SentenciaTransferencia/Break";


export default class Case_SW implements Instruccion{

    public condicion : Expresion;
    public lista_instrucciones : Array<Instruccion>;     
    public linea : number;
    public columna : number;

    constructor(condicion, lista_instrucciones, linea, columna) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.columna = columna;
        this.linea = linea;
    }
    getTipo(controlador: Controlador, ts: TablaSimbolos) {
        return this.condicion.getValor(controlador, ts)
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let ts_local = new TablaSimbolos(ts);
        controlador.agregarTabla(ts_local);
        for(let ins of this.lista_instrucciones){
            let res = ins.ejecutar(controlador,ts_local);

            if(ins instanceof Detener || res instanceof Detener  ){
                return res;
            }

        }
        return null;
    }
    recorrer(): Nodo {
        let padre = new Nodo("Case","");
        padre.AddHijo(new Nodo("case",""))

        let hijoCondicion = new Nodo("expresion","")
        hijoCondicion.AddHijo(this.condicion.recorrer())
        padre.AddHijo(hijoCondicion)

        padre.AddHijo(new Nodo( ":",""))

        
        
        let HijoInstruccion = new Nodo("Instrucciones","")
        for(let ins of this.lista_instrucciones){
            HijoInstruccion.AddHijo(ins.recorrer())
            
        }
        padre.AddHijo(HijoInstruccion)

        padre.AddHijo(new Nodo("break",""))  
        
        return padre    
    }


}