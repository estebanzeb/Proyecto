<?php
//Vamos a inovicar las cabeceras para dar permisos
//de ejecución a los llamados de la API desde cualquier
//Aplicación.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE,OPTIONS');
header('Access-Control-Max-Age: 1000');

header('Access-Control-Allow-Headers: Origin,Content-Type, X-Auth-Token,Authorization');

//Ahora vamos a crear el método actualizar para modificar todos loscampos.
include '../../Connection/ParametrosDB.php';

//Vamos a abrir la conexión.
$conn = new mysqli($HostName,  $HostUser, $HostPass, $DatabaseName);

if ($conn->connect_error){

    die("La conexion no se pudo realizar: " .$conn->connect_error);

    }else{
            
        $json = file_get_contents('php://input');
        $obj = json_decode($json,true);

        //$id= $obj['id'];
        $nombre = $obj['nombre'];
        $creditos = $obj['creditos'];
        $tipo = $obj['tipo'];
        $curso = $obj['curso'];
        $cuatrimestre = $obj['cuatrimestre'];
        $id_profesor = $obj['id_profesor'];
        $id_grado = $obj['id_grado'];

        // Instrucción SQL para agregar el estudiante.
        $SQL="INSERT INTO asignatura (nombre, creditos, tipo, curso, cuatrimestre, id_profesor, id_grado) VALUES ('$nombre', '$creditos', '$tipo', '$curso', '$cuatrimestre', '$id_profesor', '$id_grado')";
            
        //Ahora vamos a ejecutar la instruccion SQL anterior
        if(mysqli_query($conn,$SQL)){

            $Mensaje = "GRABADO";
            //$Mensaje = "La persona fue registrada correctamente";
            $json = json_encode($Mensaje);
            echo $json;
        }else{
            echo ("Error");
        }
    }
    mysqli_close($conn);
?>
