<?php
//Vamos a crear las instrucciones de código para grabar datos en
//la tabla persona.

//Vamos a inovicar las cabeceras para dar permisos
//de ejecución a los llamados de la API desde cualquier

//Aplicación.
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE,OPTIONS');
header('Access-Control-Max-Age: 1000');

header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

//Ahora vamos a crear el método actualizar para modificar todos loscampos.
include '../../Connection/ParametrosDB.php';

//Vamos a abrir la conexión.
$conn = new mysqli($HostName,  $HostUser, $HostPass, $DatabaseName);

//Ahora validemos si la conexión es correcta o no.
$json = file_get_contents('php://input');

////Decodificando los datos formato JSON en la variable $obj
$obj = json_decode($json, true);

//Vamos a crear las variables para enviar los datos de los campos de la
//tabla de la siguiente manera:
$id = $obj['id'];
$nif = $obj['nif'];
$nombre = $obj['nombre'];
$apellido1 = $obj['apellido1'];
$apellido2 = $obj['apellido2'];
$ciudad = $obj['ciudad'];
$direccion = $obj['direccion'];
$telefono = $obj['telefono'];
$fecha_nacimiento = $obj['fecha_nacimiento'];
$sexo = $obj['sexo'];
$tipo = $obj['tipo'];


//Ahora agreguemos la instrucción SQL para actualizar
$SQL = "UPDATE persona SET nif = '$nif', nombre = '$nombre', apellido1 = '$apellido1', apellido2 = '$apellido2', ciudad = '$ciudad', direccion = '$direccion', telefono = '$telefono', fecha_nacimiento = '$fecha_nacimiento', sexo = '$sexo', tipo = '$tipo' WHERE id = $id";

//Ahora vamos a ejecutar la instrucción SQL anterior
if(mysqli_query($conn, $SQL))
{
$Mensaje = "ACTUALIZADO";
$json = json_encode($Mensaje);
echo $json;
}
else
{
echo "ERROR";
}
//Cerremos la conexión
mysqli_close($conn);
?>