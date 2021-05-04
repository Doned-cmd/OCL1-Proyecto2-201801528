import { TablaSimbolos } from "./TablaSimbolos";


export class TablaSimbolosGraf {
    public TablaSimbolos : TablaSimbolos
    public Ambito : string

    constructor(ts, tipo){
        this.TablaSimbolos = ts
        this.Ambito = tipo
    }
}