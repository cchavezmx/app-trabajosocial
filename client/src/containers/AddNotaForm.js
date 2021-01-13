import React, { Fragment, useState } from 'react'
import { CRow, CCol, CInput, CButton} from '@coreui/react'
import { useMachine } from '@xstate/react'

import { usePacienteMachine } from '../context/usePacienteMachine'
import PacientesFind from './PacientesFind'


// import PacientesFind from './PacientesFind'

const AddNotaForm = () => {
    
    const [ state, send ] = useMachine(usePacienteMachine)
    const [ keyword, setKeyword ] = useState('')

    const handleChange = (e) => {
        setKeyword(e.target.value)
    }

    const handleSearch = () => {
        send('SEARCH', { query: keyword })
    }
    
    const { search } = state.context

    return(

        <Fragment>
            <CRow className="justify-content-md-center">
                <CCol className="d-flex mt-3 justify-content-center">
                    <CInput id='search' className='col-8' placeholder="Buscar NSS con el nombre del paciente" onChange={handleChange} type="text" value={keyword} />
                    <CButton htmlFor='search' onClick={handleSearch} className="btn-github ml-2 col-4 col-sm-2">Buscar</CButton>
                </CCol>
                <CCol className="col-12 mt-3">
                    {state.matches('idle') && <p className="small">Puedes buscar por nombres o apellidos</p>}
                    {state.matches('searchDone') 
                        && search.length === 0 
                            ? `Intente con otro consulta, puedes ser segundo nombre o apellido` 
                            : Object.values(search).map(item => <PacientesFind key={item._id} data={item} />)}
                </CCol>
            </CRow>
        </Fragment>
    )
}

export default AddNotaForm