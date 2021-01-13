import React, { useState } from 'react'

import { 
    CCol, 
    CRow, 
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CButton,
    CFormGroup,
    CLabel,
    CTextarea
} from '@coreui/react'
import { Controller, useForm } from 'react-hook-form'

export default function ModalSaveFormPacientes({ modal, setModal, payload, send }){
    
    const { control, handleSubmit  } = useForm()
    const [ isAddNota, setIsAddNota ] = useState(false)


    const handleAddNota = () => {
        setIsAddNota(true)
    }

    const onSubmit = ( nota ) => {
        if(isAddNota){
            send('NOTA', { payload, nota })
            setModal(false)
        }else if(!isAddNota){
            send('USER_DATA', { payload })
            setModal(false)
        }
    }

    return (
            <CRow>
                <CCol>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CModal 
                        show={modal} 
                        onClose={setModal}
                        >
                        <CModalHeader closeButton>
                            <CModalTitle>Antes de guardar... </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CCol className="col-12 mb-3">
                            ¿Desea agregar la nota medica en este momento?
                            </CCol>
                            {
                                isAddNota ? (
                                    <>
                                    <div className="w-100"></div>
                                        <CCol>
                                        <CFormGroup>
                                            <CLabel>Nota del paciente</CLabel>
                                            <Controller 
                                                name='content'
                                                control={control}
                                                defaultValue=""
                                                render={({ onChange, value }) => 
                                               <CTextarea 
                                                onChange={onChange}
                                                value={value}
                                                className="form-control" 
                                                id="notapaciente" 
                                                rows="3" />
                                            }
                                            />
                                        </CFormGroup>
                                        </CCol>
                                    </>
                                )
                                : null 
                            }
                            <CCol>
                            <CButton 
                                disabled={isAddNota} 
                                onClick={handleAddNota} 
                                className="btn-success">Añadir Nota</CButton>
                            </CCol>
                        </CModalBody>
                        <CModalFooter>
                            <CButton type="submit" className="btn-danger mr-2">Guardar</CButton>
                            <CButton 
                            color="secondary" 
                            onClick={() => setModal(false)}
                            >Cancel</CButton>
                        </CModalFooter>
                </CModal>
                </form>
                </CCol>
            </CRow>
    )
}