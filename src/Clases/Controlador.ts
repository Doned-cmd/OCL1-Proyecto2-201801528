import Errores from "./Ast/Errores";
import Simbolos from "./TablaSimbolos/Simbolos";
import { TablaSimbolos } from "./TablaSimbolos/TablaSimbolos";
import { TablaSimbolosGraf } from "./TablaSimbolos/TablaSimbolosGraf";

/**
 * @class Clase que nos permitira llevar el control de todo el programa. 
 */
export default class Controlador{

    public errores : Array<Errores>;
    public consola : string;
    public ListaTablaSimbolos : Array<TablaSimbolosGraf>

    constructor() {
        this.ListaTablaSimbolos = new Array<TablaSimbolosGraf>();
        this.errores = new Array<Errores>();
        this.consola = "";
    }

    public append(consola : string){
        this.consola += consola + '\n';
    }



    /**
     * @function graficar_ts funcion para graficar la tabla de simbolos
     * @param controlador lleva el control del programa
     * @param ts accede a la tabla de simbolos
     * @returns retorna el cuerpo de la tabla de simbolos de html
     */
    graficar_ts(controlador:Controlador):string{
        var cuerpohtml = "<thead class=\"black white-text\"><tr><td colspan=\"6\">Tabla de Simbolos </td></tr><tr><th>Rol</th><th>Nombre</th><th>Tipo</th><th>Ambito</th><th>Valor</th><th>Parametros</th></tr></thead>";
        let contador: number = 0;
        //while(ts != null){
        for (let ts of this.ListaTablaSimbolos){
            for(let sim of ts.TablaSimbolos.tabla.values()){
                console.log(`simbolo`);
                
                cuerpohtml += "<tr mdbTableCol class=\"grey lighten-1 black-text\"><th scope=\"row\">" +  this.getRol(sim) + "</th><td>" + sim.identificador + 
                "</td><td>" + this.getTipo(sim) +"</td>"  + 
                "</td><td>" + ts.Ambito + 
                "</td><td>" + this.getValor(sim) + 
                "</td><td>" + this.parametros(sim) +"</td>" +  "</tr>";
            }
        }
            
          //  ts = ts.ant;
        //}
        
        
        return cuerpohtml;
    }

    
    agregarTabla(ts:TablaSimbolos, ambito:string){
        this.ListaTablaSimbolos.push(new TablaSimbolosGraf(ts, ambito));
    }


    graficar_er(){
        var cuerpohtml = "<thead class=\"black white-text\"><tr><td colspan=\"6\">Tabla de Errores </td></tr><tr><th>#</th><th>Tipo De Error</th><th>Descripcion</th><th>Linea</th><th>Columna</th></tr></thead>";
        let numero: number = 0
        for(let sim of this.errores){

            
                console.log(`simbolo`);
                
                cuerpohtml += "<tr mdbTableCol class=\"grey lighten-1 black-text\">"+
                "<td>" +  numero + "</td><th scope=\"row\">" + sim.tipo + 
                "</th><td>" + sim.descripcion +
                "</td><td>" + sim.linea +                 
                "</td><td>" + sim.columna +"</td>" +  "</tr>";
            
            
            numero++;
            
        }
        
        
        return cuerpohtml;
    }

    /**
     * @function getValor obtiene el valor del simbolo de la tabla
     * @param sim simbolo de la tabla
     * @returns retorna el valor del simbolo
     */
    getValor(sim:Simbolos):string{
        if(sim.valor != null){
            return sim.valor.toString(); 
        }else{
            return '...';
        }
    }

    /**
     * @function getTipo obtiene el tipo del simbolo de la tabla
     * @param sim  simbolo de la tabla
     * @returns retorna el tipo del simbolo
     */
    getTipo(sim):string{

        return sim.tipo.stype.toLowerCase();
    }

    /**
     * @function getTipo obtiene el rol del simbolo de la tabla
     * @param sim  simbolo de la tabla
     * @returns retorna el rol del simbolo
     */
    getRol(sim:Simbolos):string{
        let rol : string = '';
        switch(sim.simbolo){
            case 1:
                rol = "variable"
                break
            case 2:
                rol = "funcion";
                break;
            case 3:
                rol = "metodo";
                break;
             case 4:
                rol = "vector";
                break
             case 5:
                rol = "lista";
                break;
            case 6:
                rol = "parametro"
                break;
            
        }
        return rol;
    }

     /**
     * @function getTipo Le indicamos el ambito del simbolo 
     * @returns retorna el ambito del simbolo
     */
    getAmbito():string{
        return 'global'
    }

     /**
     * @function getTipo obtiene la cantidad de parametros del simbolo de la tabla
     * @param sim  simbolo de la tabla
     * @returns retorna la cantidad de parametros del simbolo si es que tiene
     */
    parametros(sim){
        if(sim.lista_params != undefined){
            return sim.lista_params.length
        }else{
            return "...";
        }
    }

}