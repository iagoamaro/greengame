$(document).ready(function(){
  carregarpalavras();




});
$('jogar').click(function(){
      cadastrarjogador();
});
function cadastrarjogador(){
  $.ajax({
            type: "POST",
            url: "http://localhost:1262/api/jogador/inserir",
            dataType: "json",
            async: false,
            data: {"codigo":0,"nome": $('#Nome').val(),"idade": $('#Idade').val()},
            success: function (retorno) {
              var r = retorno.valid.split("|");
              if (r == "OK") {
                window.location.href="#jogar";

              }
              else
              {
                alert("Erro Servidor: "+ retorno);
              }
            }
          });
}

  //  BIBLIOTECA DE PALAVRAS  
  var palavras = [];
  var pergunta = [];
  var pontucao = 0;
  var iresp;
  var ird;
  // Variaveis GLOBAIS
  var  k;
  var dj  = document.getElementById('jg');
  var erro = 1;
  var d = "<pre><font class=gameover>";
  var iconte ;
  var ki ;
  var p = new Array();


function carregarpalavras() {

    $(function () {
        
        $.getJSON("http://localhost:1262/api/pergunta/listagem", function (j) {
           
            for (var i = 0; i < j.length; i++) {
                        
                       pergunta[i] = j[i].pergunta;
                       palavras[i] = j[i].resposta;
                       console.log(palavras[i]);

                       
                     }    
                     max = j.length + 1;
                     //palavras.splice(iresp, ird);
                     iconte = Math.floor(Math.random() * palavras.length);
                     ki = new Array(palavras[iconte].length); 
                     $('#pergunta').html(pergunta[iconte]);
                     
                     for(k=0;k<palavras[iconte].length;k++){

                          ki[k]="__";
                      }
                       var djc = "<table cellpadding=2 class=tbletras ";
                           djc = djc + "cellspacing=4 border=0 width=390 ";
                           djc = djc + " height=40  style='border: ";
                           djc = djc + " 1px solid #666666;'><tr>";
                           
                        for(k = 0; k < palavras[iconte].length; k++){
                              p[k] = k;
                              djc = djc + "<td style='border: 0px solid #000000;' ";
                              djc = djc + "align=center ";
                              djc = djc + " valign=middle class=visao> __ </td>";
                        }
                            djc = djc + "</tr></table><br>";
                            dj.innerHTML = djc;
                            
        });
        

    });
}

/*
-------------------
      VERIFICA ERRO
	  quando essa funcao eh chamada,
	  significa que o usuario chutou
	  uma letra que nao existe na 
	  palavra sorteada;  
 
*/
function verificaerro(){
   var m = document.getElementById('g');
   switch (erro){
    case 0:
        break
    case 1:
        d = d + "       O   \n"
        break
    case 2:
        d = d + "    -"
        break
    case 3:
        d = d + " | "
        break
    case 4:
        d = d + "-\n"
        break
    case 5:
        d = d + "     /"
        break
    case 6:
        d = d + " \\ \n"
        break
    default:
    var tecladaosome = document.getElementById('tecladao');
        tecladaosome.style.display = 'none';
        
        d = "<img src='gover.gif'><br><br>";
        d = d + "<font class=gameover><b>GAME OVER</b></font><br>";
        d = d + "<font class=gameover><blink>Jogador: "+sessionStorage.getItem('jnome').toUpperCase();" </blink><font/> "
        d = d + "<font class=gameover><blink>Pontuação: <span id='pts'>"+pontucao+"<span/></blink><font/>"
        d = d + "<font class=gameover> Palavra: <blink> " + palavras[iconte].toUpperCase() +"</blink></font>";
        d = d + "<br>";
        d = d + "<div class='input-group'><span class='input-group-btn'><button class='btn btn-default' type='button'><a href=# onclick='window.location.reload( false );' ";
        d = d + "class=gameover>Novo Jogo</a></button></span>";
        d = d + "<span class='input-group-btn'><button class='btn btn-default' type='button'><a href=index.html  onclick='cadranking();' class=gameover>Desistir</a></button></span></div><!-- /input-group -->";
       
		
  }
     // passar resultados de erro;
	// criar boneco para a forca;  
        m.innerHTML = d;
        erro++;		
}
//função que grava a pontuaçao no banco via ajax
function cadranking(){
  $.ajax({
            type: "POST",
            url: "http://localhost:1262/api/ranking/inserir",
            dataType: "json",
            async: false,
            data: {"id": 0, "idJogador": sessionStorage.getItem('idjogador'), "pontucao": pontucao, "nomeJogador": ""},
            success:function(reortno){
              console.log(reortno);
              
            }
          });
}
/*
-------------------
      JOGAR -
	  inicia uma jogada.
	  quando o usuario clica em uma das
	  letras, esses dados sao  passados
	  por essa funcao que verifica se 
	  existe a letra na palavra sorteada; 
*/

