import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Departure() {
  return (
    <Form style={{width: "10vh"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
    </Form>
  );
}

export default Departure;