<?php 

header("Content-type: application/json");

$user = "root";
$password = "";
$db = "loja";
$local = "localhost";

$conn = mysqli_connect($local,$user,$password,$db);

if($conn){
    if(isset($_REQUEST['listar'])){
        $query = "SELECT * FROM produto ORDER BY nome";
        $result = mysqli_query($conn,$query);
        $array = array();
        while ($linha = mysqli_fetch_assoc($result)){
            $array[] = $linha;
        }
        echo "{'produtos': ".json_encode($array).'}';
    }
    if(isset($_REQUEST['cadastrar'])){
        $nome = $_GET["nome"];
        $preco = $_GET["preco"];

        $query = "INSERT INTO produto (nome,preco) VALUES ('$nome',$preco)";
         mysqli_query($conn,$query);
         $result = mysqli_insert_id($conn);
         if($result > 0 ){
            echo"{resposta : 'ok', 'id' : $result }"; 
            
         }else{
            '<script>  alert("ERRO") </script>';
         }
    }

    mysqli_close($conn);
}

















?>