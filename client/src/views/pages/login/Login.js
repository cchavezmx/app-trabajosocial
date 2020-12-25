import React, { useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Redirect } from 'react-router-dom'

import { useForm, Controller} from 'react-hook-form'
import { useAuthDispatch, useAuthState } from '../../../context/userContext'


const Login = () => {

  const state = useAuthState()
  const send = useAuthDispatch()

  const { control, handleSubmit } =useForm()

  useEffect(() => {
    send('AUTH')
  },[])

  const onSubmit = (data) => {
    send('LOGIN', { data })
  }

  if(state.matches('auth_success')){
    return <Redirect to={'/'} />
  }
  
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend> 
                      <Controller as={CInput} name="email" control={control} placeholder="Correo electronico" type="email"/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <Controller control={control} placeholder="Contraseña" name="password" as={CInput} type="password"/>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit"  color="primary" className="px-4">Login</CButton>
                      </CCol>
                      {/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
