import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";

export default function Lessons() {
  const { data: lessons, isLoading } = trpc.lessons.list.useQuery();
  const { data: categories } = trpc.lessonCategories.list.useQuery();

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

  const getCategoryById = (id: number) => {
    return categories?.find(c => c.id === id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-12 md:py-20 bg-card/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Fantasy Cricket Lessons
            </h1>
            <p className="text-xl text-muted-foreground">
              Master fantasy cricket with our comprehensive curriculum covering fundamentals to advanced strategies
            </p>
          </div>
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="py-12">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
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
          ) : lessons && lessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => {
                const category = getCategoryById(lesson.categoryId);
                return (
                  <Link key={lesson.id} href={`/lessons/${lesson.slug}`}>
                    <a>
                      <Card className="premium-card hover-glow cursor-pointer h-full">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={getDifficultyColor(lesson.difficulty)}>
                              {lesson.difficulty}
                            </Badge>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              {lesson.estimatedMinutes} min
                            </div>
                          </div>
                          <CardTitle className="line-clamp-2">{lesson.title}</CardTitle>
                          {category && (
                            <CardDescription className="text-xs">
                              {category.name}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                            {lesson.description}
                          </p>
                          <Button variant="ghost" className="w-full group">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Start Lesson
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </Card>
                    </a>
                  </Link>
                );
              })}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Lessons Available</h3>
                <p className="text-muted-foreground">
                  Lessons will be added soon. Check back later!
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
