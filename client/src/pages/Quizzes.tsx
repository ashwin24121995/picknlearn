import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Trophy, ArrowRight, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";
// Inline useAuth hook
function useAuth() {
  const { data: user } = trpc.auth.me.useQuery();
  return { isAuthenticated: !!user };
}

export default function Quizzes() {
  const { data: quizzes, isLoading } = trpc.quizzes.list.useQuery();
  const { isAuthenticated } = useAuth();

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-12 md:py-20 bg-card/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Trophy className="h-16 w-16 mx-auto text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Test Your Knowledge
            </h1>
            <p className="text-xl text-muted-foreground">
              Challenge yourself with interactive quizzes and track your progress
            </p>
          </div>
        </div>
      </section>

      {/* Quizzes Grid */}
      <section className="py-12">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : quizzes && quizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <Link key={quiz.id} href={`/quizzes/${quiz.slug}`}>
                  <a>
                    <Card className="premium-card hover-glow cursor-pointer h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getDifficultyColor(quiz.difficulty)}>
                            {quiz.difficulty}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            {quiz.timeLimit ? Math.floor(quiz.timeLimit / 60) : 'N/A'} min
                          </div>
                        </div>
                        <CardTitle className="line-clamp-2">{quiz.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {quiz.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Passing Score: {quiz.passingScore}%
                          </span>
                          {isAuthenticated && (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          )}
                        </div>
                        
                        <Button variant="ghost" className="w-full group">
                          <Trophy className="h-4 w-4 mr-2" />
                          Start Quiz
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Quizzes Available</h3>
                <p className="text-muted-foreground">
                  Quizzes will be added soon. Check back later!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
