/**
 * @enum de Tipo nos permite enumerar los tipos del lenguaje
 */

export enum tipo{
    ENTERO,
    DOBLE,
    BOOLEANO,
    CARACTER,
    CADENA, 
    VOID,
    ENTEROVEC,
    DOBLEVEC,
    BOOLEANOVEC,
    CARACTERVEC,
    CADENAVEC
}

/**
 * @class Esta clase sirve para llevar el control de los tipos de los simbolos del lenguaje
 */
export default class Tipo{
    
    public type : tipo; 
    public stype : string;

    constructor(stype : string) {
        this.stype = stype;
        this.type = this.getTipo(stype);
    }

    // TODO: Hacer metodo getTipo
    getTipo(stype: string): tipo{
        if(stype == 'DOBLE'){
            return tipo.DOBLE;
        }else if(stype == 'ENTERO'){
            return tipo.ENTERO;
        }else if(stype == 'STRING'){
            return tipo.CADENA;
        }else if(stype == 'BOOLEAN'){
            return tipo.BOOLEANO;
        }else if(stype == 'VOID'){
            return tipo.VOID;
        }else if(stype == 'CARACTER'){
            return tipo.CARACTER;
        }
        else if(stype == 'DOBLEVEC'){
            return tipo.DOBLEVEC;
        }else if(stype == 'ENTEROVEC'){
            return tipo.ENTEROVEC;
        }else if(stype == 'STRINGVEC'){
            return tipo.CADENAVEC;
        }else if(stype == 'BOOLEANVEC'){
            return tipo.BOOLEANOVEC;
        }else if(stype == 'CARACTERVEC'){
            return tipo.CARACTERVEC;
        }
    }

    getStype():string {
        return this.stype;
    }
}