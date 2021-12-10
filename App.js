import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import {n, navigate} from './n.js'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Persona from './MatriculasRN/Persona.js'
import Profesor from './MatriculasRN/Profesor.js'
import Grado from './MatriculasRN/Grado.js'
import Departamento from './MatriculasRN/Departamento.js'
import Curso from './MatriculasRN/Curso.js'
import Asignatura from './MatriculasRN/Asignatura.js'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.Drawer = createDrawerNavigator()
    
  }

  render() {
    return (
      <NavigationContainer ref={n}>
        <this.Drawer.Navigator initialRouteName="Asignatura" >
          <this.Drawer.Screen name="Persona"  component={Persona} />
          <this.Drawer.Screen name="Profesor"  component={Profesor} />
          <this.Drawer.Screen name="Grado"  component={Grado} />
          <this.Drawer.Screen name="Departamento"  component={Departamento} />
          <this.Drawer.Screen name="Curso"  component={Curso} />
          <this.Drawer.Screen name="Asignatura"  component={Asignatura} />
        </this.Drawer.Navigator>
      </NavigationContainer>    
      )
  }
}