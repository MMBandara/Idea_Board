// Real API calls to match your Spring Boot backend
const API_BASE_URL = "http://localhost:8080/api/ideas" 

export const ideaApi = {
  getAllIdeas: async () => {
    const response = await fetch(`${API_BASE_URL}`)
    if (!response.ok) {
      throw new Error("Failed to fetch ideas")
    }
    const data = await response.json()
    return { data }
  },

  // Get idea by ID
  getIdeaById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`)
    if (!response.ok) {
      throw new Error("Idea not found")
    }
    const data = await response.json()
    return { data }
  },

  // Create new idea
  createIdea: async (ideaData) => {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: ideaData.title,
        description: ideaData.description,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create idea")
    }

    const data = await response.json()
    return { data }
  },

  // Update idea
  updateIdea: async (id, ideaData) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: ideaData.title,
        description: ideaData.description,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to update idea")
    }

    const data = await response.json()
    return { data }
  },

  // Delete idea
  deleteIdea: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete idea")
    }

    return { data: { message: "Idea deleted successfully" } }
  },
}
