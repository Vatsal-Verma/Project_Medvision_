import { useEffect, useState } from "react";
import { Container, Table, Button, Dropdown, Alert, Modal } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './AskGemini.css';

function DoctorDashboard() {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedSymptoms, setSelectedSymptoms] = useState("");

    const handleShowModal = (symptoms) => {
        setSelectedSymptoms(symptoms);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSymptoms("");
    };

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/employees");
                if (!response.ok) throw new Error("Failed to fetch patient data");
                const data = await response.json();
                setPatients(data);
            } catch (error) {
                setError("Error fetching patient data: " + error.message);
            }
        };
        fetchPatients();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) throw new Error("Failed to update status");
            setPatients((prev) =>
                prev.map((patient) =>
                    patient.id === id ? { ...patient, status: newStatus } : patient
                )
            );
        } catch (error) {
            setError("Error updating status: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete patient");
            setPatients((prev) => prev.filter((patient) => patient.id !== id));
        } catch (error) {
            setError("Error deleting patient: " + error.message);
        }
    };

    const handleSendEmail = async (id, email) => {
        try {
            const emailResponse = await fetch(`http://localhost:8080/api/employee/${id}/send-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!emailResponse.ok) {
                const errorData = await emailResponse.text();
                throw new Error(errorData || "Failed to send email");
            }

            const updateResponse = await fetch(`http://localhost:8080/api/employee/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailSent: true }),
            });
            if (!updateResponse.ok) throw new Error("Failed to update email sent status");

            setPatients((prev) =>
                prev.map((patient) =>
                    patient.id === id ? { ...patient, emailSent: true } : patient
                )
            );

            setError(null);
            alert("Email sent successfully");
        } catch (error) {
            setError("Error sending email: " + error.message);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1 className="content">
                        <p>Doctor Admin</p>
                    </h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>age</th>
                                <th>gender</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Symptoms</th>
                                <th>Application Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center">
                                        No patients found
                                    </td>
                                </tr>
                            ) : (
                                patients.map((patient) => (
                                    <tr key={patient.id}>
                                        <td>p.{patient.id}</td>
                                        <td>{patient.name}</td>
                                        <td>{patient.age}</td>
                                        <td>{patient.gender}</td>
                                        <td>{patient.email}</td>
                                        <td>{patient.phone}</td>
                                        <td>
                                            <Button
                                                variant="link"
                                                size="sm"
                                                onClick={() => handleShowModal(patient.department)}
                                            >
                                                Read
                                            </Button>
                                        </td>
                                        <td>{patient.date}</td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    variant={
                                                        patient.status === "Approved"
                                                            ? "success"
                                                            : patient.status === "Rejected"
                                                            ? "danger"
                                                            : "warning"
                                                    }
                                                    size="sm"
                                                >
                                                    {patient.status || "Pending"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {["Approved", "Rejected", "Pending", "wait-list"].map((status) => (
                                                        <Dropdown.Item
                                                            key={status}
                                                            onClick={() => handleStatusChange(patient.id, status)}
                                                        >
                                                            {status}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => handleSendEmail(patient.id, patient.email)}
                                                className="me-2"
                                            >
                                                Send Email
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => handleDelete(patient.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="text-center">
                    <Button
                        variant="primary"
                        size="lg"
                        href="https://chat.gise.at/#Doctor"
                        target="_blank"
                    >
                        Join Meeting
                    </Button>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Patient Symptoms</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{selectedSymptoms || "No symptoms provided"}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal} style={{
                        padding:"50px", marginBottom: "100px"
                    }}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default DoctorDashboard;