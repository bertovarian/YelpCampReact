import { useState, useEffect } from "react"
import { useSignup } from "../hooks/useSignup"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { FloatingLabel, Form, Container, Row, Col, Button } from "react-bootstrap";
import { useForm } from 'react-hook-form';


const Signup = () => {
    const [aux, setAux] = useState(false)
    const { signup, error } = useSignup()
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, dirtyFields } } = useForm({
        mode: 'onChange'
    });

    const onSubmit = async (data) => {
        setAux(true)
        await signup(data)
    }

    useEffect(() => {
        if (error) {
            toast.error(`${error}`, { position: 'top-center', theme: 'colored' });
        }
    }, [error]);

    useEffect(() => {
        if (user && !(user.username).includes('guest')) {
            navigate('/campgrounds')
        }
        //I am using the aux as an extra condition to not trigger this effect meanwhile the signup hook
        //is being use so that way we can use the navigate with the query located in the hook.
        //When the aux is not activated the effect avoid to access signup page when we are already logged
    }, [!aux && user])

    const validations = {
        username: { required: "Username is required" },
        email: {
            required: "Email is required",
            pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Email pattern needed, example@domain.com'
            }
        },
        password: {
            required: "Password is required",
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,16}$/,
                message: 'Password pattern needed, ABCabc123.'
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <Container fluid >
                <Row>
                    <Col md={{ span: 2, offset: 5 }}>
                        <h2 className="mt-5 mb-4 text-center">Sign Up</h2>
                        <Form className='my-3' noValidate onSubmit={handleSubmit(onSubmit)}>
                            <FloatingLabel controlId="username" label="Username" className="mb-3">
                                <Form.Control
                                    placeholder="username"
                                    {...register('username', validations.username)}
                                    isInvalid={errors.username}
                                    isValid={dirtyFields.username && !errors.username}
                                />
                                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel controlId="email" label="Email address" className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    {...register('email', validations.email)}
                                    isInvalid={errors.email}
                                    isValid={dirtyFields.email && !errors.email}
                                />
                                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel controlId="password" label="Password" className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    {...register('password', validations.password)}
                                    isInvalid={errors.password}
                                    isValid={dirtyFields.password && !errors.password}
                                />
                                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                            </FloatingLabel>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col >
                </Row >
            </Container>
        </>
    )
}

export default Signup