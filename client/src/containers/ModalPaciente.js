import React, { Fragment } from 'react'
import { 
    CButton,
    CRow,
    CCol,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CInput,
    CLabel,
    CForm,
    CFormGroup,
    CTextarea
    }from '@coreui/react'



const ModalPaciente = ({ data, primary, setPrimary }) => {

    
    return (
        <Fragment>
            <CModal 
              show={primary} 
              onClose={() => setPrimary(!primary)}
              color="primary"
            >
              <CModalHeader closeButton>
                <CModalTitle>{data.nombre}</CModalTitle>
              </CModalHeader>
              <CModalBody>
            <CForm>
            <CRow className='d-flex justify-content-center'>

                <CFormGroup className='d-flex col-12'>
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

                <CFormGroup className='d-flex col-12'>
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
                
                <CFormGroup className='d-flex'>
                <CCol>
                <CLabel className='bg-dark col-12 mb-1'>Turno</CLabel>
                    <CInput disabled={true} type='text' id='nss' defaultValue={data.turno} />
                </CCol>
                <CCol>
                <CLabel className='bg-dark col-12 mb-1'>Edad</CLabel>
                    <CInput type='number' id='nss' defaultValue={data.edad} />
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

              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={() => setPrimary(!primary)}>
                  Ver Notas
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setPrimary(!primary)}>
                  Cerrar
                </CButton>
              </CModalFooter>
            </CModal>
        </Fragment>
    )
}


export default ModalPaciente