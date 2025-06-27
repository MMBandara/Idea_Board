"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Button, Toast, ToastContainer } from "react-bootstrap"
import IdeaList from "../components/IdeaList"
import IdeaForm from "../components/ideaForm"
import { ideaApi } from "../api/ideaApi"

const HomePage = () => {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingIdea, setEditingIdea] = useState(null)
  const [toast, setToast] = useState({ show: false, message: "", variant: "success" })

  useEffect(() => {
    loadIdeas()
  }, [])

  const loadIdeas = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await ideaApi.getAllIdeas()
      setIdeas(response.data)
    } catch (err) {
      setError("Failed to load ideas. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant })
  }

  const handleAddIdea = () => {
    setEditingIdea(null)
    setShowForm(true)
  }

  const handleEditIdea = (idea) => {
    setEditingIdea(idea)
    setShowForm(true)
  }

  const handleFormSubmit = async (formData) => {
    setFormLoading(true)
    try {
      if (editingIdea) {
        await ideaApi.updateIdea(editingIdea.id, formData)
        showToast("Idea updated successfully!")
      } else {
        await ideaApi.createIdea(formData)
        showToast("Idea added successfully!")
      }
      setShowForm(false)
      setEditingIdea(null)
      await loadIdeas()
    } catch (err) {
      showToast("Failed to save idea. Please try again.", "danger")
      console.error(err)
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteIdea = async (ideaId) => {
    if (!window.confirm("Are you sure you want to delete this idea?")) return

    try {
      await ideaApi.deleteIdea(ideaId)
      showToast("Idea deleted successfully!")
      await loadIdeas()
    } catch (err) {
      showToast("Failed to delete idea. Please try again.", "danger")
      console.error(err)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingIdea(null)
  }

  return (
    <div className="position-relative min-vh-100 min-vw-100">
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('src/assets/images/bg7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      ></div>

      <div
        className="position-relative d-flex justify-content-center align-items-center min-vh-100 min-vw-100 px-3 py-4"
        style={{ zIndex: 1 }}
      >
        <div className="bg-white shadow-lg rounded-4 p-4 w-100" style={{ maxWidth: "960px" }}>
          <Row className="mb-4">
            <Col>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-center text-md-start">
                <div>
                  <h1 className="fs-3 fw-semibold text-dark mb-1">💡 Idea Board</h1>
                  <p className="text-secondary small mb-0">
                    You've got <strong>{ideas.length}</strong> {ideas.length === 1 ? "idea" : "ideas"} in your collection
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddIdea}
                  className="px-4 py-2 fw-medium rounded-3 shadow-sm"
                >
                  + New Idea
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <IdeaList
                ideas={ideas}
                onEdit={handleEditIdea}
                onDelete={handleDeleteIdea}
                loading={loading}
                error={error}
              />
            </Col>
          </Row>

          <IdeaForm
            show={showForm}
            handleClose={handleCloseForm}
            onSubmit={handleFormSubmit}
            editingIdea={editingIdea}
            loading={formLoading}
          />

          <ToastContainer position="top-end" className="p-3">
            <Toast
              show={toast.show}
              onClose={() => setToast({ ...toast, show: false })}
              delay={4000}
              autohide
              className="shadow rounded-3 border-0"
            >
              <Toast.Body
                className={`p-3 text-white fw-medium rounded-3 ${
                  toast.variant === "success" ? "bg-success" : "bg-danger"
                }`}
              >
                {toast.message}
              </Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
      </div>
    </div>
  )
}

export default HomePage
