import { useState, useEffect } from "react"
import { useLogin } from "../hooks/useLogin"
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate, useLocation } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { FloatingLabel, Form, Container, Row, Col, Button } from "react-bootstrap";
import { useForm } from 'react-hook-form';


const Login = () => {
    const [aux, setAux] = useState(false)
    const location = useLocation();
    const { login, error, isLoading } = useLogin()
    const { user } = useAuthContext()
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, dirtyFields } } = useForm({
        mode: 'onChange'
    });
    const from = location.state?.from?.pathname || "/campgrounds";

    const onSubmit = async (data) => {
        setAux(true)
        const { username, password } = data
        await login(username, password, from)
    }

    useEffect(() => {
        if (user) {
            navigate('/campgrounds')
        }
        // We do this to go to campgrounds when we are not logged, the first
        //condition is used for the case we were redirected to log in because we
        //were not logged, so after logged we go back to the link we were trying to 
        //access like new camp or edit camp
    }, [(location.state === null) && !aux && user])


    useEffect(() => {
        if (error) {
            toast.error(`${error}`, { position: 'top-center', theme: 'colored' });
        }
    }, [error]);

    useEffect(() => {
        if (location.state?.from?.pathname) {
            toast.warning("You need to be logged in!",
                { position: 'top-center', theme: 'colored', toastId: 'warning' })
        }
    }, [])

    const validations = {
        username: { required: "Username is required" },
        password: {
            required: "Password is required",
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,16}$/,
                message: 'Password pattern needed, ABCabc123.'
            }
        },
    };

    return (
        <>
            <ToastContainer />
            <Container fluid >
                <Row>
                    <Col md={{ span: 2, offset: 5 }}>
                        <h2 className="mt-5 mb-4 text-center">Login</h2>
                        <Form className='my-3' noValidate onSubmit={handleSubmit(onSubmit)}>
                            <FloatingLabel controlId="username" label="Username" className="mb-3">
                                <Form.Control
                                    placeholder="name@example.com"
                                    {...register('username', validations.username)}
                                    isInvalid={errors.username}
                                    isValid={dirtyFields.username && !errors.username}
                                />
                                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
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

export default Login