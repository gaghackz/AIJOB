"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import axios from "axios"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"

interface Question {
  id: number
  level: string
  category: string
  question: string
}

export default function InterviewPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  // State to hold all answers and evaluations, keyed by question index
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [evaluations, setEvaluations] = useState<{ [key: number]: string | null }>({})
  const [isEvaluating, setIsEvaluating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedQuestions = sessionStorage.getItem("interviewQuestions")
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions))
    } else {
      router.push("/")
    }
  }, [router])

  const currentQuestion = questions[currentQuestionIndex]
  const currentAnswer = answers[currentQuestionIndex] || ""
  const currentEvaluation = evaluations[currentQuestionIndex]

  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim() || !currentQuestion) return

    setIsEvaluating(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DEV}/api/v1/evaluate`, {
        question: currentQuestion.question,
        response: currentAnswer,
      })
      // Save evaluation for the specific question index
      setEvaluations(prev => ({
        ...prev,
        [currentQuestionIndex]: response.data.message || "Evaluation completed",
      }))
    } catch (error) {
      console.error("Error evaluating answer:", error)
      setEvaluations(prev => ({
        ...prev,
        [currentQuestionIndex]: "Error occurred during evaluation. Please try again.",
      }))
    } finally {
      setIsEvaluating(false)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      alert("Interview completed! Thank you for your responses.")
      router.push("/")
    }
  }

  // New: Function to go to the previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // New: Function to skip the current question (same logic as next)
  const handleSkipQuestion = () => {
    handleNextQuestion()
  }
  
  // New: Helper function to update the answer for the current question
  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: e.target.value,
    }))
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading questions...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Interview Questions</h1>
          <p className="text-slate-300">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        <Card className="bg-slate-800/40 border-slate-500/40 backdrop-blur-2xl">
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                ID: {currentQuestion.id}
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-400">
                {currentQuestion.level}
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400">
                {currentQuestion.category}
              </Badge>
            </div>
            <CardTitle className="text-white text-xl">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Your Answer:</label>
              <Textarea
                value={currentAnswer}
                onChange={handleAnswerChange}
                placeholder="Type your answer here..."
                className="min-h-[120px] bg-slate-700/50 border-slate-500/50 text-white placeholder-slate-400"
                disabled={isEvaluating || currentEvaluation != null}
              />
            </div>

            {currentEvaluation && (
              <Card className="bg-slate-700/50 border-slate-500/50">
                <CardHeader>
                  <CardTitle className="text-lg text-green-400">Evaluation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none text-slate-200">
                    <ReactMarkdown>{currentEvaluation}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between items-center pt-4">
              {/* Previous Button */}
              <Button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="text-black border-slate-500 hover:bg-slate-700 hover:text-white"
              >
                Previous
              </Button>

              {/* Action Buttons: Submit, Skip, Next */}
              <div className="flex gap-4">
                {!currentEvaluation ? (
                  <>
                    <Button
                      onClick={handleSkipQuestion}
                      variant="secondary"
                      className="bg-slate-600 hover:bg-slate-700 text-white"
                      disabled={isEvaluating}
                    >
                      Skip
                    </Button>
                    <Button
                      onClick={handleSubmitAnswer}
                      disabled={!currentAnswer.trim() || isEvaluating}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isEvaluating ? "Evaluating..." : "Submit Answer"}
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleNextQuestion} className="bg-green-600 hover:bg-green-700 text-white">
                    {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Interview"}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}