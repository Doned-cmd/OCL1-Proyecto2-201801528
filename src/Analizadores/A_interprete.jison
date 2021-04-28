
/* Ejemplo clase 7. */

/* Definicion lexica */
%lex
%options case-insensitive
%option yylineno

/* Expresiones regulares */
num     [0-9]+
id      [a-zñA-ZÑ_][a-zñA-ZÑ0-9_]*
//--> Cadena
escapechar  [\'\"\\ntr]
escape      \\{escapechar}
aceptacion  [^\"\\]+
cadena      (\"({escape} | {aceptacion})*\")

//--> Caracter
escapechar2  [\\ntr]
escape2      \\{escapechar2}
aceptada2    [^\'\\]
caracter     (\'({escape2}|{aceptada2})\')

%%

/* Comentarios */
"//".*              {/* Ignoro los comentarios simples */}
"/*"((\*+[^/*])|([^*]))*\**"*/"     {/*Ignorar comentarios con multiples lneas*/}  


/* Simbolos del programa */

"++"                    { console.log("INCRE : "+ yytext); return 'INCRE'}
"--"                    { console.log("DECRE : "+ yytext); return 'DECRE'}
"("                    { console.log("PARA : "+ yytext); return 'PARA'}
")"                    { console.log("PARC : "+ yytext); return 'PARC'}
"["                    { console.log("CORA : "+ yytext); return 'CORA'}
"]"                    { console.log("CORC : "+ yytext); return 'CORC'}

";"                    { console.log("PYC : "+ yytext); return 'PYC'}
","                    { console.log("COMA : "+ yytext); return 'COMA'}
"!="                    { console.log("NOTIGUAL : "+ yytext); return 'NOTIGUAL'}
"=="                    { console.log("IGUALIGUAL : "+ yytext); return 'IGUALIGUAL'}
"="                    { console.log("IGUAL : "+ yytext); return 'IGUAL'}
"?"                    { console.log("INTERROGACION : "+ yytext); return 'INTERROGACION'}
":"                    { console.log("DSPNTS : "+ yytext); return 'DSPNTS'}
"{"                    { console.log("LLAVA : "+ yytext); return 'LLAVA'}
"}"                    { console.log("LLAVC : "+ yytext); return 'LLAVC'}

/* Operadores Aritmeticos */
"+"                    { console.log("MAS : "+ yytext); return 'MAS'}
"-"                   { console.log("MENOS : "+ yytext); return 'MENOS'}
"*"                   { console.log("MULTI : "+ yytext); return 'MULTI'}
"/"                   { console.log("DIV : "+ yytext); return 'DIV'}

/* Operadores Relacionales */
"<="                   { console.log("MENORIGUAL : "+ yytext); return 'MENORIGUAL'}
"<"                    { console.log("MENORQUE : "+ yytext); return 'MENORQUE'}
">="                   { console.log("MAYORIGUAL : "+ yytext); return 'MAYORIGUAL'}
">"                   { console.log("MAYORQUE : "+ yytext); return 'MAYORQUE'}

/* Operadores Logicos */
"&&"                    { console.log("AND : "+ yytext); return 'AND'}
"||"                    { console.log("OR : "+ yytext); return 'OR'}
"!"                   { console.log("NOT : "+ yytext); return 'NOT'}

/* Palabras reservadas */
"evaluar"               { console.log("EVALUAR : "+ yytext); return 'EVALUAR'}
"true"               { console.log("TRUE : "+ yytext); return 'TRUE'}
"false"               { console.log("FALSE : "+ yytext); return 'FALSE'}
"int"               { console.log("INT : "+ yytext); return 'INT'}
"double"               { console.log("DOUBLE : "+ yytext); return 'DOUBLE'}
"string"               { console.log("STRING : "+ yytext); return 'STRING'}
"char"               { console.log("CHAR : "+ yytext); return 'CHAR'}
"boolean"               { console.log("BOOLEAN : "+ yytext); return 'BOOLEAN'}
"print"               { console.log("PRINT : "+ yytext); return 'PRINT'}
"if"               { console.log("IF : "+ yytext); return 'IF'}
"do"               { console.log("DO : "+ yytext); return 'DO'}
"while"               { console.log("WHILE : "+ yytext); return 'WHILE'}
"for"               { console.log("FOR_CIC : "+ yytext); return 'FOR_CIC'}
"else"               { console.log("ELSE : "+ yytext); return 'ELSE'}
"void"               { console.log("VOID : "+ yytext); return 'VOID'}
"exec"               { console.log("EJECUTAR : "+ yytext); return 'EJECUTAR'}
"break"               { console.log("BREAK : "+ yytext); return 'BREAK'}
"return"               { console.log("RETURN : "+ yytext); return 'RETURN'}

/* SIMBOLOS ER */
[0-9]+("."[0-9]+)?\b        { console.log("DECIMAL : "+ yytext); return 'DECIMAL'}
{num}                    { console.log("ENTERO : "+ yytext); return 'ENTERO'}
{id}                    { console.log("ID : "+ yytext); return 'ID'}
{cadena}                    { console.log("CADENA : "+ yytext); return 'CADENA'}
{caracter}                    { console.log("CHARVAR : "+ yytext); return 'CHARVAR'}

/* Espacios */
[\s\r\n\t]                  {/* skip whitespace */}


<<EOF>>               return 'EOF'

/* Errores lexicos */
.                     { console.log("Error Lexico "+yytext
                        +" linea "+yylineno
                        +" columna "+(yylloc.last_column+1));

                        new errores.default('Lexico', 'El caracter ' + yytext 
                                + ' no forma parte del lenguaje', 
                                yylineno+1, 
                                yylloc.last_column+1); 
                                      
                        }

/lex

/* Area de imports */
%{
    const evaluar = require('../Clases/Evaluar');
    const aritmetica = require('../Clases/Expresiones/Operaciones/Aritmetica');
    const logica = require('../Clases/Expresiones/Operaciones/Logica');
    const relacional = require('../Clases/Expresiones/Operaciones/Relacional');
    const primitivo = require('../Clases/Expresiones/Primitivo');


    const ast = require('../Clases/Ast/Ast');
    const declaracion = require('../Clases/Instrucciones/Declaracion');
    const asignacion = require('../Clases/Instrucciones/Asignacion');
    const asignacionTardia = require('../Clases/Instrucciones/AsignacionTardia');
    const simbolo = require('../Clases/TablaSimbolos/Simbolos');
    const tipo = require('../Clases/TablaSimbolos/Tipo');

    const identificador = require('../Clases/Expresiones/Identificador');
    const ternario = require('../Clases/Expresiones/Ternario');

    const Print = require('../Clases/Instrucciones/Print');
    const Ifs = require('../Clases/Instrucciones/SentenciaControl/Ifs');
    const While = require('../Clases/Instrucciones/SentenciaCiclica/While');
    const DoWhile = require('../Clases/Instrucciones/SentenciaCiclica/DoWhile');
    const For = require('../Clases/Instrucciones/SentenciaCiclica/For');

    const funcion = require('../Clases/Instrucciones/Funcion');
    const llamada = require('../Clases/Instrucciones/Llamada');

    const ejecutar = require('../Clases/Instrucciones/Ejecutar');

    const detener = require('../Clases/Instrucciones/SentenciaTransferencia/Break');
    const errores = require('../Clases/Ast/Errores');

%}

/* Precedencia de operadores de mayor a menor */

%right 'INTERROGACION'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'MENORQUE' 'MAYORQUE' 'IGUALIGUAL' 'MAYORIGUAL' 'NOTIGUAL' 'MENORIGUAL'
%left 'MAS' 'MENOS'
%left 'MULTI' 'DIV'
%right 'UNARIO'


%start inicio

%% /* Gramatica */


inicio
    : instrucciones EOF { console.log($1); $$= new ast.default($1);  return $$; }
    ;

instrucciones : instrucciones instruccion   { $$ = $1; $$.push($2); }
            | instruccion                   {$$= new Array(); $$.push($1); }
            ;

instruccion : declaracion   { $$ = $1; }
            | asignacion    { $$ = $1; }
            | print         { $$ = $1; }
            | sent_if       { $$ = $1; }
            | sent_while    { $$ = $1; } 
            | sent_doWhile  { $$ = $1; } 
            | sent_for      { $$ = $1; }
            | funciones     { $$ = $1; }
            | llamada PYC   { $$ = $1; }
            | EJECUTAR llamada PYC { $$ = new ejecutar.default($2, @1.first_line, @1.last_column); }
            | BREAK PYC     { $$ = new detener.default(); }
            | RETURN e PYC     { $$ = new detener.default(); }
            | error         { console.log("Error Sintactico" + yytext 
                                    + "linea: " + this._$.first_line 
                                    + "columna: " + this._$.first_column); 
                        
                                new errores.default("Lexico", "No se esperaba el caracter "+ yytext , 
                                                this._$.first_line ,this._$.first_column);            
                            }
 
            ;

declaracion : tipo lista_simbolos PYC   { $$ = new declaracion.default($1, $2, @1.first_line, @1.last_column); }
            ; 

tipo : INT      { $$ = new tipo.default('ENTERO'); }
    | DOUBLE    { $$ = new tipo.default('DOBLE'); }
    | STRING    { $$ = new tipo.default('STRING'); }
    | CHAR      { $$ = new tipo.default('CARACTER'); }
    | BOOLEAN   { $$ = new tipo.default('BOOLEAN'); }
    ;
/**
    lista de simbolos
    p1, p2 =90, p3 =190
    p1 
    p2 = 19
**/
lista_simbolos : lista_simbolos COMA ID         { $$ = $1; $$.push(new simbolo.default(1,null,$3, null)); }
            | lista_simbolos COMA ID IGUAL e    { $$ = $1; $$.push(new simbolo.default(1,null,$3, $5)); }
            | ID                                { $$ = new Array(); $$.push(new simbolo.default(1,null,$1, null)); }
            | ID IGUAL e                        { $$ = new Array(); $$.push(new simbolo.default(1,null,$1, $3)); }
            ;

asignacion : ID IGUAL e PYC   { $$ = new asignacion.default($1,$3, @1.first_line, @1.last_column); }
            | ID incremento PYC           { $$ = new asignacionTardia.default($1,$2, @1.first_line, @1.last_column); }
            ; 

asignacionFor : ID IGUAL e    { $$ = new asignacion.default($1,$3, @1.first_line, @1.last_column); }
            |  devolverIncremento           { $$ = $1; }
            ; 

devolverIncremento : ID incremento            { $$ = new asignacionTardia.default($1,$2, @1.first_line, @1.last_column); }
            ;

sent_if : IF PARA e PARC LLAVA instrucciones LLAVC                                  { $$ = new Ifs.default($3, $6, [], @1.first_line, @1.last_column); }
        | IF PARA e PARC LLAVA instrucciones LLAVC ELSE LLAVA instrucciones LLAVC   { $$ = new Ifs.default($3, $6, $10, @1.first_line, @1.last_column); }
        | IF PARA e PARC LLAVA instrucciones LLAVC ELSE sent_if                     { $$ = new Ifs.default($3, $6, [$9], @1.first_line, @1.last_column); }
        ;
 
sent_while : WHILE PARA e PARC LLAVA instrucciones LLAVC { $$ = new While.default($3, $6, @1.first_line, @1.last_column); }
            ; 

sent_doWhile : DO LLAVA instrucciones LLAVC WHILE PARA e PARC PYC { $$ = new DoWhile.default($7, $3, @1.first_line, @1.last_column); }
            ; 

sent_for :  FOR_CIC PARA declaracion e PYC asignacionFor  PARC LLAVA instrucciones LLAVC  { $$ = new For.default($3, $4, $6, $9,false, @1.first_line, @1.last_column); }
            |FOR_CIC PARA asignacion e PYC  asignacionFor  PARC LLAVA instrucciones LLAVC { $$ = new For.default($3, $4, $6, $9,true, @1.first_line, @1.last_column); }
            ;

print : PRINT PARA e PARC PYC                       {$$ = new Print.default($3, true,@1.first_line, @1.last_column); }
        | PRINT PARA devolverIncremento PARC PYC    {$$ = new Print.default($3, false,@1.first_line, @1.last_column); }
        ; 

funciones : VOID ID PARA PARC LLAVA instrucciones LLAVC     { $$ = new funcion.default(3, new tipo.default('VOID'), $2, [], true, $6, @1.first_line, @1.last_column ); }
        | VOID ID PARA lista_parametros PARC LLAVA instrucciones LLAVC  { $$ = new funcion.default(3, new tipo.default('VOID'), $2, $4, true, $7, @1.first_line, @1.last_column ); }
        ;

lista_parametros : lista_parametros COMA tipo ID    { $$ = $1; $$.push(new simbolo.default(6,$3, $4, null)); }
                | tipo ID                           { $$ = new Array(); $$.push(new simbolo.default(6,$1,$2, null)); }
                ;

llamada : ID PARA PARC              { $$ = new llamada.default($1, [],@1.first_line, @1.last_column ); }
        | ID PARA lista_exp PARC    { $$ = new llamada.default($1, $3 ,@1.first_line, @1.last_column ); }
        ;

lista_exp : lista_exp COMA e        { $$ = $1; $$.push($3); }
        | e                         { $$ = new Array(); $$.push($1); }
        ;

e :   e MAS e             {$$ = new aritmetica.default($1, '+', $3, $1.first_line, $1.last_column, false);}
    | e MENOS e         {$$ = new aritmetica.default($1, '-', $3, $1.first_line, $1.last_column, false);}
    | e MULTI e         {$$ = new aritmetica.default($1, '*', $3, $1.first_line, $1.last_column, false);}
    | e DIV e           {$$ = new aritmetica.default($1, '/', $3, $1.first_line, $1.last_column, false);}
    | e AND e           {$$ = new logica.default($1, '&&', $3, $1.first_line, $1.last_column, false);}
    | e OR e           {$$ = new logica.default($1, '&&', $3, $1.first_line, $1.last_column, false);}
    | NOT e             {$$ = new logica.default($2, '!', null, $1.first_line, $1.last_column, true);}
    | e MAYORQUE e      {$$ = new relacional.default($1, '>', $3, $1.first_line, $1.last_column, false);}
    | e MENORIGUAL e      {$$ = new relacional.default($1, '<=', $3, $1.first_line, $1.last_column, false);}
    | e MAYORIGUAL e      {$$ = new relacional.default($1, '>=', $3, $1.first_line, $1.last_column, false);}
    | e MENORQUE e      {$$ = new relacional.default($1, '<', $3, $1.first_line, $1.last_column, false);}
    | e IGUALIGUAL e      {$$ = new relacional.default($1, '==', $3, $1.first_line, $1.last_column, false);}
    | e NOTIGUAL e      {$$ = new relacional.default($1, '!=', $3, $1.first_line, $1.last_column, false);}
    | MENOS e %prec UNARIO {$$ = new aritmetica.default($2, 'UNARIO', null, $1.first_line, $1.last_column, true);}
    | PARA e PARC       {$$ = $2;}
    | DECIMAL           {$$ = new primitivo.default(Number(yytext), $1.first_line, $1.last_column);}
    | ENTERO            {$$ = new primitivo.default(Number(yytext), $1.first_line, $1.last_column);}
    | CADENA            {$1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, $1.first_line, $1.last_column);}
    | CHARVAR           {$1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, $1.first_line, $1.last_column);}
    | TRUE              {$$ = new primitivo.default(true, $1.first_line, $1.last_column);}
    | FALSE             {$$ = new primitivo.default(false, $1.first_line, $1.last_column);}
    | ID                {$$ = new identificador.default($1, @1.first_line, @1.last_column); }
    | e INTERROGACION e DSPNTS e {$$ = new ternario.default($1, $3, $5, @1.first_line, @1.last_column); } 
    //| INCRE          {$$ = new aritmetica.default(new primitivo.default(1, $1.first_line, $1.last_column), $1.first_line, $1.last_column, false), '+', new primitivo.default(1, $1.first_line, $1.last_column), $1.first_line, $1.last_column, false);}
    //| DECRE          {$$ = new aritmetica.default(new primitivo.default(1, $1.first_line, $1.last_column), $1.first_line, $1.last_column, false), '-', new primitivo.default(1, $1.first_line, $1.last_column), $1.first_line, $1.last_column, false);}
    //| incremento        {$$ = $1}
    ;

incremento:  INCRE          {$$ = new aritmetica.default(new primitivo.default(0, $1.first_line, $1.last_column),  '+', new primitivo.default(1, $1.first_line, $1.last_column), $1.first_line, $1.last_column, false);}
            | DECRE          {$$ = new aritmetica.default(new primitivo.default(0, $1.first_line, $1.last_column), '-', new primitivo.default(1, $1.first_line, $1.last_column), $1.first_line, $1.last_column, false);}
    ;



//--> La siguiente produccion solo sirvio para fines de ejemplo en la clase 8
//instruccion_clase8 : EVALUAR CORA e CORC PYC { $$ = new evaluar.default($3); }
 //           ;