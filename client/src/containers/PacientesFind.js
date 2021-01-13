import React, { Fragment } from 'react'
import { CCard, CCardHeader, CCardBody, CButton } from '@coreui/react'

const PacientesFind = ({ data }) => {



    return(
    <Fragment>
    <CCard className="card text-center">
        <CCardHeader className="card-header">
            Datos del Paciente
        </CCardHeader>
          <CCardBody>
            <h5 className="card-title">{`NSS: ${data.nss}`}</h5>
            <p className="card-text">{ data.nombre }</p>
            <CButton className='btn-outline-info'>Agregar Nota</CButton>
        </CCardBody>
    </CCard>
    </Fragment>
    )
}


export default PacientesFind