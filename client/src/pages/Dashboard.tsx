import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, BookOpen, Trophy, Bookmark, TrendingUp, Award, Calendar, Target } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  
  const { data: stats, isLoading: statsLoading } = trpc.dashboard.getStats.useQuery(undefined, {
    enabled: !!user,
  });
  
  const { data: achievements, isLoading: achievementsLoading } = trpc.dashboard.getAchievements.useQuery(undefined, {
    enabled: !!user,
  });
  
  const { data: bookmarks, isLoading: bookmarksLoading } = trpc.dashboard.getBookmarks.useQuery(undefined, {
    enabled: !!user,
  });
  
  const { data: progress, isLoading: progressLoading } = trpc.dashboard.getAllProgress.useQuery(undefined, {
    enabled: !!user,
  });

  if (authLoading || statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 px-4">
        <Card className="glass-card max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Login Required
            </CardTitle>
            <CardDescription>
              Please log in to view your dashboard and track your progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href={getLoginUrl()}>Login to Continue</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completionPercentage = stats ? Math.round((stats.totalLessonsCompleted / 20) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-black/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Pick N Learn
              </a>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/lessons">
                <a className="text-gray-300 hover:text-white transition-colors">Lessons</a>
              </Link>
              <Link href="/quizzes">
                <a className="text-gray-300 hover:text-white transition-colors">Quizzes</a>
              </Link>
              <Link href="/glossary">
                <a className="text-gray-300 hover:text-white transition-colors">Glossary</a>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-400">Track your learning progress and achievements</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Lessons Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats?.totalLessonsCompleted || 0}</div>
              <Progress value={completionPercentage} className="mt-2" />
              <p className="text-xs text-gray-400 mt-2">{completionPercentage}% of total lessons</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Quizzes Passed</CardTitle>
              <Award className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats?.totalQuizzesPassed || 0}</div>
              <p className="text-xs text-gray-400 mt-2">
                {stats?.totalQuizzesTaken || 0} total attempts
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats?.averageQuizScore || 0}%</div>
              <p className="text-xs text-gray-400 mt-2">Across all quizzes</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Current Streak</CardTitle>
              <Calendar className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stats?.currentStreak || 0}</div>
              <p className="text-xs text-gray-400 mt-2">
                Longest: {stats?.longestStreak || 0} days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="glass-card">
            <TabsTrigger value="achievements">
              <Trophy className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="bookmarks">
              <Bookmark className="w-4 h-4 mr-2" />
              Bookmarks
            </TabsTrigger>
            <TabsTrigger value="progress">
              <Target className="w-4 h-4 mr-2" />
              Progress
            </TabsTrigger>
          </TabsList>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Your Achievements
                </CardTitle>
                <CardDescription>
                  {achievements?.length || 0} achievements unlocked
                </CardDescription>
              </CardHeader>
              <CardContent>
                {achievementsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                  </div>
                ) : achievements && achievements.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="p-4 rounded-lg bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20"
                      >
                        <div className="text-4xl mb-2">{achievement.icon}</div>
                        <h3 className="font-semibold text-white mb-1">{achievement.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                        <Badge variant="secondary" className="text-xs">
                          {achievement.category}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400">No achievements yet. Complete lessons and quizzes to unlock them!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Bookmarked Content
                </CardTitle>
                <CardDescription>
                  Quick access to your saved lessons and glossary terms
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bookmarksLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Bookmarked Lessons */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Lessons</h3>
                      {bookmarks?.lessons && bookmarks.lessons.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {bookmarks.lessons.map((lesson) => (
                            <Link key={lesson.id} href={`/lessons/${lesson.slug}`}>
                              <a className="block p-4 rounded-lg bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                                <h4 className="font-semibold text-white mb-1">{lesson.title}</h4>
                                <p className="text-sm text-gray-400 line-clamp-2">{lesson.description}</p>
                              </a>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">No bookmarked lessons yet</p>
                      )}
                    </div>

                    {/* Bookmarked Glossary Terms */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Glossary Terms</h3>
                      {bookmarks?.glossary && bookmarks.glossary.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {bookmarks.glossary.map((term) => (
                            <div
                              key={term.id}
                              className="p-4 rounded-lg bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/20"
                            >
                              <h4 className="font-semibold text-white mb-1">{term.term}</h4>
                              <p className="text-sm text-gray-400 line-clamp-2">{term.definition}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">No bookmarked glossary terms yet</p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Learning Progress
                </CardTitle>
                <CardDescription>
                  Track your completion status across all lessons
                </CardDescription>
              </CardHeader>
              <CardContent>
                {progressLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                  </div>
                ) : progress && progress.length > 0 ? (
                  <div className="space-y-3">
                    {progress.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-slate-900/50 to-slate-800/50 border border-slate-700/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${item.completed === "true" ? "bg-green-400" : "bg-gray-600"}`} />
                          <span className="text-white">Lesson #{item.lessonId}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{item.timeSpentMinutes} min</span>
                          {item.completedAt && (
                            <span>{new Date(item.completedAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400">No progress yet. Start learning to track your journey!</p>
                    <Button asChild className="mt-4">
                      <Link href="/lessons">
                        <a>Browse Lessons</a>
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
