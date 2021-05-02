import { Component } from '@angular/core';
import Controlador from 'src/Clases/Controlador';
import Evaluar from 'src/Clases/Evaluar';
import { TablaSimbolos } from 'src/Clases/TablaSimbolos/TablaSimbolos';

import * as analizador from '../Clases/Analizar'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  MostrarErrores : boolean = false;
  MostrarTablaSimbolos :boolean = true;
  //entrada : string = "";
  entrada : string = ""
  consola : string = "";

  recorrer(): void{
    let ana = new analizador.Analizador();

    if(this.entrada != ""){
      console.log("Vamos a graficar");
      let nodo_ast = ana.recorrer(this.entrada);

      let grafo = nodo_ast.GraficarSintactico();  //Aqui tenemos la cadena de graphviz para graficar

    }
  }

  ejecutar():void{
    let analice = new analizador.Analizador();
    this.consola = "";

    if(this.entrada != ""){
      let ejecutar = analice.ejecutar(this.entrada);

      this.consola = ejecutar.consola;
      //document.getElementById("tablasimbols").innerHTML = ejecutar.ts;
    }
    /**
     * Inicializamos la tabla de simbolos y controlador 
     * En este espacio solo nos sirve de ejemplo en la clase 8
     
    let ts = new TablaSimbolos(null);
    let cont = new Controlador();

    if(this.entrada != ""){
      let arreglo : Array<Evaluar> = ana.ejecutar(this.entrada);

      for(let num of arreglo){
        this.consola += "El valor de la expresion es: " + num.resultado.getValor(cont,ts) + '\n';
      }
    }
    */
  }

  
  GenerarReporteTabla(pageName) {
    // Hide all elements with class="tabcontent" by default */

    //this.MostrarTablaSimbolos = !this.MostrarTablaSimbolos
    this.MostrarErrores = false;

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
  
    document.getElementById(pageName).style.display = "block";

    let analice = new analizador.Analizador();
    this.consola = "";

    if(this.entrada != ""){
      let ejecutar = analice.ejecutar(this.entrada);

      //this.consola = ejecutar.consola;
      document.getElementById("tablasimbols").innerHTML = ejecutar.ts;
    }

    
    
  }


  GenerarReporteAST(){
    let analice = new analizador.Analizador();
    this.consola = "";
  
    if(this.entrada != ""){
      let ejecutar = analice.recorrer(this.entrada);
  
      this.consola = ejecutar.GraficarSintactico();
      
    }
  }

  GenerarReporteErrores(){


    this.MostrarErrores = !this.MostrarErrores
    this.MostrarTablaSimbolos = false;
  }
  
} 