import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { registerUser } from '../lib/authenticate';

export default function Register() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setError("Passwords do not match.");
            return;
        }
        try {
            await registerUser(user, password, password2);
            router.push('/login');
        } catch (err) {
            setError('Failed to register: ' + err.message);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Register</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Register</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
