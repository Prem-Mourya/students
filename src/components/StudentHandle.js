import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FaEdit, FaTrashAlt, FaEye, FaPlusCircle } from "react-icons/fa";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    class: "",
    section: "",
    rollNumber: "",
    address: "",
    phone: "",
    dob: null,
    parentName: "",
    parentPhone: "",
    email: "",
    dateOfAdmission: null,
    gender: "",
  });

  const studentsCollection = collection(db, "students");

  useEffect(() => {
    fetchStudents();
  }, []);

  // Fetch all students
  const fetchStudents = async () => {
    const querySnapshot = await getDocs(studentsCollection);
    const studentsList = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setStudents(studentsList);
  };

  // Add or Edit student
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.id) {
      const studentRef = doc(db, "students", formData.id);
      await updateDoc(studentRef, {
        ...formData,
        dob: formData.dob.toISOString().split("T")[0],
        dateOfAdmission: formData.dateOfAdmission.toISOString().split("T")[0],
      });
    } else {
      await addDoc(studentsCollection, {
        ...formData,
        dob: formData.dob.toISOString().split("T")[0],
        dateOfAdmission: formData.dateOfAdmission.toISOString().split("T")[0],
      });
    }

    fetchStudents();
    closeModal();
  };

  // Open modal with pre-filled data for editing
  const openModalForEdit = (student) => {
    setFormData({
      ...student,
      dob: new Date(student.dob),
      dateOfAdmission: new Date(student.dateOfAdmission),
    });
    setIsModalOpen(true);
  };

  // Open modal for creating a new student
  const openModalForAdd = () => {
    setFormData({
      id: "",
      name: "",
      class: "",
      section: "",
      rollNumber: "",
      address: "",
      phone: "",
      dob: null,
      parentName: "",
      parentPhone: "",
      email: "",
      dateOfAdmission: null,
      gender: "",
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Delete student
  const handleDelete = async (id) => {
    const studentRef = doc(db, "students", id);
    await deleteDoc(studentRef);
    fetchStudents();
  };

  return (
    <div className="container">
      <button onClick={openModalForAdd} className="add-btn">
        <FaPlusCircle /> Add Student
      </button>

      {/* Students Table */}
      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Roll Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.rollNumber}</td>
              <td>
                <button onClick={() => openModalForEdit(student)}>
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(student.id)}>
                  <FaTrashAlt />
                </button>
                <button>
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding/Editing Student */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{formData.id ? "Edit Student" : "Add Student"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter full name"
                  required
                  minLength={3}
                />
              </div>

              <div className="form-group">
                <label>Class:</label>
                <select
                  value={formData.class}
                  onChange={(e) =>
                    setFormData({ ...formData, class: e.target.value })
                  }
                  required
                >
                  <option value="">Select Class</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>

              <div className="form-group">
                <label>Section:</label>
                <select
                  value={formData.section}
                  onChange={(e) =>
                    setFormData({ ...formData, section: e.target.value })
                  }
                  required
                >
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </div>

              <div className="form-group">
                <label>Roll Number:</label>
                <input
                  type="number"
                  value={formData.rollNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, rollNumber: e.target.value })
                  }
                  placeholder="Enter roll number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Address:</label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Enter address"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Enter phone number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>

              <div className="form-group">
                <label>Date of Birth:</label>
                <ReactDatePicker
                  selected={formData.dob}
                  onChange={(date) => setFormData({ ...formData, dob: date })}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select Date of Birth"
                  required
                />
              </div>

              <div className="form-group">
                <label>Parent's Name:</label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) =>
                    setFormData({ ...formData, parentName: e.target.value })
                  }
                  placeholder="Enter parent's full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Parent's Phone:</label>
                <input
                  type="tel"
                  value={formData.parentPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, parentPhone: e.target.value })
                  }
                  placeholder="Enter parent's phone number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Date of Admission:</label>
                <ReactDatePicker
                  selected={formData.dateOfAdmission}
                  onChange={(date) =>
                    setFormData({ ...formData, dateOfAdmission: date })
                  }
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select Date of Admission"
                  required
                />
              </div>

              <div className="form-group">
                <label>Gender:</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      required
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      required
                    />
                    Female
                  </label>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                {formData.id ? "Update Student" : "Add Student"}
              </button>
            </form>
            <button onClick={closeModal} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
