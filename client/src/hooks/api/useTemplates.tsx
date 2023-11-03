//@ts-nocheck
import axios from "axios"
import { useEffect, useState } from "react"
import useAuth from "../useAuth"
import useAxiosPrivate from "../useAxiosPrivate"
import useToast from "../useToast"

const useTemplates = () => {
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

    // console.log("data sent: ", dataToSend)
    // console.log("user id", auth.userId)

    try {
      await axiosPrivate.post(TEMPLATES_URL, dataToSend)
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
      // console.log(updatedSessionData)
      //   getUserTemplates()
      //   templateUpdated()
      //   onClose()
    } catch (error) {
      console.error("Error updating template:", error)
      return false
      // navigate("/login", { state: { from: location }, replace: true })
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

  return {
    userTemplatesData,
    getUserTemplates,
    createUserTemplate,
    updateUserTemplate,
    deleteUserTemplate,
    isLoading,
  }
}

export default useTemplates
