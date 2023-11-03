//@ts-nocheck
import axios from "axios"
import { useEffect, useState } from "react"
import useAuth from "../useAuth"
import useAxiosPrivate from "../useAxiosPrivate"

const useExercises = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [exercisesData, setExercisesData] = useState([])
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()

  const DEFAULT_EXERCISES_URL = "/api/exercises"
  const USER_EXERCISES_URL = `/api/users/${auth.userId}/exercises`

  const getAllExercises = async () => {
    setIsLoading(true)
    try {
      const response = await axiosPrivate.get(DEFAULT_EXERCISES_URL)
      const defaultExercises = response.data

      const userResponse = await axiosPrivate.get(USER_EXERCISES_URL)
      const userExercises = userResponse.data

      setExercisesData([...defaultExercises, ...userExercises])

      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      // navigate("/login", { state: { from: location }, replace: true })
    }
  }

  const addNewUserExercise = async ({ userId, exerciseData }) => {
    const USER_EXERCISES_URL = `/api/users/${userId}/exercises`
    try {
      await axiosPrivate.post(USER_EXERCISES_URL, exerciseData)
      setExercisesData([...exercisesData, exerciseData])
      return true
    } catch (error) {
      console.error("Error adding new exercise:", error)
      return false
    }
  }

  const editUserExercise = async ({
    userId,
    exerciseToEditId,
    updatedExerciseData,
  }) => {
    const EXERCISE_UPDATE_URL = `/api/users/${userId}/exercises/${exerciseToEditId}`
    console.log(exerciseToEditId)
    console.log(EXERCISE_UPDATE_URL)

    try {
      const response = await axiosPrivate.patch(EXERCISE_UPDATE_URL, {
        exerciseData: updatedExerciseData,
      })
      const updatedExercise = response.data
      return true
    } catch (error) {
      console.error("Error updating user exercise:", error)
      return false
      // navigate("/login", { state: { from: location }, replace: true })
    }
  }

  useEffect(() => {
    getAllExercises()
  }, [])

  return {
    exercisesData,
    isLoading,
    getAllExercises,
    addNewUserExercise,
    editUserExercise,
  }
}

export default useExercises
