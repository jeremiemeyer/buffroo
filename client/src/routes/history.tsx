import WorkoutSessionCard from "../components/history/WorkoutSessionCard"
import Title from "../components/layout/Title"
import { useState, useEffect } from "react"
import axios from "axios"

export default function History() {
  const [historyData, setHistoryData] = useState([])

  const getWorkoutHistory = async () => {
    try {
      const response = await axios.get("http://localhost:3000/history")
      setHistoryData(response.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    getWorkoutHistory()
  }, [])

  return (
    <>
      <div className="px-6 pt-[100px] h-[100%]">
        <Title className="h-[10%]">History</Title>
        <div className="h-[90%] w-[100%] overflow-auto pt-4">
          {historyData.map((index) => (
            <WorkoutSessionCard key={index} sessionData={historyData[index]} />
          ))}
        </div>

        {/* <button onClick={() => console.log(historyData[0])}>ok</button> */}
      </div>
    </>
  )
}
