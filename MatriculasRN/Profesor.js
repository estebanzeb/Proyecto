import React from 'react';
import {Text, View, StyleSheet, Alert, TextInput, TouchableOpacity, FlatList} from 'react-native';

export default class Profesor extends React.Component{
  constructor(props){
    
    super(props)

    //Ahora definimos las varibales para la tabla persona de la Base de Datos de matriculagruposabado
    this.state = {
      TextInput_id_profesor :'',
      TextInput_id_departamento :'',
      dataSource:[]
    }  
  }

  cleanInputs(){
    this.setState({
      TextInput_id_profesor :'',
      TextInput_id_departamento :'',
    })

  }  
  
  ListarTodas  = () =>  {
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Profesor/ListarTodosLosProfesores.php')
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
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Profesor/InsertarProfesor.php',{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          id_profesor: this.state.TextInput_id_profesor,
          id_departamento: this.state.TextInput_id_departamento,
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
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Profesor/ActualizarProfesor.php',{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_profesor: this.state.TextInput_id_profesor,
        id_departamento: this.state.TextInput_id_departamento,
      })
    }).then((response) => response.json())

      .then((responseJson) =>{

        alert('El resgistro ha sido actualizado: ' + responseJson);
        this.cleanInputs()  
      }).catch((error) => {

        console.error(error);

      });
  }
//-----
//-----------------------------------------------------------------------------------
  Borrar = () => {
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Profesor/EliminarProfesor.php',{
      method:'DELETE',
      headers:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        {
          id_profesor: this.state.TextInput_id_profesor,
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
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Profesor/BuscarProfesor.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        id_profesor: this.state.TextInput_id_profesor,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          TextInput_id_profesor: responseJson[0]['id_profesor'],
          TextInput_id_departamento: responseJson[0]['id_departamento'],
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
      Registro de profesor</text>

      <TextInput
      placeholder="Ingrese el id del profesor"
      onChangeText={TextInputValue =>{
        
        if ( /^\d+$/.test(TextInputValue))
        {
          this.setState({
            TextInput_id_profesor: TextInputValue
          });

        }else{
          this.setState({
            TextInput_id_profesor: ''
          });
        }
      }
    }
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_id_profesor}
      autoFocus={true}
    ></TextInput>

    
    <TextInput
      placeholder="Ingrese el id del departamento"
      onChangeText={TextInputValue =>{
        
        if ( /^\d+$/.test(TextInputValue))
        {
          this.setState({
            TextInput_id_departamento: TextInputValue
          });

        }else{
          this.setState({
            TextInput_id_departamento: ''
          });
        }
      }
    }
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_id_departamento}
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
          <TouchableOpacity onPress={() => alert(item.id_profesor +" "+item.id_departamento)}
          style={MisEstilos.TouchableOpacityStyle2}>
            <Text>                {item.id_profesor}              </Text>
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