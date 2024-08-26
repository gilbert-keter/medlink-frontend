import React, { useState } from "react";
import axios from "axios";
import "./styles.scss";
import { Button, Heading, Modal, TextInput } from "@carbon/react";
import { Information, TrashCan } from "@carbon/icons-react";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NextAppCard({ docImage, test, name, date, email, time }) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDate, setEditedDate] = useState(date);
  const [editedTest, setEditedTest] = useState(test);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    Swal.fire({
      title: "Editting your Appointment!",
      text: "Please wait as we edit your appointment...",
      imageUrl: "/logov2.svg",
      imageWidth: 70,
      imageHeight: 70,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: async () => {
        axios
          .delete("http://127.0.0.1:8000/bookings/delete-appointment/", {
            data: {
              doctor_name: name,
              email: email,
              date: date,
              time: time,
            },
          })
          .then((response) => {
            setDeleteModalOpen(false);
            Swal.close();
            Swal.fire({
              title: "Deleting Appointments",
              text: "Your appointment has been deleted successfully!",
              imageUrl: "/logov2.svg",
              imageWidth: 70,
              imageHeight: 70,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
            });
            toast.success("Appointment Deleted successfully!");
          })
          .catch((error) => {
            setDeleteModalOpen(false);
            Swal.close();
            Swal.fire({
              title: "Editting Appointments",
              text: "There ws an errro deleting the appointment.!",
              imageUrl: "/logov2.svg",
              imageWidth: 70,
              imageHeight: 70,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
            });
            toast.error("An error occured while deleting appointment.");
          });
      },
    });
  };
  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };
  const handleEditClick = () => {
    setEditModalOpen(true);
  };
  const handleEditSave = () => {
    setEditModalOpen(false);
    Swal.fire({
      title: "Editting your Appointment!",
      text: "Please wait as we edit your appointment...",
      imageUrl: "/logov2.svg",
      imageWidth: 70,
      imageHeight: 70,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: async () => {
        axios
          .put("http://127.0.0.1:8000/bookings/edit_appointment/", {
            doctor_name: editedName,
            email: email,
            date: editedDate,
            problem_description: editedTest,
          })
          .then((response) => {
            Swal.close();
            Swal.fire({
              title: "Editting Appointments",
              text: "Your appointment has been editted successfully!",
              imageUrl: "/logov2.svg",
              imageWidth: 70,
              imageHeight: 70,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
            });
            toast.success(response.data.message);
          })
          .catch((error) => {
            setEditModalOpen(false);
            Swal.fire({
              title: "Editting Appointments",
              text: "There was an error editting your appointment!!",
              imageUrl: "/logov2.svg",
              imageWidth: 70,
              imageHeight: 70,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: true,
            });
            toast.error("An error occured during modification:", error);
          });
      },
    });
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <div className="appointment">
        <ToastContainer />
        <div className="appointment-image">
          <img className="img-app" src={docImage} alt="appointment" />
        </div>
        <div className="test-description">
          <Heading className="test">{test}</Heading>
          <Heading className="name">Dr. {name}</Heading>
          <p>ADV: {date}</p>
        </div>
        <div className="edit-icons">
          <TrashCan
            className="edit-icon"
            style={{ color: "red" }}
            onClick={handleDeleteClick}
          />
          <Information className="edit-icon" onClick={handleEditClick} />
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          open={isDeleteModalOpen}
          modalHeading="Delete Appointment"
          primaryButtonText="Delete"
          secondaryButtonText="Cancel"
          onRequestClose={handleCancelDelete}
          onRequestSubmit={handleConfirmDelete}
          danger
        >
          <p>Are you sure you want to delete this appointment?</p>
        </Modal>

        {/* Edit Appointment Modal */}
        <Modal
          open={isEditModalOpen}
          modalHeading="Edit Appointment"
          primaryButtonText="Save"
          secondaryButtonText="Cancel"
          onRequestClose={handleEditCancel}
          onRequestSubmit={handleEditSave}
        >
          <TextInput
            id="edit-name"
            labelText="Doctor's Name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <TextInput
            id="edit-date"
            labelText="Appointment Date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
          />
          <TextInput
            id="edit-test"
            labelText="Problem Description"
            value={editedTest}
            onChange={(e) => setEditedTest(e.target.value)}
          />
        </Modal>
      </div>
    </>
  );
}

export default NextAppCard;
