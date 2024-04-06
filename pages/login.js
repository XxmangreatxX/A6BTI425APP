import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { authenticateUser, setToken } from '../lib/authenticate';

export default function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await authenticateUser(user, password);
            setToken(token);
            router.push('/favourites');
        } catch (err) {
            setError('Failed to login: ' + err.message);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Login</Card.Title>
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
                        <Button variant="primary" type="submit">Login</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}