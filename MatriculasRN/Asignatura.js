import React from 'react';
import {Text, View, StyleSheet, Alert, TextInput, TouchableOpacity,FlatList} from 'react-native';

export default class Asignatura extends React.Component{
  constructor(props){
    
    super(props)

    //Ahora definimos las varibales para la tabla persona de la Base de Datos de matriculagruposabado
    this.state = {
      TextInput_id:'',
      TextInput_nombre:'',
      TextInput_creditos:'',
      TextInput_tipo:'',
      TextInput_curso:'',
      TextInput_cuatrimestre:'',
      TextInput_id_profesor:'',
      TextInput_id_grado:'',
      dataSource:[],
    }  
  }

  cleanInputs(){
    this.setState({
      TextInput_id:'',
      TextInput_nombre:'',
      TextInput_creditos:'',
      TextInput_tipo:'',
      TextInput_curso:'',
      TextInput_cuatrimestre:'',
      TextInput_id_profesor:'',
      TextInput_id_grado:'',
    })
  }

//-----------------------------------------------------------------------------------
  ListarTodas  = () =>  {
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Asignatura/ListarTodasLasAsignaturas.php')
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
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Asignatura/InsertarAsignatura.php',
    {
        method: 'POST',
        headers:
        {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        {
          id: this.state.TextInput_id,
          nombre: this.state.TextInput_nombre,
          creditos: this.state.TextInput_creditos,
          tipo: this.state.TextInput_tipo,
          curso: this.state.TextInput_curso,
          cuatrimestre: this.state.TextInput_cuatrimestre,
          id_profesor: this.state.TextInput_id_profesor,
          id_grado: this.state.TextInput_id_grado,

        }
      )
    }).then((response) => response.json()).then((responseJson) =>{
      alert('El resgistro ha sido guardado: ' + responseJson)
      this.cleanInputs()  
    }).catch((error) => {
      console.error(error);
    });

  } 
  
//-----------------------------------------------------------------------------------
  Actualizar = () => {
    //Ahora vamos a codificar la funcion actualizar para consumir la Api
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Asignatura/ActualizarAsignatura.php',{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.TextInput_id,
        nombre: this.state.TextInput_nombre,
        creditos: this.state.TextInput_creditos,
        tipo: this.state.TextInput_tipo,
        curso: this.state.TextInput_curso,
        cuatrimestre: this.state.TextInput_cuatrimestre,
      })

    }).then((response) => response.json())

      .then((responseJson) =>{

        alert('El resgistro ha sido actualizado: ' + responseJson);
        this.cleanInputs()  
      }).catch((error) => {

        console.error(error);

      });
      console.log({
        id: this.state.TextInput_id,
        nombre: this.state.TextInput_nombre,
        creditos: this.state.TextInput_creditos,
        tipo: this.state.TextInput_tipo,
        curso: this.state.TextInput_curso,
        cuatrimestre: this.state.TextInput_cuatrimestre,
        id_profesor: this.state.TextInput_id_profesor,
        id_grado: this.state.TextInput_id_grado,
      })
  }
//-----------------------------------------------------------------------------------
  Borrar = () => {
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Asignatura/EliminarAsignatura.php',{
      method:'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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

  Listar =  () => {
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Asignatura/BuscarAsignatura.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        id: this.state.TextInput_id
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          TextInput_nombre: responseJson[0]['nombre'],
          TextInput_creditos: responseJson[0]['creditos'],
          TextInput_tipo: responseJson[0]['tipo'],
          TextInput_curso: responseJson[0]['curso'],
          TextInput_cuatrimestre: responseJson[0]['cuatrimestre'],
          TextInput_id_profesor: responseJson[0]['id_profesor'],
          TextInput_id_grado: responseJson[0]['id_grado'],

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
      <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7,}}>
        Registro de Asignaturas</Text>

    <TextInput
      placeholder="Ingrese el ID de la persona"
      onChangeText={TextInputValue =>{
        if ( /^\d+$/.test(TextInputValue))
        {
          this.setState({
            TextInput_id: TextInputValue
          });

        }else{
          this.setState({
            TextInput_id: ''
          });
        }
      }
    }
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_id}
      autoFocus={true}
    ></TextInput>

    <TextInput  
      placeholder="Ingrese el nombre de la asignatura"
      onChangeText={TextInputValue =>{
        if (/[a-zA-Z]+$/.test(TextInputValue))
        {
          this.setState({
            TextInput_nombre: TextInputValue
          });

        }else{
          this.setState({
            TextInput_nombre: ''
          });
        }
      }
    }
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_nombre}
      autoFocus={true}
    ></TextInput>
      
    <TextInput
      placeholder="Ingrese creditos "
      onChangeText={TextInputValue =>{
        if ( /^\d+$/.test(TextInputValue))
        {
          this.setState({
            TextInput_creditos: TextInputValue
          });

        }else{
          this.setState({
            TextInput_creditos: ''
          });
        }
      }
    }
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_creditos}
      autoFocus={true}
    ></TextInput>

    <TextInput
      placeholder="Ingrese el tipo"
      onChangeText={TextInputValue =>{
        if (/[a-zA-Z]+$/.test(TextInputValue))
        {
          this.setState({
            TextInput_tipo: TextInputValue
          });

        }else{
          this.setState({
            TextInput_tipo: ''
          });
        }
      }
    }
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_tipo}
      autoFocus={true}
    ></TextInput>

    <TextInput
      placeholder="Ingrese el curso"
      onChangeText={TextInputValue =>{
        
        if ( /^\d+$/.test(TextInputValue))
        {
          this.setState({
            TextInput_curso: TextInputValue
          });

        }else{
          this.setState({
            TextInput_curso: ''
          });
        }
      }
    }
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_curso}
      autoFocus={true}
    ></TextInput>

    <TextInput
      placeholder="Ingrese el cuatrimestre"
      onChangeText={TextInputValue =>{
        
        if ( /^\d+$/.test(TextInputValue))
        {
          this.setState({
            TextInput_cuatrimestre: TextInputValue
          });

        }else{
          this.setState({
            TextInput_cuatrimestre: ''
          });
        }
      }
    }
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_cuatrimestre}
      autoFocus={true}
    ></TextInput>

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
      keyboardType="number-pad"
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_id_profesor}
      autoFocus={true}
    ></TextInput>

    <TextInput
      placeholder="Ingrese el id del grado"
      onChangeText={TextInputValue =>{
        
        if ( /^\d+$/.test(TextInputValue))
        {
          this.setState({
            TextInput_id_grado: TextInputValue
          });

        }else{
          this.setState({
            TextInput_id_grado: ''
          });
        }
      }
    }
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_id_grado}
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
          <TouchableOpacity onPress={() => alert(item.nombre +" "+item.creditos +" "+item.tipo +" "+item.cuatrimestre +" "+item.cuatrimestre)}
          style={MisEstilos.TouchableOpacityStyle2}>
            <Text>{item.nombre} - {item.creditos}</Text>
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