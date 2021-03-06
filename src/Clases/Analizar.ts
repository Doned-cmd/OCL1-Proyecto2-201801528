import * as sintactico from '../Analizadores/gramatica'

import * as sintactico_interprete from '../Analizadores/A_interprete'
import Controlador from './Controlador';
import { TablaSimbolos } from './TablaSimbolos/TablaSimbolos';
import Nodo from './Ast/Nodo';
import { TablaSimbolosGraf } from './TablaSimbolos/TablaSimbolosGraf';



/**
 * @class Esta clase manda a analizar la entrada 
 */
export class Analizador{

    public recorrer(input):Nodo{

        try {
            let ast = sintactico_interprete.parse(input);
            
            let controlado = new Controlador();
            let ts_global = new TablaSimbolos(null);
            ast.ejecutar(controlado, ts_global);
            
            let nodo_ast = ast.recorrer();

            return nodo_ast;
            
        } catch (error) {
            console.log("Error al devolver la raiz del arbol")
        }
    }

    public ejecutar(input):any{
        //console.log("vamos a analizar la entrada");

        //try {
            //let salida = sintactico.parse(input);
            let ast = sintactico_interprete.parse(input);
            let controlado = new Controlador();
            let ts_global = new TablaSimbolos(null);

            ast.ejecutar(controlado, ts_global);

            controlado.ListaTablaSimbolos.push(new TablaSimbolosGraf(ts_global,"global"));
            let ts_html = controlado.graficar_ts(controlado);

            let Errores_html = controlado.graficar_er()

            let retorno = { "errores" : Errores_html, "ts" : ts_html, "consola" : controlado.consola}
            return retorno;
        //} catch (error) {
        //    console.log("Ocurrio un error al analizar la entrada");
        //    return "Ocurrio un error al analizar"
        //}
    }

}