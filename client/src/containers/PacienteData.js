import React from 'react'
import { 
    CButton,
    CRow,
    CCol,
    CInput,
    CLabel,
    CForm,
    CFormGroup, 
    CTextarea,
    CCard,
    CCardBody,
    CCardHeader
    } from '@coreui/react'


const PacienteData = ({ data }) => {
    <CForm className="mt-3">
    <div className="bg-info" >
        {data.nombre}
    </div>
<CRow className='d-flex'>

    <CFormGroup className='d-flex'>
    <CCol>
    <CLabel className='bg-dark col-12 mb-1'>NSS</CLabel>
        <CInput disabled={true} type='text' id='nss' defaultValue={data.nss} />
    </CCol>
    <CCol>
    <CLabel className='bg-dark col-12 mb-1'>Curp</CLabel>
        <CInput type='text' id='nss' defaultValue={data.curp} />
        {}
    </CCol>
    </CFormGroup>

    <CFormGroup className='d-flex'>
    <CCol>
    <CLabel className='bg-dark col-12 mb-1'>Unidad</CLabel>
        <CInput disabled={true} type='text' id='nss' defaultValue={data.unidad} />
    </CCol>
    <CCol>
    <CLabel className='bg-dark col-12 mb-1'>Consultorio</CLabel>
        <CInput type='text' id='nss' defaultValue={data.consultorio} />
        {}
    </CCol>
    </CFormGroup>
    
    <CFormGroup className='d-flex col-12'>
    <CCol>
    <CLabel className='bg-dark col-12 mb-1'>Turno</CLabel>
        <CInput disabled={true} type='text' id='nss' defaultValue={data.turno} />
    </CCol>
    <CCol>
    <CLabel className='bg-dark col-12 mb-1'>edad</CLabel>
        <CInput type='text' id='nss' defaultValue={data.consultorio} />
        {}
    </CCol>
    <CCol>
    <CLabel className='bg-dark col-12 mb-1'>Genero</CLabel>
        <CInput type='text' id='nss' defaultValue={data.sexo} />
        {}
    </CCol>
    </CFormGroup>

    <CFormGroup className='d-flex col-12'>
    <CCol>
    <CLabel className='bg-dark col-12 mb-1'>Datos de contacto</CLabel>
        <CTextarea type='text' id='nss' defaultValue={data.contacto} />
        {}
    </CCol>
    </CFormGroup>
</CRow>
</CForm>
}

export default PacienteData