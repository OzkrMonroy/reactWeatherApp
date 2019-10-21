import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Formulario from './components/Formulario'
import Error from './components/Error'
import Clima from './components/Clima'
// import axios from 'axios'

function App() {

  //State Principal
  const [ciudad, guardarCiudad] = useState('')
  const [pais, guardarPais] = useState('')
  const [error, guardarError] = useState(false)
  const [resultado, guardarResultado] = useState({})

  useEffect(() => {
    // Prevenir ejecución
    if(ciudad === '' || pais === '') return

    const consultarApi = async () => {
      const appId = '73258c7d6fbd857c6f0b566c9522c609'
  
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
  
      // let datos = await axios.get(url)
      let response = await fetch(url)
      let datos = await response.json()

      console.log(datos)
      guardarResultado(datos)
    }

    consultarApi()

  }, [ciudad, pais])

  const datosConsulta = datos => {
    if(datos.ciudad === '' || datos.pais === ''){
      // error
      guardarError(true)
      return
    }

    // Ciudad y pais existen, agregarlos al state
    guardarCiudad(datos.ciudad)
    guardarPais(datos.pais)
    guardarError(false)

  }

  // Cargar un componente condicionalmente
  let componente
  if(error) {
    //Mostramos el error
    componente = <Error mensaje='Ambos campos son obligatorios' />
  }else if(resultado.cod === "404") {
    componente = <Error mensaje='Datos no encontrados' />
  }else {
    //Mostramos el clima
    componente = <Clima resultado={resultado}/>
  }

  return (
    <div className="App">
      <Header
        titulo='React Weather App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario
                datosConsulta={datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;