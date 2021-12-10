import React from 'react';
import {Text, View, StyleSheet, Alert, TextInput, TouchableOpacity,FlatList} from 'react-native';

export default class Departamento extends React.Component{
  constructor(props){
    
    super(props)

    //Ahora definimos las varibales para la tabla persona de la Base de Datos de matriculagruposabado
    this.state = {
      TextInput_id:'',
      TextInput_nombre:'',
      dataSource:[]
    }  
  }
  cleanInputs(){
    this.setState({
      TextInput_id :'',
      TextInput_nombre :'',
    })

  }  
  
  ListarTodas  = () =>  {
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Departamento/ListarTodosLosDepartamentos.php')
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        dataSource:responseJson
      })
    })
  }

  componentDidMount  = () =>  {
    /*fetch('http://localhost:8080/apireactnativeacademic/ShowAllStudentsList.php')
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        dataSource:responseJson
      })
    })*/
    this.ListarTodas();
  }
//-----------------------------------------------------------------------------------
  //Ahora creamos las funciones de esta clase
  Insertar = () => {
    //Ahora vamos a consumir al API: APIMatriculasSabado
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Departamento/InsertarDepartamento.php',{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          //id: this.state.TextInput_id,
          nombre: this.state.TextInput_nombre,
        }
      )
    }).then((response) => response.json())

      .then((responseJson) =>{

      alert('El resgistro ha sido guardado: ' +responseJson);
      this.cleanInputs() 
    }).catch((error) => {

      console.error(error);

    });

  } 
//-----------------------------------------------------------------------------------
  Actualizar = () => {
    //Ahora vamos a codificar la funcion actualizar para consumir la Api
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Departamento/ActualizarDepartamento.php',{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id: this.state.TextInput_id,
          nombre: this.state.TextInput_nombre,
          
      })
    }).then((response) => response.json())

      .then((responseJson) =>{

        alert('El resgistro ha sido actualizado: ' + responseJson);
        this.cleanInputs() 
      }).catch((error) => {

        console.error(error);

      });
  }
//-----------------------------------------------------------------------------------
  Borrar = () => {
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Departamento/EliminarDepartamento.php',{
      method:'DELETE',
      headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          id: this.state.TextInput_id
        }
      )
    }).then((response) => response.json())

      .then((responseJson) =>{

      alert('El resgistro ha sido borrado: ' +responseJson);
      this.cleanInputs() 
    }).catch((error) => {

      console.error(error);

    });
  }
//-----------------------------------------------------------------------------------
  Listar = () => {
      fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Departamento/BuscarDepartamento.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          id: this.state.TextInput_id,
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            TextInput_id: responseJson[0]['id'],
            TextInput_nombre: responseJson[0]['nombre'],
          })
        }).catch((error) => {
          alert('No se encuentra el Id');
          this.cleanInputs()
        });
    }
//-----------------------------------------------------------------------------------
render(){
  return (
  <View style={MisEstilos.MainContainer}>

    <text style={{fontSize: 20, textAlign: 'center', marginBottom: 7,}}>
      Registro de departamentos</text>

      <TextInput
      placeholder="Ingrese el id del grado"
      onChangeText={TextInputValue => this.setState({
        TextInput_id: TextInputValue
      })}//Se captura el dato
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_id}
      autoFocus={true}
    ></TextInput>

    
    <TextInput
      placeholder="Ingrese el nombre del grado"
      onChangeText={TextInputValue => this.setState({
        TextInput_nombre: TextInputValue
      })}//Se captura el dato
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_nombre}
      autoFocus={true}
    ></TextInput>
    <View style={MisEstilos.MainContainerTouchableOpacityStyle}>
      <TouchableOpacity activeOpacity={0.4} style={MisEstilos.TouchableOpacityStyle} onPress={this.Insertar}>
        <Text style={MisEstilos.TextStyle}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.4} style={MisEstilos.TouchableOpacityStyle} onPress={this.Actualizar}>
        <Text style={MisEstilos.TextStyle}>Actualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.4} style={MisEstilos.TouchableOpacityStyle} onPress={this.Borrar}>
        <Text style={MisEstilos.TextStyle}>Borrar</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.4} style={MisEstilos.TouchableOpacityStyle} onPress={this.Listar}>
        <Text style={MisEstilos.TextStyle}>Buscar</Text>
      </TouchableOpacity>
    </View>  

      <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 
          <TouchableOpacity onPress={() => alert(item.id)}
          style={MisEstilos.TouchableOpacityStyle2}>
            <Text>                {item.nombre}               </Text>
          </TouchableOpacity>
        }
      />

      </View>
    );
  }
}
//-----------------------------------------------------------------------------------
const MisEstilos = StyleSheet.create({
  MainContainer:{
    alignItems: 'center',
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff'
    
  },
  TextInputStyleClass:{
    textAlign: 'center',
    width: '50%',
    marginTop:7,
    height: 40,
    borderWidth: 1,
    borderColor: '#ff5722',
    borderRadius: 5,
    
  },
  MainContainerTouchableOpacityStyle:{
    justifyContent: 'center',
    paddingTop: 20,
    flexWrap:1,
    flexDirection:'row',
  },
  TouchableOpacityStyle:{
    paddingTop:10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom:10,
    width:'90%',
    backgroundColor: '#08BCD4'
  },
  TouchableOpacityStyle2:{
    paddingTop:10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom:18,
    width:'90%',
    backgroundColor: '#08BCD4'
  },
  TextStyle:{
    color:'fff',
    textAlign: 'center',
  },
  rowViewContainer:{
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  }
});