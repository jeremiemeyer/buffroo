//@ts-nocheck
import { useState, useEffect } from "react"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import {
  Input,
  Select,
  Tab,
  Tabs,
  TabList,
  TabIndicator,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { createPortal } from "react-dom"
import EditExerciseModal from "./ExerciseEditModal"
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  {
    average: 400,
    today: 240,
  },
  {
    average: 300,
    today: 139,
  },
  {
    average: 200,
    today: 980,
  },
  {
    average: 278,
    today: 390,
  },
  {
    average: 189,
    today: 480,
  },
  {
    average: 239,
    today: 380,
  },
  {
    average: 349,
    today: 430,
  },
]

export default function ExerciseStatsModal({
  onClose,
  selectedExerciseId,
  exerciseData,
}) {
  const EXERCISE_DATA_URL = `/api/exercises/${selectedExerciseId}`
  const [thisExerciseData, setThisExerciseData] = useState(exerciseData)
  const axiosPrivate = useAxiosPrivate()
  const [showEditExerciseModal, setShowEditExerciseModal] = useState(false)

  return (
    <>
      <div
        onClick={onClose}
        className="fixed z-[700] inset-0 bg-slate-700/75 flex justify-center items-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-[900] relative bg-gray-50 text-slate-900  px-6 pt-6 pb-6 rounded-2xl border border-slate-600 "
        >
          <div className="flex flex-row justify-between items-center text-center">
            <h1 className="text-3xl text-center px-5">
              {thisExerciseData["name"]}
            </h1>
            <Button onClick={onClose} variant="destructive">
              X
            </Button>
          </div>

          <div className="pt-4">
            {/* <p>{exerciseData["bodypart"]}</p>
            <p>{exerciseData["category"]}</p> */}

            <Tabs position="relative" variant="unstyled">
              <TabList>
                <Tab>History</Tab>
                <Tab>Charts</Tab>
                <Tab>Records</Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
              />
              <TabPanels>
                <TabPanel>
                  <p>Feature in development.</p>
                </TabPanel>
                <TabPanel>
                  <ResponsiveContainer width="99%" aspect={1}>
                    <LineChart
                      data={data}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 0,
                      }}
                    >
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      Average
                                    </span>
                                    <span className="font-bold text-muted-foreground">
                                      {payload[0].value}
                                    </span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      Today
                                    </span>
                                    <span className="font-bold">
                                      {payload[1].value}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          }

                          return null
                        }}
                      />
                      <Line
                        type="monotone"
                        strokeWidth={2}
                        dataKey="average"
                        activeDot={{
                          r: 6,
                          style: {
                            fill: "red",
                            opacity: 0.25,
                          },
                        }}
                        style={
                          {
                            stroke: "red",
                            opacity: 0.25,
                            red: `blue`,
                          } as React.CSSProperties
                        }
                      />
                      <Line
                        type="monotone"
                        dataKey="today"
                        strokeWidth={2}
                        activeDot={{
                          r: 8,
                          style: { fill: "red" },
                        }}
                        style={
                          {
                            stroke: "red",
                            red: `blue`,
                          } as React.CSSProperties
                        }
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabPanel>
                <TabPanel>
                  <p>Feature in development.</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
      {showEditExerciseModal &&
        createPortal(
          <EditExerciseModal
            onClose={() => setShowEditExerciseModal(false)}
            selectedExerciseId={selectedExerciseId}
          />,
          document.body
        )}
    </>
  )
}
