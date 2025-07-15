import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';




export default function TaskLists() {

    const {user} = useAuth();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    function formatDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const timePart = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
    return `${datePart} at ${timePart}`;
    }

    const fetchTasks = () => {
        if(!user) return;

        fetch(`http://localhost:4000/tasks/all/${user.user_id}`)
        .then(res => res.json())
        .then(data => {
            if(data.code === 1 && Array.isArray(data.details)){
                setTasks(data.details);
                setError("");
            }else if(data.code === 2){
                setTasks([]);
                setError(data.details);
            }else{
                setTasks([]);
                setError(data.details);
            }
        })
    }

    useEffect(() => {
        fetchTasks();
    }, [user])

    console.log(tasks);

  return (
   <>
    <Row xs={1} md={2} lg={3} className='my-5'>
        {
            tasks.map(task => (
                <Col key={task.task_id}>
                    <Card className='h-100 shadow border rounded-4 p-1 p-lg-3 my-5'>
                        <Card.Body>
                            <Card.Title>
                                <h3 className='fw-bold text-primary-emphasis my-3'>{task.taskName}</h3>
                                {
                                    task.isActive ?
                                    <Badge className='bg-warning p-2 '>Pending</Badge>
                                    :
                                    <Badge className='bg-secondary p-2'>Done</Badge>
                                }
                            </Card.Title>
                            <Card.Text>
                                {task.taskDescription}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <p className='fw-bold'>Added: {formatDate(task.taskCreated)}</p>
                            <p className='fw-bold'>Completed: {formatDate(task.taskCompleted)}</p>
                        </Card.Footer>
                    </Card>
                </Col>
            ))
        }
    </Row>
   </>
  )
}
