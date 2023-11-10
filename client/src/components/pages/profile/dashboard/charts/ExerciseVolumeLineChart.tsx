//@ts-nocheck
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
import { extractVolumesWithDate } from "@/utils/dashboard/extractVolumesWithDate"

export function ExerciseVolumesLineChart({ sessionsData, selectedExerciseId }) {
    const data = extractVolumesWithDate({ sessionsData, selectedExerciseId })
    return (
      <>
        {data.length > 0 ? (
          <>
            {/* <button onClick={() => console.log(data)}>consolelog data</button> */}
            <ResponsiveContainer width="99%" aspect={1.5}>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="volume" width={15} />
                <Tooltip
                  formatter={(value, name, props) => {
                    return `${props.payload.volume} kg`
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="volume"
                  name="Volume"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        ) : (
          <p className="dark:text-white dark:text-opacity-70">No data found for this exercise.</p>
        )}
      </>
    )
  }