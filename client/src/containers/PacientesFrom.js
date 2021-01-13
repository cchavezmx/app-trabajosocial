import React, { useState } from 'react'
import { useMachine } from '@xstate/react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {
  CContainer,
  CCardBody,
  CCardHeader,
    CCol,
    CFormGroup,
    CInput,
    CLabel,
    CRow,
    CButton,
    CSelect,
  } from '@coreui/react'
  
import ModalSaveFormPacientes from './ModalSaveFormPacientes'
import { usePacienteMachine } from '../context/usePacienteMachine'

function PacientesForm(props){
  
  const [ state, send ] = useMachine(usePacienteMachine)

  const [ modal, setModal ] = useState(false)
  const [ payload, setPayload ] = useState({})

  const schemaValidation = yup.object().shape({
    nss: yup.string().required(),
    nombre: yup.string().required(),
  })

  const { control, handleSubmit, errors } =useForm({
    resolver: yupResolver(schemaValidation)
  })

  const submitForm = (data, e) => {
    e.preventDefault()
    setModal(true)
    setPayload(data)
  }
  
    const { error } = state.context

    console.log(state)
    
    if(state.matches('success')){
      setTimeout(() => {
        props.history.push('/')
      }, 3000);

      return (
        <div className="alert alert-danger mt-3" role="alert">
          {`El paciente: ${payload.nombre} fue registrado con exito`}      
        </div>)
    }

    return(
      <CContainer className="d-flex mt-2 justify-content-center">
        
        <form onSubmit={handleSubmit(submitForm)}>
            <CRow>
            <CCol>
            {state.matches('fail') && (
                <CCol>
                  <div className="alert alert-danger" role="alert">
                      {JSON.parse(error.message).errors.nss}
                  </div>
                </CCol>
              )} 
            <CCardHeader className="bg-warning col-12">
              <CCol className='col-12'>
              Alta de pacientes
              <small> Form</small>
              </CCol >
              </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="nss">NSS</CLabel> 
                <Controller 
                  name='nss'
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => 
                  <CInput 
                  onChange={onChange} 
                  value={value}  
                  id="company"
                  className={errors?.nss ? "form-control is-invalid" : null }
                  placeholder="Numero de seguridad social" />}
                />
                {errors?.nss && (        
                  <div className="invalid-feedback">
                    Porfavor ingrese el NSS
                  </div>)}
                <small className="font-weight-bold" >*Valor unico</small>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nombre">Nombre</CLabel>
                <Controller 
                  name="nombre"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => 
                  <CInput 
                    onChange={onChange}
                    value={value}
                    id="nombre"
                    className={errors?.nss ? "form-control is-invalid" : null }
                    placeholder="Nombre completo" />
                }
                />
                {errors?.nombre && (        
                  <div className="invalid-feedback">
                    Porfavor ingrese el Nombre del paciente
                  </div>)}
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="curp">Curp</CLabel>
                <Controller 
                  name="curp"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => 
                   <CInput
                      onChange={onChange}
                      value={value}
                     id="curp" 
                     placeholder="Curp" />
                  }
                />
              </CFormGroup>
              <CFormGroup row className="my-0">
                <CCol className="col-12 col-sm-6">
                  <CFormGroup>
                    <CLabel htmlFor="unidad">Unidad</CLabel>
                    <Controller 
                    name="unidad"
                    control={control}
                    defaultValue=""
                    render={({ onChange, value }) => 
                      <CInput 
                        onChange={onChange}
                        value={value}
                        type="text"
                        id="Unidad" placeholder="Ubicación" />
                    }
                    />
                  </CFormGroup>
                </CCol>
                <CCol className="col-12 col-sm-6">
                  <CFormGroup>
                    <CLabel htmlFor="consultorio">Consultorio</CLabel>
                  <Controller 
                    name="consultorio"
                    control={control}
                    defaultValue=""
                    render={({ onChange, value }) => 
                    <CInput
                      onChange={onChange}
                      value={value}
                      id="consultorio" placeholder="Consultorio" />
                    }
                  />
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row className="my-0">
                <CCol className="col-12 col-sm-6">
                  <CFormGroup>
                    <CLabel htmlFor="turno">Turno</CLabel>
                  <Controller 
                    name="turno"
                    control={control}
                    defaultValue="turno"
                    render={({ onChange, value }) => 
                    <CSelect
                      onChange={onChange}
                      value={value}
                      id="turno" 
                      defaultValue='matutino'
                      className="form-control"           
                    > 
                      <option value="matutino" >Matutino</option>
                      <option value="vespertino" >Vespertino</option>
                      <option value="nocturno" >Nocturno</option>
                    </CSelect>
                    }
                  />
                  </CFormGroup>
                </CCol>
                <CCol className="col-12 col-sm-6">
                  <CFormGroup>
                    <CLabel htmlFor="edad">Edad</CLabel>
                  <Controller 
                    name="edad"
                    control={control}
                    defaultValue=""
                    render={({ onChange, value }) => 
                    <CInput 
                      onChange={onChange} value={value}
                      type="number"
                      id="edad" placeholder="Edad" />
                    }
                  />
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup row className="my-0">
                <CCol className="col-12 col-sm-6">
                  <CFormGroup>
                    <CLabel htmlFor="sexo">Sexo</CLabel>
                        <Controller 
                    name="sexo"
                    control={control}
                    defaultValue="masculino"
                    render={({ onChange, value }) => 
                    <CSelect onChange={onChange}
                       value={value} 
                       id="sexo" 
                       placeholder="Sexo" >
                         <option value="masculino">Masculino</option>
                         <option value="femenino">Femenino</option>
                       </CSelect>
                    }
                  />
                  </CFormGroup>
                </CCol>
                <CCol className="col-12 col-sm-6">
                  <CFormGroup>
                    <CLabel htmlFor="contacto">Contacto</CLabel>
                        <Controller 
                    name="contacto"
                    control={control}
                    defaultValue=""
                    render={({ onChange, value }) => 
                    <CInput 
                      onChange={onChange}
                      value={value}
                      id="contacto" 
                      placeholder="Número y/o nombre del contacto" />
                    }
                  />
                  </CFormGroup>
                </CCol>
              </CFormGroup>
            </CCardBody>
        </CCol>
        {/* botones */}
        <div className="w-100"></div>
      <CCol className="d-flex justify-content-center">
        <CButton type='submit' className="btn-danger mr-2">Enviar</CButton>
        <CButton className="btn-info mr-2">Borrar</CButton>
      </CCol>
      </CRow>
      </form>
                    
      {/* Menu de confirmacion de paciente */}
      { modal && <ModalSaveFormPacientes modal={modal} setModal={setModal} payload={payload} send={send} />}

    </CContainer>

    )

}

export default PacientesForm

