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
import { extractBestSetsWithDate } from "@/utils/dashboard/extractBestSetsWithDate"

export function ExerciseBestSetLineChart({
    sessionsData,
    selectedExerciseId,
  }) {
    const data = extractBestSetsWithDate({ sessionsData, selectedExerciseId })
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
                <YAxis dataKey="weight" width={15} />
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
  