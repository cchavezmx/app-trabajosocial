import React, { useEffect } from 'react'
import {
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { useAuthDispatch, useAuthState } from '../context/userContext'
import { Redirect } from 'react-router-dom'
import SocialConent from './SocialContent'

const TheLayout = () => {
  const state = useAuthState()
  const dispatch = useAuthDispatch()

  const { user } = state.context

  useEffect(() => {
    dispatch('AUTH')
  },[dispatch])

  if(state.matches('auth_success') && user ){
    return (
      <div className="c-app c-default-layout">
        <TheSidebar/>
        <div className="c-wrapper">
          <TheHeader/>
          <div className="c-body">
            {/* <TheContent/> */}
            <SocialConent />
          </div>
          <TheFooter/>
        </div>
      </div>
    )
  }else if(state.matches('auth_fail')){
    return <Redirect to={'/login'}/>
  }else if(state.matches('auth_fail') && !user ){
    return <Redirect to={'/login'}/>
  }else {
    return <div>Esperando usuario...</div>
  }
}

export default TheLayout
