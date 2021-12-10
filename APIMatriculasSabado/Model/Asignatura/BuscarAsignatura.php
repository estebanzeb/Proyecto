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

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$id = $obj['id'];

//Ahora validemos si la conexión es correcta o no.
if ($conn->connect_error)
{
die("La conexión no se pudo realizar: ".$conn->connect_error);
}
else
{
//Ahora vamos a construir la consulta.
$SQL = "SELECT * FROM asignatura WHERE id = '$id'"; //Preparar la consulta
$result = $conn->query($SQL); //Ejecutar la consulta
//Vamos a verificar si devuelve datos o no.
if ($result->num_rows > 0)
{
//Con los registros encontrados los llevamos
//a un vector
while ($row[] = $result->fetch_assoc())
{
$item =$row;
//Ahora vamos a convertir este registro a
//JSON

$json = json_encode($item);

}
}
else
{
echo "No hay registros para mostrar";
}
echo $json;
$conn->close();
}
?>