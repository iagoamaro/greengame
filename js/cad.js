$('#jogar').click(function(){
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
              console.log(r);
              if (r[0] == "OK") {
                sessionStorage.setItem('idjogador', r[1]);
                sessionStorage.setItem('jnome', $('#Nome').val());
                window.location.href="jogo.html";


              }
              else
              {
                window,location.href="#";
                alert("Erro Servidor: "+ retorno);
              }
            }
          });
}