<?php
//Vamos a crear las instruciones de codigó para grabar

//Vamos a invocar las cabeceras para dar permisos de ejecucíon a los llamados de la API desde cualquier Aplicación
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

//Ahora vamos a crear el metodo consultar para listar todos los registros

//Ahora vamos a crear el método consultar para listas todos los registros.
include '../../Connection/ParametrosDB.php';

//Ahora abramos ls¿a conexión
$conn = new mysqli($HostName,  $HostUser, $HostPass, $DatabaseName);

if ($conn->connect_error){

    die("La conexion no se pudo realizar: " .$conn->connect_error);

    }else{
            
        $json = file_get_contents('php://input');
        $obj = json_decode($json,true);

        //var_dump ($json);
        $id_profesor = $obj['id_profesor'];
        $id_departamento  = $obj['id_departamento'];

        // Instrucción SQL para agregar el estudiante.
        $SQL="UPDATE profesor SET id_departamento ='$id_departamento' WHERE id_profesor= $id_profesor";
        
        //echo ("$SQL");     
        //Ahora vamos a ejecutar la instruccion SQL anterior
        if(mysqli_query($conn,$SQL)){

            $Mensaje = "Actualizado";
            //$Mensaje = "La persona fue registrada correctamente";
            $json = json_encode($Mensaje);
            echo $json;
        }else{
            echo ("Error");
        }
    }
    mysqli_close($conn);
?>

