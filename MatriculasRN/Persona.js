import React from 'react';
import { Alert,StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList} from 'react-native';

export default class Persona extends React.Component{
  constructor(props){
    
    super(props)

    //Ahora definimos las varibales para la tabla persona de la Base de Datos de matriculagruposabado
    this.state = {
      TextInput_id:'',
      TextInput_nif:'',
      TextInput_nombre:'',
      TextInput_apellido1:'',
      TextInput_apellido2:'',
      TextInput_ciudad:'',
      TextInput_direccion:'',
      TextInput_telefono:'',
      TextInput_fecha_nacimiento:'',
      TextInput_sexo:'',
      TextInput_tipo:'',
      TextInput_Clave:'',
      dataSource:[]
    }  
  }

  cleanInputs(){
    this.setState({
      TextInput_id:'',
      TextInput_nif:'',
      TextInput_nombre:'',
      TextInput_apellido1:'',
      TextInput_apellido2:'',
      TextInput_ciudad:'',
      TextInput_direccion:'',
      TextInput_telefono:'',
      TextInput_fecha_nacimiento:'',
      TextInput_sexo:'',
      TextInput_tipo:'',
      TextInput_Clave:'',
    })
  }

//-----------------------------------------------------------------------------------
  ListarTodas  = () =>  {
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Persona/ListarTodasLasPersonas.php')
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
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Persona/InsertarPersona.php',
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
          nif: this.state.TextInput_nif,
          nombre: this.state.TextInput_nombre,
          apellido1: this.state.TextInput_apellido1,
          apellido2: this.state.TextInput_apellido2,
          ciudad: this.state.TextInput_ciudad,
          direccion: this.state.TextInput_direccion,
          telefono: this.state.TextInput_telefono,
          fecha_nacimiento: this.state.TextInput_fecha_nacimiento,
          sexo: this.state.TextInput_sexo,
          tipo: this.state.TextInput_tipo,
          Clave: this.state.TextInput_Clave,
        }
      )
    }).then((response) => response.json()).then((responseJson) =>{
      alert('El resgistro ha sido guardado: ' + responseJson)
      this.cleanInputs()  
    }).catch((error) => {
      console.error(error);
    });
    // console.log({
    //   //id: this.state.TextInput_id,
    //   nif: this.state.TextInput_nif,
    //   nombre: this.state.TextInput_nombre,
    //   apellido1: this.state.TextInput_apellido1,
    //   apellido2: this.state.TextInput_apellido2,
    //   ciudad: this.state.TextInput_ciudad,
    //   direccion: this.state.TextInput_direccion,
    //   telefono: this.state.TextInput_telefono,
    //   fecha_nacimiento: this.state.TextInput_fecha_nacimiento,
    //   sexo: this.state.TextInput_sexo,
    //   tipo: this.state.TextInput_tipo,
    //   Clave: this.state.TextInput_Clave,
    // })
  } 
  
