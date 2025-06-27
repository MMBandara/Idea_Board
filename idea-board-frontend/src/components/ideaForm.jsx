"use client"

import { useState, useEffect } from "react"
import { Modal, Form, Button, Spinner } from "react-bootstrap"

const IdeaForm = ({ show, handleClose, onSubmit, editingIdea, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingIdea) {
      setFormData({
        title: editingIdea.title || "",
        description: editingIdea.description || "",
      })
    } else {
      setFormData({
        title: "",
        description: "",
      })
    }
    setErrors({})
  }, [editingIdea, show])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit(formData)
  }

  const handleModalClose = () => {
    setFormData({
      title: "",
      description: "",
    })
    setErrors({})
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleModalClose} centered size="md">
      <Modal.Header closeButton className="border-0 pb-2">
        <Modal.Title className="fs-5 fw-semibold text-dark">{editingIdea ? "Edit Idea" : "New Idea"}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="px-4 py-3">
          <Form.Group className="mb-4">
            <Form.Label className="fw-medium text-dark mb-2">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
              placeholder="What's your idea?"
              className="py-3 fs-6 rounded-3 border-2"
            />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-medium text-dark mb-2">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
              placeholder="Tell us more about it..."
              className="fs-6 rounded-3 border-2"
              style={{ resize: "none" }}
            />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="border-0 px-4 pb-4">
          <Button variant="light" onClick={handleModalClose} className="px-4 py-2 fw-medium rounded-3 border-2">
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading} className="px-4 py-2 fw-medium rounded-3">
            {loading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Saving...
              </>
            ) : editingIdea ? (
              "Update"
            ) : (
              "Save"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default IdeaForm
