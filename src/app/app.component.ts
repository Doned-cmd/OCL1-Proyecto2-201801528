import { Component } from '@angular/core';
import Controlador from 'src/Clases/Controlador';
import Evaluar from 'src/Clases/Evaluar';
import { TablaSimbolos } from 'src/Clases/TablaSimbolos/TablaSimbolos';

import * as analizador from '../Clases/Analizar'

import {graphviz} from "d3-graphviz"
import {wasmFolder} from "@hpcc-js/wasm"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  MostrarErrores : boolean = false;
  MostrarTablaSimbolos :boolean = true;
  MostrarAst : boolean = false
  //entrada : string = "";
  entrada : string = ""
  consola : string = "";
  


  recorrer(pageName): void{
    let ana = new analizador.Analizador();

    this.consola = "";
    if(this.entrada != ""){
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
  



      console.log("Vamos a graficar");
      //ana.ejecutar(this.entrada)
      let nodo_ast = ana.recorrer(this.entrada);

      let grafo = nodo_ast.GraficarSintactico();  //Aqui tenemos la cadena de graphviz para graficar
      //let element = document.createElement('a');
      //element.setAttribute('href')
      wasmFolder('/assets/@hpcc-js/wasm/dist/')
      graphviz('#graph').renderDot(grafo)
      //this.consola =  grafo
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

    

    //if(this.MostrarTablaSimbolos){

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
    //}

    //this.MostrarTablaSimbolos = !this.MostrarTablaSimbolos
    //this.MostrarErrores = false;

  }



  GenerarReporteErrores(pageName){
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
      document.getElementById("tablasErrores").innerHTML = ejecutar.errores;
    }
  }

  CargarArchivo(event : any){
      let files = event.target.files;
    
      var lector = new FileReader();
      lector.readAsText(files[0]);
      lector.onload = () => {
      let texto:any = lector.result;
      if(texto){
        this.entrada = texto;
      }
    }
  }


  GuardarArchivo(){

    if(this.entrada != ""){
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.entrada));
      element.setAttribute('download', "Code.ty");
    
      element.style.display = 'none';
      document.body.appendChild(element);
    
      element.click();
    
      document.body.removeChild(element);
    }
  }

  
  
} 