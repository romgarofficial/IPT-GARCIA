import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useAuth } from '../AuthContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


export default function PasswordSettings() {
    const { user } = useAuth()

    const navigate = useNavigate()

    if(!user) {
        
    }

    useEffect(() => {
        if(!user){
            navigate("/login")
        }else{
            document.title = `${user.fname.toUpperCase()} ${user.lname.toUpperCase()} - Profile Settings`
        }  
        
    }, [])

    const [isEditable, setIsEditable] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const handleEditClick = () => {
        setIsEditable(!isEditable)
        setOldPassword("")
        setNewPassword("")
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        if (newPassword.length < 8) {
            Swal.fire({
                title: "Invalid Password",
                text: "New password must be at least 8 characters long.",
                icon: "error"
            });
            return;
        }
        fetch(`${process.env.REACT_APP_API_URL}/users/update-password/${user.user_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ oldPassword, newPassword })
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 1) {
                Swal.fire({
                    title: "Password Updated!",
                    text: data.details,
                    icon: "success"
                })
                setIsEditable(false)
                setOldPassword("")
                setNewPassword("")
            } else {
                Swal.fire({
                    title: "Oops!",
                    text: data.details,
                    icon: "error"
                })
            }
        })
    }

    return (
        <Container fluid className='d-flex align-items-center justify-content-center flex-column my-3'>
            <h4>Password Settings</h4>
            <Form className='my-3 p-3 col-12 col-lg-6' onSubmit={handleUpdate}>
                <Form.Group className="mb-3" controlId="formOldPassword">
                    <Form.Control
                        type="password"
                        placeholder="Enter old password"
                        required
                        disabled={!isEditable}
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNewPassword">
                    <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        required
                        disabled={!isEditable}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                </Form.Group>
                {
                    isEditable ? (
                        <Container className='d-flex flex-row align-items-center justify-content-center gap-3 p-0'>
                            <Button className='w-25 rounded-3 btn-secondary p-2 my-2' type='button' onClick={handleEditClick}>Cancel</Button>
                            <Button className='w-100 rounded-3 btn-primary p-2 my-2' type='submit'>Update</Button>
                        </Container>
                    ) :
                    <Button className='w-100 rounded-3 btn-warning p-2 my-2' type='button' onClick={handleEditClick}>Change Password</Button>
                }
            </Form>
        </Container>
    )
}
