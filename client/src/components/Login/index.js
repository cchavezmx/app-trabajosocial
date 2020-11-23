import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from "react-hook-form";


function Login() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const { register, handleSubmit } = useForm()
    const onSubmit = (e) => {
            alert(JSON.stringify(e))
    }
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
        Login
         </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Bienvenida!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control ref={register} name="email" type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control ref={register} name="password" type="password" placeholder="Password" />
                </Form.Group>
          <Modal.Footer >
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button type="submit" variant="primary" onClick={handleClose}>
              Enviar
            </Button>
          </Modal.Footer>
          </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }


  export default Login