//@ts-nocheck
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
} from "recharts"

export default function WorkoutsPerWeekBarChart({ aggregatedData, goalValue }) {
  // Find the maximum value in your aggregated data
  const maxWorkouts = Math.max(...aggregatedData.map((item) => item.workouts))

  // Determine the domain range for the YAxis
  const yDomain = [0, Math.max(maxWorkouts, goalValue) + 1]

  return (
    <ResponsiveContainer width="99%" aspect={2}>
      <BarChart
        data={aggregatedData}
        margin={{
          top: 5,
          left: 10,
          bottom: 5,
        }}
      >
        <XAxis dataKey="week" fontSize={12} tickLine={false} axisLine={true} />
        <YAxis
          width={15}
          datakey="workouts"
          domain={yDomain}
          fontSize={12}
          tickLine={true}
          axisLine={true}
          tickFormatter={(value) => `${value}`}
          tickCount={Math.max(maxWorkouts, goalValue) + 2}
          interval={0}
        />
        <Bar dataKey="workouts" fill="rgb(37 99 235)" radius={[4, 4, 0, 0]} />
        <ReferenceLine
          y={goalValue}
          strokeWidth="2"
          stroke="rgba(255,0,0,0.8)"
        />
        <CartesianGrid
          horizontal={true}
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.05)"
        />
        {/* <Legend /> */}
      </BarChart>
    </ResponsiveContainer>
  )
}
