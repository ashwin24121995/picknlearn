import { useRoute, Link, useLocation } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, ArrowLeft, Trophy, CheckCircle, XCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

export default function QuizDetail() {
  const [, params] = useRoute("/quizzes/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug || "";
  const { isAuthenticated } = useAuth();

  const { data: quiz, isLoading } = trpc.quizzes.getBySlug.useQuery({ slug });
  const submitMutation = trpc.quizzes.submitAttempt.useMutation();

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Timer
  useEffect(() => {
    if (quiz?.timeLimit && timeLeft === null && !isSubmitted) {
      setTimeLeft(quiz.timeLimit);
    }
  }, [quiz, timeLeft, isSubmitted]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId.toString()]: answer }));
  };

  const handleSubmit = async () => {
    if (!quiz || !isAuthenticated) {
      toast.error("Please sign in to submit the quiz");
      return;
    }

    const startTime = quiz.timeLimit || 0;
    const timeSpent = timeLeft !== null ? startTime - timeLeft : null;

    try {
      const result = await submitMutation.mutateAsync({
        quizId: quiz.id,
        answers,
        timeSpent,
      });
      
      setResult(result);
      setIsSubmitted(true);
      toast.success(`Quiz submitted! Score: ${result.score}%`);
    } catch (error) {
      toast.error("Failed to submit quiz");
      console.error(error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "badge-primary";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <Card>
            <CardContent className="p-8">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-2/3" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-12">
          <Card className="text-center py-12">
            <CardContent>
              <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Quiz Not Found</h3>
              <p className="text-muted-foreground mb-6">
                The quiz you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/quizzes">
                <a>
                  <Button>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Quizzes
                  </Button>
                </a>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isSubmitted && result) {
    const passed = result.isPassed;
    
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-12">
          <Card className="premium-card max-w-2xl mx-auto">
            <CardHeader className="text-center">
              {passed ? (
                <CheckCircle className="h-20 w-20 mx-auto mb-4 text-green-400" />
              ) : (
                <XCircle className="h-20 w-20 mx-auto mb-4 text-red-400" />
              )}
              <CardTitle className="text-3xl mb-2">
                {passed ? "Congratulations!" : "Keep Practicing!"}
              </CardTitle>
              <p className="text-muted-foreground">
                {passed 
                  ? `You passed the quiz with ${result.score}%`
                  : `You scored ${result.score}%. Passing score is ${quiz.passingScore}%`
                }
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-lg bg-card">
                  <div className="text-3xl font-bold text-primary">{result.score}%</div>
                  <div className="text-sm text-muted-foreground">Your Score</div>
                </div>
                <div className="p-4 rounded-lg bg-card">
                  <div className="text-3xl font-bold text-primary">
                    {result.correctAnswers}/{result.totalQuestions}
                  </div>
                  <div className="text-sm text-muted-foreground">Correct Answers</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quizzes">
                  <a className="flex-1">
                    <Button variant="outline" className="w-full">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      All Quizzes
                    </Button>
                  </a>
                </Link>
                <Button 
                  className="flex-1 glow-primary" 
                  onClick={() => {
                    setAnswers({});
                    setIsSubmitted(false);
                    setResult(null);
                    setTimeLeft(quiz.timeLimit);
                  }}
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-12">
        {/* Back Button */}
        <Link href="/quizzes">
          <a>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Quizzes
            </Button>
          </a>
        </Link>

        {/* Quiz Header */}
        <Card className="premium-card mb-8">
          <CardContent className="p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <Badge className={getDifficultyColor(quiz.difficulty)}>
                  {quiz.difficulty}
                </Badge>
                {timeLeft !== null && (
                  <div className="flex items-center text-sm font-semibold">
                    <Clock className="h-4 w-4 mr-1 text-primary" />
                    {formatTime(timeLeft)}
                  </div>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Passing Score: {quiz.passingScore}%
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {quiz.title}
            </h1>
            
            <p className="text-lg text-muted-foreground">
              {quiz.description}
            </p>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          {quiz.questions?.map((question, index) => {
            const options = typeof question.options === 'string' 
              ? JSON.parse(question.options) 
              : question.options;
            
            return (
              <Card key={question.id} className="premium-card">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1} of {quiz.questions?.length}
                  </CardTitle>
                  <p className="text-base font-medium mt-2">{question.question}</p>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={answers[question.id.toString()] || ""}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                  >
                    <div className="space-y-3">
                      {Object.entries(options).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value={key} id={`q${question.id}-${key}`} />
                          <Label 
                            htmlFor={`q${question.id}-${key}`}
                            className="flex-1 cursor-pointer text-base"
                          >
                            {value as string}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          {isAuthenticated ? (
            <Button 
              size="lg" 
              className="glow-primary px-12"
              onClick={handleSubmit}
              disabled={submitMutation.isPending || Object.keys(answers).length === 0}
            >
              <Trophy className="h-5 w-5 mr-2" />
              {submitMutation.isPending ? "Submitting..." : "Submit Quiz"}
            </Button>
          ) : (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                Please sign in to submit your quiz answers
              </p>
              <a href={`/api/oauth/login?redirect=${encodeURIComponent(window.location.pathname)}`}>
                <Button className="glow-primary">
                  Sign In to Continue
                </Button>
              </a>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
