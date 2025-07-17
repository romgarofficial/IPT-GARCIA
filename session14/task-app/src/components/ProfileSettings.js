import React, { useState, useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useAuth } from '../AuthContext';
import Swal from 'sweetalert2';




export default function ProfileSettings() {
    const { user, updateUser } = useAuth();
    const [isEditable, setIsEditable] = useState(false);

    // useStates for basic information
    const [fname, setFname] = useState("");
    const [mname, setMname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");

    // Fetch user profile info on mount
    useEffect(() => {
        if (user?.user_id) {
            fetch(`${process.env.REACT_APP_API_URL}/users/${user.user_id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.code === 1) {
                        setFname(data.details.fname || "");
                        setMname(data.details.mname || "");
                        setLname(data.details.lname || "");
                        setEmail(data.details.email || "");
                    }
                });
        }
    }, [user]);

    const handleEditClick = () => {
        setIsEditable(!isEditable);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/users/update/${user.user_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fname, mname, lname, email })
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 1) {
                Swal.fire({
                    title: "Profile Updated!",
                    text: data.details,
                    icon: "success"
                });
                // Update context user
                updateUser({ ...user, fname, mname, lname, email });
                setIsEditable(false);
            } else {
                Swal.fire({
                    title: "Oops!",
                    text: data.details,
                    icon: "error"
                });
            }
        });
    };
    

  return (
    <Container fluid className='d-flex align-items-center justify-content-center flex-column my-3'>
        <h4>Basic Information</h4>

        <Form className='my-3 p-3 col-12 col-lg-6' onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Control 
                type="text" 
                placeholder="First Name" 
                required
                disabled={!isEditable}
                value={fname.toUpperCase()}
                onChange={e => setFname(e.target.value.toUpperCase())}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMiddleName">
                <Form.Control 
                type="text" 
                placeholder="Middle Name" 
                required
                disabled={!isEditable} 
                value={mname.toUpperCase()}
                onChange={e => setMname(e.target.value.toUpperCase())}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
                <Form.Control 
                type="text" 
                placeholder="Last Name" 
                required
                disabled={!isEditable} 
                value={lname.toUpperCase()}
                onChange={e => setLname(e.target.value.toUpperCase())}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control 
                type="email" 
                placeholder="Email" 
                required
                disabled={!isEditable} 
                value={email.toLowerCase()}
                onChange={e => setEmail(e.target.value.toLowerCase())}
                />
            </Form.Group>
                {/* If edit button is clicked, it will be hidden then a cancel and update button will appear */}
                {
                    isEditable ? (
                        <><Container className='d-flex flex-row align-items-center justify-content-center gap-3 p-0'>
                            <Button className='w-25 rounded-3 btn-secondary p-2 my-2' type='button' onClick={handleEditClick}>Cancel</Button>
                            <Button className='w-100 rounded-3 btn-primary p-2 my-2' type='submit'>Update</Button>
                        </Container>
                        </>
                    ) : 
                    <Button className='w-100 rounded-3 btn-warning p-2 my-2' type='button' onClick={handleEditClick}>Edit</Button>
                }
            
        </Form>
    </Container>
    
  )
}
