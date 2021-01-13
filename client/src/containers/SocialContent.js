import React, { useEffect, useState } from 'react'
import { useMachine } from '@xstate/react'
import { CCol, CContainer, CRow, CCardHeader, CCardBody, CDataTable, CCard, CButton } from '@coreui/react'
import { Route, Switch } from 'react-router-dom'

// temporal 
import PacientesForm from './PacientesFrom'
import AddNotaForm from './AddNotaForm'
import ModalPaciente from './ModalPaciente'

//  contextos
import { usePacienteMachine } from '../context/usePacienteMachine'


// contenido de la tabla
const fields = ['nombre', 'acciones']

const SocialConent = (props) => {
    
    // Maquina de Pacientes
    const [state, send] = useMachine(usePacienteMachine)
    const { pacientes } = state.context

    // estado de carga
    const [ spinner, setSpinner ] = useState(false)

    const [ payloadPaciente, setPayloadPaciente ] = useState([])

    const handlePayloadPaciente = ( paciente ) => {

        // creamos un objecto con los datos del paciente para pasarlo al componente
        setPayloadPaciente(paciente)

        // pasamos a true el modal de pacientes
        setPrimary(true)

    }

    // Estado de modal 
    const [primary, setPrimary] = useState(false)

    console.log(payloadPaciente, 'el mio cid')

    useEffect(() => {
        let loadState = false
        if(props.match.isExact && !loadState){
            send('LOAD')
            loadState = true 
        }
        return () => {
            loadState = false
        }
    }, [props.match])


    // efecto para el spinner
    useEffect(() => {    
        let done = false
        if(state.matches('loaded_pacientes') && !done){
            setSpinner(false)
            done = true
        }
        return () => {
            done = false
        }
    })    

    return(
    <CContainer>
        {props.match.isExact && 
        <CRow className="d-flex content-center">
            <CCol>
            {/* TODO: tarjetas con NSS, NOMBRE y RESUMEN DE NOTA  */}
            {/* <h1>Ultimos Pacientes ageregados</h1> */}
            {/* TODO poner un splinner */}
            { spinner && (
                <div className="spinner-grow mt-5" role="status">
                <span className="sr-only">Loading...</span>
                </div>
            ) }
            {state.matches('loaded_pacientes') && (
        <CCol className="mt-2">
          <CCard>
            <CCardHeader>
                Ultimos Pacientes ageregados
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={pacientes}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'acciones':
                  (item)=>(
                    <td>
                    <CCol className="d-flex justify-content-center">
                    <CButton onClick={() =>  handlePayloadPaciente(item)} className="btn btn-info mr-1">Ver</CButton>
                    {/* TODO: en un modal veremos la informacion del usuario */}
                    <button type="button" className="btn btn-success">
                    Notas <span className="badge bg-light text-dark">9</span>
                    <span className="sr-only">unread messages</span>
                    </button>
                    </CCol>
                    </td>
                  )
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
            )}
            </CCol>
        </CRow>
        }

        <Switch>
            <Route exact path={'/pacientes/register'} render={(props) => <PacientesForm {...props} /> } />
            <Route exact path={'/pacientes/addNota'} render={(props) => <AddNotaForm {...props} payload={pacientes} /> } />
            <Route render={(props) => <ModalPaciente {...props} data={payloadPaciente} primary={primary} setPrimary={setPrimary} />}  />
        </Switch>
        
    </CContainer>
    )
}


export default SocialConent