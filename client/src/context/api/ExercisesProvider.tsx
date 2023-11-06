//@ts-nocheck
import { createContext, useEffect, useState } from "react"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"

const ExercisesContext = createContext({})

export const ExercisesProvider = ({children}) => {
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
  
    const addNewUserExercise = async ({ userId, newExerciseData }) => {
      const USER_EXERCISES_URL = `/api/users/${userId}/exercises`
      try {
        const response = await axiosPrivate.post(
          USER_EXERCISES_URL,
          newExerciseData
        )
        const updatedExercisesData = [...exercisesData, newExerciseData]
        setExercisesData(updatedExercisesData)
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
  
  
    return (
      <ExercisesContext.Provider
        value={{
          exercisesData,
          setExercisesData,
          isLoading,
          getAllExercises,
          addNewUserExercise,
          editUserExercise,
        }}
      >
        {children}
      </ExercisesContext.Provider>
    )
  }

  export default ExercisesContext