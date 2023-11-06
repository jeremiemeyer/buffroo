//@ts-nocheck
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Icon,
  Select,
} from "@chakra-ui/react"
import {
  HamburgerIcon,
  DeleteIcon,
  ArrowDownIcon,
  EditIcon,
  RepeatClockIcon,
} from "@chakra-ui/icons"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { FaEllipsisH } from "react-icons/fa"
import { GoGoal } from "react-icons/go"
import useExercises from "@/hooks/api/useExercises"
import useSessions from "@/hooks/api/useSessions"
import { useEffect, useState } from "react"
import { extractBestSetsWithDate } from "@/utils/dashboard/extractBestSetsWithDate"

export default function ExerciseProgress() {
  const { exercisesData } = useExercises()
  const { sessionsData } = useSessions()
  const [selectedExerciseId, setSelectedExerciseId] = useState(null)

  useEffect(() => {
    if (exercisesData.length > 0) {
      setSelectedExerciseId(exercisesData[1]._id)
    }
  }, [exercisesData])

  function handleSelectExercise(e) {
    setSelectedExerciseId(e.target.value)
  }

  return (
    <>
      <div className="flex flex-col justify-center border border-gray-200 bg-white rounded-3xl p-6 max-w-[800px] mx-auto">
        {/* <button onClick={() => console.log(exercisesData[1].name)}>
          Consolelog exercisesData[1]
        </button> */}
        {/* <button onClick={() => console.log(selectedExerciseId)}>
          Consolelog id exercice sélectionné
        </button> */}

        <div className="flex flex-row items-center pb-8">
          <h1 className="font-semibold text-xl flex grow ">Best set</h1>
          <h2 className="px-4">
            <Select
              placeholder="Exercise name"
              value={selectedExerciseId && selectedExerciseId}
              onChange={(e) => handleSelectExercise(e)}
            >
              {exercisesData.map((exercise, index) => (
                <option key={index} value={exercise._id}>
                  {exercise.name}
                </option>
              ))}
            </Select>
          </h2>
          <div className="space-x-2">
            {" "}
            <Menu variant="filled">
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<Icon as={FaEllipsisH} />}
                textColor="rgba(14,165,233,1)" //sky-500
                bg={"rgba(186,230,253,0.4)"}
                _hover={{ bg: "rgba(186,230,253,0.8)" }}
                outlineOffset={-1}
                //   onClick={() => setSelectedExerciseId(exerciseId)}
                className="hover:bg-gray-200"
              />
              <MenuList zIndex={"600"}>
                <MenuItem
                  icon={<DeleteIcon />}
                  // onClick={() => onClickExerciseStats(selectedExerciseId)}
                  // command="⌘T"
                >
                  Remove from dashboard
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        <div className="flex justify-center">
          {/* <button onClick={() => console.log(exercisesData)}>
            consolelog exercisesData
          </button> */}
          <ExerciseProgressLineChart
            selectedExerciseId={selectedExerciseId}
            sessionsData={sessionsData}
          />
        </div>
      </div>
    </>
  )
}

function ExerciseProgressLineChart({ sessionsData, selectedExerciseId }) {
  const data = extractBestSetsWithDate({ sessionsData, selectedExerciseId })
  return (
    <>
      {data.length > 0 ? (
        <>
          <ResponsiveContainer width="99%" aspect={2}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis dataKey="weight" />
              <Tooltip
                formatter={(value, name, props) => {
                  return `${props.payload.bestSet}`
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="weight"
                name="Best set"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      ) : (
        <p>No data found for this exercise.</p>
      )}
    </>
  )
}
