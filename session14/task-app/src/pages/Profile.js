import React from 'react'
import { Container } from 'react-bootstrap'
import { useAuth } from '../AuthContext'
import ProfileSettings from '../components/ProfileSettings';
import PasswordSettings from '../components/PasswordSettings';




export default function Profile() {

    const {user} = useAuth();

  return (
    <Container className='d-flex flex-column align-items-center justify-content-center p-3 p-lg-5 my-4 m-lg-5 rounded-4 text-center shadow-lg bg-body-tertiary'>
        <h1 className='text-primary-emphasis my-2 my-lg-4 w-100  border-bottom border-2 border-warning pb-4 display-4 fw-bold'>PROFILE PAGE</h1>


        <ProfileSettings/>

        <PasswordSettings/>
    </Container>
  )
}