//-----------------------------------------------------------------------------------
  Actualizar = () => {
    //Ahora vamos a codificar la funcion actualizar para consumir la Api
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Persona/ActualizarPersona.php',{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id: this.state.TextInput_id,
          nif: this.state.TextInput_nif,
          nombre: this.state.TextInput_nombre,
          apellido1: this.state.TextInput_apellido1,
          apellido2: this.state.TextInput_apellido2,
          ciudad: this.state.TextInput_ciudad,
          direccion: this.state.TextInput_direccion,
          telefono: this.state.TextInput_telefono,
          fecha_nacimiento: this.state.TextInput_fecha_nacimiento,
          sexo: this.state.TextInput_sexo,
          tipo: this.state.TextInput_tipo,
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
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Persona/EliminarPersona.php',{
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
    fetch('http://192.168.1.59:8080/APIMatriculasSabado/Model/Persona/BuscarPersona.php', {
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
          TextInput_nif: responseJson[0]['nif'],
          TextInput_nombre: responseJson[0]['nombre'],
          TextInput_apellido1: responseJson[0]['apellido1'],
          TextInput_apellido2: responseJson[0]['apellido2'],
          TextInput_ciudad: responseJson[0]['ciudad'],
          TextInput_direccion: responseJson[0]['direccion'],
          TextInput_telefono: responseJson[0]['telefono'],
          TextInput_fecha_nacimiento: responseJson[0]['fecha_nacimiento'],
          TextInput_sexo: responseJson[0]['sexo'],
          TextInput_tipo: responseJson[0]['tipo'],
          TextInput_Clave: responseJson[0]['Clave']
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
        Registro de personas</Text>

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
      placeholder="Ingrese el NIF de la persona"
      onChangeText={TextInputValue => this.setState({
        TextInput_nif: TextInputValue
      })}//Se captura el dato
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_nif}
      autoFocus={true}
    ></TextInput>
      
    <TextInput
      placeholder="Ingrese el nombre de la persona"
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
      placeholder="Ingrese el primer apellido de la persona"
      onChangeText={TextInputValue =>{
        
        if (/[a-zA-Z]+$/.test(TextInputValue))
        {
          this.setState({
            TextInput_apellido1: TextInputValue
          });

        }else{
          this.setState({
            TextInput_apellido1: ''
          });
        }
      }
    }
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_apellido1}
      autoFocus={true}
    ></TextInput>

    <TextInput
      placeholder="Ingrese el segundo apellido de la persona"
      onChangeText={TextInputValue =>{
        
        if (/[a-zA-Z]+$/.test(TextInputValue))
        {
          this.setState({
            TextInput_apellido2: TextInputValue
          });

        }else{
          this.setState({
            TextInput_apellido2: ''
          });
        }
      }
    }
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_apellido2}
      autoFocus={true}
    ></TextInput>

    <TextInput
      placeholder="Ingrese la ciudad de la persona"
      onChangeText={TextInputValue =>{
        
        if (/[a-zA-Z]+$/.test(TextInputValue))
        {
          this.setState({
            TextInput_ciudad: TextInputValue
          });

        }else{
          this.setState({
            TextInput_ciudad: ''
          });
        }
      }
    }
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_ciudad}
      autoFocus={true}
    ></TextInput>

    <TextInput
      placeholder="Ingrese la dirección de la persona"
      onChangeText={TextInputValue => this.setState({
        TextInput_direccion: TextInputValue
      })}//Se captura el dato
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_direccion}
      autoFocus={true}
    ></TextInput>

    <TextInput
      placeholder="Ingrese el telefono de la persona"
      onChangeText={TextInputValue =>{
        
        if ( /^\d+$/.test(TextInputValue))
        {
          this.setState({
            TextInput_telefono: TextInputValue
          });

        }else{
          this.setState({
            TextInput_telefono: ''
          });
        }
      }
    }
      underlineColorAndroid='transparent'
      keyboardType="number-pad"
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_telefono}
      autoFocus={true}
    ></TextInput>

    <TextInput
      placeholder="Ingrese la fecha de nacimiento de la persona"
      onChangeText={TextInputValue => this.setState({
        TextInput_fecha_nacimiento: TextInputValue
      })}//Se captura el dato
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_fecha_nacimiento}
      autoFocus={true}
    ></TextInput>

    <TextInput
      placeholder="Ingrese el sexo de la persona"
      onChangeText={TextInputValue => this.setState({
        TextInput_sexo: TextInputValue
      })}//Se captura el dato
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_sexo}
      autoFocus={true}
    ></TextInput>

    <TextInput
      placeholder="Ingrese el tipo de la persona"
      onChangeText={TextInputValue => this.setState({
        TextInput_tipo: TextInputValue
      })}//Se captura el dato
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_tipo}
      autoFocus={true}
    ></TextInput>

    
    <TextInput
      placeholder="Ingrese la clave de la persona"
      onChangeText={TextInputValue =>{
        
        if ( /^\d+$/.test(TextInputValue))
        {
          this.setState({
            TextInput_Clave: TextInputValue
          });

        }else{
          this.setState({
            TextInput_Clave: ''
          });
        }
      }
    }
      underlineColorAndroid='transparent'
      style={MisEstilos.TextInputStyleClass}
      value={this.state.TextInput_Clave}
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
          <TouchableOpacity onPress={() => alert(item.nif +" "+item.nombre +" "+item.apellido1 +" "+item.apellido2 +" "+item.ciudad)}
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