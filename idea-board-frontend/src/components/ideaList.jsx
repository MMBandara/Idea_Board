"use client"
import { Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap"

const IdeaList = ({ ideas, onEdit, onDelete, loading, error }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" className="text-primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading ideas...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="danger" className="rounded-4 border-0 shadow-sm">
        <Alert.Heading className="fs-5">Error!</Alert.Heading>
        <p className="mb-0">{error}</p>
      </Alert>
    )
  }

  if (ideas.length === 0) {
    return (
      <Alert variant="info" className="rounded-4 border-0 shadow-sm bg-light">
        <Alert.Heading className="fs-5 text-primary">No Ideas Yet!</Alert.Heading>
        <p className="mb-0 text-muted">Start by adding your first idea using the "New Idea" button above.</p>
      </Alert>
    )
  }

  return (
    <Row className="g-3">
      {ideas.map((idea) => (
        <Col key={idea.id} xs={12} sm={6} md={4} lg={3}>
          <Card className="h-100 border border-dark shadow p-3 rounded-3">
            <Card.Body className="p-3 d-flex flex-column">
              <div className="mb-3">
                <Card.Title className="fs-6 fw-semibold mb-2 text-dark">{idea.title}</Card.Title>
                <Card.Text className="text-muted small flex-grow-1">{idea.description}</Card.Text>
              </div>

              <div className="mt-auto">
                <div className="mb-3">
                  <small className="text-muted fw-medium">{formatDate(idea.createdAt)}</small>
                </div>

                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onEdit(idea)}
                    className="flex-fill rounded-2 fw-medium"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(idea.id)}
                    className="flex-fill rounded-2 fw-medium"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default IdeaList
