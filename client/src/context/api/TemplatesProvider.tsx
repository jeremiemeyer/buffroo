//@ts-nocheck
import axios from "axios"
import { useEffect, useState, createContext } from "react"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import useToast from "@/hooks/useToast"

const TemplatesContext = createContext({})

export const TemplatesProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [userTemplatesData, setUserTemplatesData] = useState([])
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const { cannotSubmitEmptyTemplate } = useToast()

  const getUserTemplates = async () => {
    const userId = auth.userId
    const TEMPLATES_URL = `/api/users/${userId}/templates`

    setIsLoading(true)
    try {
      const response = await axiosPrivate.get(TEMPLATES_URL, {
        withCredentials: true,
      })
      // isMounted &&
      setUserTemplatesData(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching user templates:", error)
    }
  }

  const createUserTemplate = async ({ userId, newTemplateData }) => {
    const TEMPLATES_URL = `/api/users/${userId}/templates`

    if (newTemplateData.exercises.length === 0) {
      return cannotSubmitEmptyTemplate()
    }

    const dataToSend = {
      ...newTemplateData,
    }

    try {
      await axiosPrivate.post(TEMPLATES_URL, dataToSend)
      setUserTemplatesData([...userTemplatesData, newTemplateData])
      return true
    } catch (error) {
      console.error("Error creating new template:", error)
      return false
    }
  }

  const updateUserTemplate = async ({
    userId,
    templateId,
    updatedTemplateData,
  }) => {
    const TEMPLATE_URL = `/api/users/${userId}/templates/${templateId}`

    try {
      const response = await axiosPrivate.put(TEMPLATE_URL, updatedTemplateData)
      const updatedTemplateDataResponse = response.data
      return true
    } catch (error) {
      console.error("Error updating template:", error)
      return false
    }
  }

  const deleteUserTemplate = async ({ userId, templateId }) => {
    try {
      const response = await axiosPrivate.delete(
        `/api/users/${auth.userId}/templates/${templateId}`,
        {
          withCredentials: true,
        }
      )
      return true
    } catch (error) {
      console.error("Error deleting session:", error)
      return false
    }
  }

  useEffect(() => {
    getUserTemplates()
  }, [])

  return (
    <TemplatesContext.Provider
      value={{
        userTemplatesData,
        getUserTemplates,
        createUserTemplate,
        updateUserTemplate,
        deleteUserTemplate,
        isLoading,
      }}
    >
      {children}
    </TemplatesContext.Provider>
  )
}

export default TemplatesContext