function jogar(letra){

   $("#"+letra).attr("disabled","disabled");
   document.getElementById(letra).style.color = '#FF0000';
   var nome = palavras[iconte].toUpperCase();
       nome.split("");
   var erroSim = 0;
   var coleta = "";

   for(k = 0; k < palavras[iconte].length; k++){
      
		if(nome[k] == letra){

         ki[k] = letra;
    }
    if(ki[k] != "__"){

         coleta =  coleta + ki[k];
    }
       
    }
     if(coleta.match(letra) == letra){

        //  ENCONTROU
      } 
      else {
        erroSim = 1;
      }
      var ik;
      var t;
      t = "<table cellpadding=2 cellspacing=4 ";
      t = t + " border=0 width=390 height=40 ";
      t = t + " style='border: ";
      t = t + " 1px solid #666666;'><tr>";
	  
     for(ik = 0; ik < palavras[iconte].length; ik++){
	     t = t + "<td  ";
         t = t + "  ";
         t = t + " align=center valign=middle ";
         t = t + " class=visao>"+ ki[ik] +"</td>";
     }
	 
     if(erroSim == 1){            
        verificaerro();
        erroSim = 0;
      }
   	   t = t + "</tr></table><br>";
  	   dj.innerHTML = t;
	   
     if(coleta == palavras[iconte].toUpperCase()){
          alert("Parabéns você acertou a resposta: '"+palavras[iconte]+"', aperte 'OK' para ir a proxima pergunta!");
          pontucao++;
          erro = 1;
          iresp = iconte;
          ird = 1;
          d = "<pre><font class=gameover>";
          var nb = document.getElementById('g');
          nb.innerHTML = d;
          for (var i = 65; i < 91; i++) {
            $("#"+String.fromCharCode(i)).prop("disabled",false);
            //$("#"+String.fromCharCode(i)).css('color : #000000');
            document.getElementById(String.fromCharCode(i)).style.color = '#000000';
          }
          carregarpalavras();
          
					}			   
						  
     }
   


	document.write("<table id=tecladao cellpadding=3 cellspacing=6 border=1 width=390 height=90 ");
	document.write(" style='border: 1px solid #666666;'><tr style='border: 1px #000000;'> <form name=f action=# onsubmit='return false;'>");
var linha=0;
for(i=65; i < 91; i++){
    if(linha == 8) {
       linha=0;
       document.write("</tr><tr style='border: 1px #000000;'>");
    }
    document.write("<td align=center valign=middle width=15  style='border: 1px solid #000000;' ");
    document.write(" onmouseover=style.backgroundColor='#ecf0f1;' > ");
    document.write("<input type='submit' id='"+ String.fromCharCode(i)+"' name='" + String.fromCharCode(i)+"'  onclick=\"jogar('" + String.fromCharCode(i));
    document.write("'); \" class=teclado value=" + String.fromCharCode(i) + " ></td>");
    linha++;
}
    document.write("</tr></form></table>");
   
