import "./PostUser.css"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

function PostUser() {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        email: "",
        phone: "",
        department: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        age: "",
        gender: "",
        email: "",
        phone: "",
        department: ""
    })

    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: "",
            age: "",
            gender: "",
            email: "",
            phone: "",
            department: ""
        };

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        } else if (formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
            isValid = false;
        }

        // Age validation
        if (!formData.age) {
            newErrors.age = "Age is required";
            isValid = false;
        } else if (isNaN(formData.age) || formData.age < 1 || formData.age > 150) {
            newErrors.age = "Age must be a number between 1 and 150";
            isValid = false;
        }

        // Gender validation
        if (!formData.gender.trim()) {
            newErrors.gender = "Gender is required";
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format";
            isValid = false;
        }

        // Phone validation
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
            isValid = false;
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Invalid phone number format";
            isValid = false;
        }

        // Department/Symptoms validation
        if (!formData.department.trim()) {
            newErrors.department = "Symptoms are required";
            isValid = false;
        } else if (formData.department.length < 3) {
            newErrors.department = "Symptoms must be at least 3 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error when user starts typing
        setErrors({
            ...errors,
            [name]: ""
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                const response = await fetch("http://localhost:8080/api/employee", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                console.log("Employee created: ", data);
                navigate("/");
            } catch (error) {
                console.log("Error creating Employee", error.message);
            }
        }
    };

    return (
        <div className="center-form">
            <h1>Book An Appointment</h1>
            <form onSubmit={handleSubmit} className="patient-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={errors.name ? "form-control is-invalid" : "form-control"}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="age"
                        placeholder="Enter age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className={errors.age ? "form-control is-invalid" : "form-control"}
                    />
                    {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="gender"
                        placeholder="Enter gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={errors.gender ? "form-control is-invalid" : "form-control"}
                    />
                    {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? "form-control is-invalid" : "form-control"}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? "form-control is-invalid" : "form-control"}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="department"
                        placeholder="Enter Symptoms"
                        value={formData.department}
                        onChange={handleInputChange}
                        className={errors.department ? "form-control is-invalid" : "form-control"}
                    />
                    {errors.department && <div className="invalid-feedback">{errors.department}</div>}
                </div>

                <Button variant="primary" type="submit" className="w-100">Post</Button>
            </form>
        </div>
    )
}

export default PostUser