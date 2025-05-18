import { useEffect, useState } from "react";
import { Container, Table, Alert, Spinner } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './AskGemini.css';

function PatientDashboard() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all patients' data
    const fetchPatientsData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/employees", {
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error("Expected an array of patients");
            }
            setPatients(data);
            setLoading(false);
        } catch (error) {
            console.error("Fetch error:", error);
            setError(`Error fetching patient data: ${error.message}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatientsData();
        const interval = setInterval(fetchPatientsData, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" />
                <p>Loading patient data...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    // Find the most recent patient (e.g., highest ID)
    const latestPatient = patients.length > 0
        ? patients.reduce((latest, current) =>
              (current.id > latest.id ? current : latest), patients[0])
        : null;

    // Define field-value pairs for the latest patient
    const patientFields = latestPatient
        ? [
              { field: "Id", value: `p.${latestPatient.id}` },
              { field: "Name", value: latestPatient.name || "N/A" },
              { field: "age", value: latestPatient.age || "N/A" },
              { field: "gender", value: latestPatient.gender || "N/A" },
              { field: "Email", value: latestPatient.email || "N/A" },
              { field: "Phone", value: latestPatient.phone || "N/A" },
              { field: "Symptoms", value: latestPatient.department || "N/A" },
              { field: "Application Date", value: latestPatient.date || "N/A" },
              {
                  field: "Status",
                  value: latestPatient.status || "Pending",
                  className:
                      latestPatient.status === "Approved"
                          ? "text-success"
                          : latestPatient.status === "Rejected"
                          ? "text-danger"
                          : "text-warning",
              },
              ...(latestPatient.emailSent
                  ? [{
                        field: "Email Notification",
                        value: "Check your email for appointment details",
                        className: "text-info"
                    }]
                  : [])
          ]
        : [];

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1 className="content">
                        <p>Patient Dashboard</p>
                    </h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientFields.length === 0 ? (
                                <tr>
                                    <td colSpan="2" className="text-center">
                                        No patient data found
                                    </td>
                                </tr>
                            ) : (
                                patientFields.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.field}</td>
                                        <td>
                                            <span className={item.className || ""}>
                                                {item.value}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        {latestPatient && latestPatient.status === "Approved" && (
                            <tfoot>
                                <tr>
                                    <td colSpan="2" className="text-center text-info" style={{color: "green"}}>
                                        If your status is accepted, then please check your mail
                                    </td>
                                </tr>
                            </tfoot>
                        )}
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default PatientDashboard;