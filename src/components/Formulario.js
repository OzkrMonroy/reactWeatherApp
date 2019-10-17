import React, { useState } from 'react';

function Formulario ({datosConsulta}) {

    const [busqueda, guardarBusqueda] = useState({
      ciudad : '',
      pais : ''
    })

    const handleChange = e => {
        // Cambiar el state
        guardarBusqueda({
          ...busqueda,
          [e.target.name] : e.target.value
        })
    }

    const consultarClima = e => {
      e.preventDefault()

      // Pasar datos hacia el componente principal
      datosConsulta(busqueda)
    }

    return(
        <form
          onSubmit={consultarClima}
        >
            <div className="input-field col s12">
                <input 
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select name="pais" id="pais" onChange={handleChange}>
                    <option value="">Selecciona un país</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                    <option value="GT">Guatemala</option>
                </select>
                <div className="input-field col s12">
                    <input type="submit" className="waves-effect waves-light btn-block btn-large yellow accent-4"
                    value="Obtener Clima"/>
                </div>
            </div>
        </form>
    )
}

export default Formulario