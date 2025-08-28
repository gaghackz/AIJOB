"use client"
import { useState } from "react"
import AnimatedContent from "@/components/Animated"
import { UserButton, useUser } from "@clerk/nextjs"
import { OrbitProgress } from "react-loading-indicators"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser()
  const router = useRouter()
  const [starting, setStarting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  let name = ""
  if (isLoaded && isSignedIn) {
    name = user.firstName || user.username || ""
  }

  const handleStartInterview = async () => {
    setError(null)
    if (!isLoaded || !isSignedIn) return
    const email = user?.emailAddresses?.[0]?.emailAddress
    if (!email) {
      setError("No email found on your account.")
      return
    }
    setStarting(true)
    try {
      const res = await axios.post("http://localhost:3000/api/v1/generate-question", { email })

      let questions: unknown = null
      const data = res?.data

      if (Array.isArray(data)) {
        questions = data
      } else if (Array.isArray(data?.questions)) {
        questions = data.questions
      } else if (typeof data?.questions === "string") {
        try {
          questions = JSON.parse(data.questions)
        } catch {}
      } else if (typeof data?.questions?.text === "string") {
        try {
          // 👇 clean out markdown fences if present
          let raw = data.questions.text.trim()
          raw = raw.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/```$/, "")
          questions = JSON.parse(raw)
        } catch (err) {
          console.error("Error parsing questions.text:", err)
        }
      }

      if (!Array.isArray(questions)) {
        throw new Error("Unexpected questions format from server.")
      }

      sessionStorage.setItem("interviewQuestions", JSON.stringify(questions))
      router.push("/startinter")
    } catch (e) {
      console.error("[v0] Error starting interview:", e)
      setError("Failed to start the interview. Please try again.")
    } finally {
      setStarting(false)
    }
  }

  return (
    <div className="h-screen relative flex flex-col items-center justify-center bg-slate-950">
      <AnimatedContent>
        <div
          className="flex flex-col mt-10 items-center h-[40rem] w-[80rem] 
            rounded-[2rem] border border-slate-500/40 
            bg-slate-800/40 backdrop-blur-2xl shadow-2xl 
            p-12 transition-transform duration-500 hover:scale-[1.02]"
        >
          <div className="mt-15">
            <div className="flex flex-col justify-center items-center gap-15">
              <div className="scale-[500%]">
                <UserButton />
              </div>

              {!isLoaded ? (
                <OrbitProgress color={"#b8e2ff"} />
              ) : (
                <b className="text-white text-4xl font-bold tracking-wide mt-4">HELLO {name.toUpperCase()}!</b>
              )}

              <div className="text-white text-center mt-4 max-w-md">
                {isLoaded && isSignedIn
                  ? "Click below to start your interview. We'll fetch your questions after you confirm."
                  : "Please sign in to start the interview."}
              </div>

              <button
                onClick={handleStartInterview}
                disabled={!isLoaded || !isSignedIn || starting}
                className="mt-6 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium
                           border border-blue-500/60 shadow-md 
                           hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed
                           transition-all duration-300 ease-in-out"
                aria-disabled={!isLoaded || !isSignedIn || starting}
              >
                {starting ? "Starting..." : "Start the Interview!"}
              </button>

              {error && (
                <p className="mt-3 text-red-400 text-sm" role="alert">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </AnimatedContent>
    </div>
  )
}
