import { useRoute, Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, BookOpen } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { Streamdown } from "streamdown";

export default function LessonDetail() {
  const [, params] = useRoute("/lessons/:slug");
  const slug = params?.slug || "";

  const { data: lesson, isLoading } = trpc.lessons.getBySlug.useQuery({ slug });

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

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-12">
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Lesson Not Found</h3>
              <p className="text-muted-foreground mb-6">
                The lesson you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/lessons">
                <a>
                  <Button>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Lessons
                  </Button>
                </a>
              </Link>
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
        <Link href="/lessons">
          <a>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Lessons
            </Button>
          </a>
        </Link>

        {/* Lesson Header */}
        <Card className="premium-card mb-8">
          <CardContent className="p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className={getDifficultyColor(lesson.difficulty)}>
                {lesson.difficulty}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {lesson.estimatedMinutes} minutes
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {lesson.title}
            </h1>
            
            <p className="text-lg text-muted-foreground">
              {lesson.description}
            </p>
          </CardContent>
        </Card>

        {/* Lesson Content */}
        <Card className="premium-card">
          <CardContent className="p-8 prose prose-invert max-w-none">
            <Streamdown>{lesson.content}</Streamdown>
          </CardContent>
        </Card>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between">
          <Link href="/lessons">
            <a>
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Lessons
              </Button>
            </a>
          </Link>
          <Link href="/quizzes">
            <a>
              <Button className="glow-primary">
                Test Your Knowledge
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
