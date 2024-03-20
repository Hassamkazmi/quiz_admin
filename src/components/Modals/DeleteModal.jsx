import { Modal } from "antd";
import React from "react";

const DeleteModal = ({ setModalOpen, modalOpen, handleDelete, id }) => {
  const handleSubmit = () => {
    handleDelete(id);
    setModalOpen(false);
  };

  return (
    <Modal
      title="Are You Sure You Want to Delete this Data?"
      centered
      open={modalOpen}
      onOk={handleSubmit}
      onCancel={() => setModalOpen(false)}
    ></Modal>
  );
};

export default DeleteModal;
