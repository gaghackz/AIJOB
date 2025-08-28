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
  const [answer, setAnswer] = useState("")
  const [evaluation, setEvaluation] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleSubmitAnswer = async () => {
    if (!answer.trim() || !currentQuestion) return

    setIsSubmitting(true)
    setIsEvaluating(true)

    try {
      const response = await axios.post("http://localhost:3000/api/v1/evaluate", {
        question: currentQuestion.question,
        response: answer,
      })

      setEvaluation(response.data.message || "Evaluation completed")
    } catch (error) {
      console.error("Error evaluating answer:", error)
      setEvaluation("Error occurred during evaluation. Please try again.")
    } finally {
      setIsSubmitting(false)
      setIsEvaluating(false)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setAnswer("")
      setEvaluation(null)
    } else {
      alert("Interview completed! Thank you for your responses.")
      router.push("/")
    }
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
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-[120px] bg-slate-700/50 border-slate-500/50 text-white placeholder-slate-400"
                disabled={isSubmitting || evaluation !== null}
              />
            </div>

            {evaluation && (
              <Card className="bg-slate-700/50 border-slate-500/50">
                <CardHeader>
                  <CardTitle className="text-lg text-green-400">Evaluation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none text-slate-200">
                    <ReactMarkdown>{evaluation}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-4">
              {!evaluation ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={!answer.trim() || isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isEvaluating ? "Evaluating..." : "Submit Answer"}
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} className="bg-green-600 hover:bg-green-700 text-white">
                  {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Interview"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
