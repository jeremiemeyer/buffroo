import { Spinner } from "@chakra-ui/react"

export default function LoadingPage() {
  return (
    <>
      <main className="w-screen h-screen flex items-center justify-center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </main>
    </>
  )
}
