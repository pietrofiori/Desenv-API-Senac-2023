function ler(){
    var http = new XMLHttpRequest();

    http.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            var conteudo = "<table border = '1'>";
            conteudo += "<tr>";
            conteudo += "<th> ID</th>";
            conteudo += "<th> Nome</th>";
            conteudo += "<th> Preço</th>";
            conteudo += "</tr>";

            // console.log(this.responseText)

            var obj = JSON.parse(this.responseText);
            var produtos = obj.produtos;

            produtos.forEach(function(prod){
                conteudo += "<tr>";
                conteudo += "<td>" + prod.id + "</td>";
                conteudo += "<td>" + prod.nome + "</td>";
                conteudo += "<td>" + prod.preço + "</td>";
                conteudo += "</tr>";
            });
            conteudo += "</table>";
            document.getElementById("divProdutos").innerHTML = conteudo;
        }
    }

    http.open("GET","servidor.php?listar",true)
    http.send();
}





