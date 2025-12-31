import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, Trophy, Target, TrendingUp, Users, Award, 
  CheckCircle2, ArrowRight, Sparkles, BarChart3, Brain,
  Zap, Shield, Clock, Star, ChevronRight, Play
} from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const { data: lessonCategories } = trpc.lessonCategories.list.useQuery();
  const { data: lessons } = trpc.lessons.list.useQuery();
  const { data: quizzes } = trpc.quizzes.list.useQuery();

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Lessons",
      description: "Master fantasy cricket fundamentals through advanced strategies with our structured curriculum covering player analysis, team building, scoring systems, and contest selection.",
      details: [
        "20+ in-depth lessons",
        "Beginner to advanced content",
        "Real match examples",
        "Step-by-step guides"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Trophy,
      title: "Interactive Quizzes",
      description: "Test your knowledge with comprehensive quizzes designed to reinforce learning. Get instant feedback, detailed explanations, and track your progress over time.",
      details: [
        "Multiple question types",
        "Instant feedback",
        "Detailed explanations",
        "Progress tracking"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Strategic Analysis",
      description: "Learn advanced analytical techniques for player selection, form analysis, pitch conditions, and match-ups. Make data-driven decisions to maximize your fantasy points.",
      details: [
        "Player form analysis",
        "Pitch condition strategies",
        "Match-up insights",
        "Statistical breakdowns"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics. Track completed lessons, quiz scores, achievements, and maintain learning streaks to stay motivated.",
      details: [
        "Personalized dashboard",
        "Achievement system",
        "Learning streaks",
        "Performance analytics"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Brain,
      title: "Expert Strategies",
      description: "Access proven strategies from fantasy cricket experts. Learn captain selection techniques, budget allocation methods, and contest-specific approaches.",
      details: [
        "Captain selection frameworks",
        "Budget optimization",
        "Contest strategies",
        "Risk management"
      ],
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Community Insights",
      description: "Benefit from collective wisdom with curated glossary terms, common mistakes to avoid, and best practices shared by successful fantasy cricket players.",
      details: [
        "50+ glossary terms",
        "Common pitfalls",
        "Best practices",
        "Pro tips"
      ],
      color: "from-pink-500 to-rose-500"
    }
  ];

  const learningPaths = [
    {
      title: "Beginner Path",
      description: "Start your fantasy cricket journey with foundational concepts",
      lessons: ["Fantasy Cricket Basics", "Understanding Scoring", "Player Roles", "Team Building 101"],
      duration: "2-3 hours",
      icon: Play,
      color: "bg-green-500/10 border-green-500/30 text-green-400"
    },
    {
      title: "Intermediate Path",
      description: "Develop advanced analytical skills and strategic thinking",
      lessons: ["Player Analysis", "Form Evaluation", "Contest Selection", "Budget Management"],
      duration: "4-5 hours",
      icon: TrendingUp,
      color: "bg-blue-500/10 border-blue-500/30 text-blue-400"
    },
    {
      title: "Advanced Path",
      description: "Master expert-level strategies and optimization techniques",
      lessons: ["Captain Selection", "Differential Picks", "Multi-Entry Strategy", "Tournament Tactics"],
      duration: "5-6 hours",
      icon: Trophy,
      color: "bg-purple-500/10 border-purple-500/30 text-purple-400"
    }
  ];

  const stats = [
    { label: "Comprehensive Lessons", value: lessons?.length || "8+", icon: BookOpen },
    { label: "Interactive Quizzes", value: quizzes?.length || "5+", icon: Trophy },
    { label: "Glossary Terms", value: "30+", icon: Target },
    { label: "Learning Categories", value: lessonCategories?.length || "6", icon: Sparkles }
  ];

  const faqs = [
    {
      question: "What is fantasy cricket?",
      answer: "Fantasy cricket is a skill-based online game where you create virtual teams of real cricket players. You earn points based on how these players perform in actual matches. The better your players perform, the more points you score."
    },
    {
      question: "Who is this platform for?",
      answer: "This platform is designed for anyone interested in fantasy cricket - from complete beginners who want to learn the basics, to intermediate players looking to improve their strategies, and advanced players seeking to master expert-level techniques."
    },
    {
      question: "How long does it take to complete all lessons?",
      answer: "The complete curriculum takes approximately 10-12 hours to finish. However, you can learn at your own pace. Each lesson is self-contained, allowing you to focus on specific topics based on your needs and interests."
    },
    {
      question: "Do I need prior cricket knowledge?",
      answer: "Basic cricket knowledge is helpful but not required. Our beginner lessons cover fundamental cricket concepts alongside fantasy cricket strategies. We explain player roles, match formats, and scoring systems from the ground up."
    },
    {
      question: "How do quizzes help my learning?",
      answer: "Quizzes reinforce key concepts through active recall, helping you retain information better. Each quiz provides instant feedback and detailed explanations, allowing you to identify knowledge gaps and strengthen your understanding."
    },
    {
      question: "Can I track my progress?",
      answer: "Yes! Your personalized dashboard tracks completed lessons, quiz scores, achievements, and learning streaks. This helps you monitor your improvement and stay motivated throughout your learning journey."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container relative py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="glass-card px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Your Complete Fantasy Cricket Education Platform
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Master Fantasy Cricket with{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Expert Guidance
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Learn proven strategies, analyze players like a pro, and build winning teams with our comprehensive educational platform. From fundamentals to advanced tactics, we've got you covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/lessons">
                <a>
                  <Button size="lg" className="text-lg px-8 py-6 glow-primary">
                    Start Learning
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </Link>
              <Link href="/quizzes">
                <a>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass-card">
                    Take a Quiz
                    <Trophy className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="glass-card p-6 text-center">
                    <Icon className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="glass-card px-4 py-2 mb-4">
              <Zap className="w-4 h-4 mr-2 inline" />
              Platform Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive tools and resources designed to transform you from a beginner to an expert fantasy cricket player
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass-card group hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-white">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-400 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-24 relative bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="glass-card px-4 py-2 mb-4">
              <Target className="w-4 h-4 mr-2 inline" />
              Learning Paths
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Choose Your Journey
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Structured learning paths tailored to your skill level, guiding you from basics to mastery
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {learningPaths.map((path, index) => {
              const Icon = path.icon;
              return (
                <Card key={index} className={`glass-card border-2 ${path.color} hover:scale-105 transition-all duration-300`}>
                  <CardHeader>
                    <Icon className="w-12 h-12 mb-4" />
                    <CardTitle className="text-2xl text-white">{path.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {path.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{path.duration}</span>
                    </div>
                    <div className="space-y-2">
                      {path.lessons.map((lesson, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" />
                          <span>{lesson}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/lessons">
                      <a>
                        <Button className="w-full mt-4">
                          Start This Path
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </a>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="glass-card px-4 py-2 mb-4">
              <Brain className="w-4 h-4 mr-2 inline" />
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Your Path to Success
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A simple, proven process to transform your fantasy cricket skills
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: "01", title: "Browse Lessons", description: "Explore our comprehensive library of lessons organized by category and difficulty level", icon: BookOpen },
              { step: "02", title: "Learn Concepts", description: "Study detailed content with real examples, strategies, and step-by-step guides", icon: Brain },
              { step: "03", title: "Test Knowledge", description: "Take interactive quizzes to reinforce learning and identify areas for improvement", icon: Trophy },
              { step: "04", title: "Track Progress", description: "Monitor your journey with achievements, streaks, and personalized analytics", icon: BarChart3 }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  {index < 3 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent -z-10" />
                  )}
                  <Card className="glass-card text-center hover:scale-105 transition-all duration-300">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-purple-400 mb-2">{item.step}</div>
                      <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="glass-card px-4 py-2 mb-4">
              <Shield className="w-4 h-4 mr-2 inline" />
              Frequently Asked Questions
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Got Questions? We've Got Answers
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    {faq.question}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-base leading-relaxed pl-8">
                    {faq.answer}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <Card className="glass-card border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
            <CardHeader className="text-center space-y-6 py-16">
              <div className="flex justify-center gap-2">
                <Award className="w-12 h-12 text-yellow-400" />
                <Trophy className="w-12 h-12 text-purple-400" />
                <Target className="w-12 h-12 text-green-400" />
              </div>
              <CardTitle className="text-4xl md:text-5xl font-bold text-white">
                Ready to Master Fantasy Cricket?
              </CardTitle>
              <CardDescription className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of players who have transformed their fantasy cricket skills with our comprehensive platform. Start your journey today!
              </CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/lessons">
                  <a>
                    <Button size="lg" className="text-lg px-8 py-6 glow-primary">
                      Start Learning Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </a>
                </Link>
                <Link href="/dashboard">
                  <a>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass-card">
                      View Dashboard
                      <BarChart3 className="ml-2 w-5 h-5" />
                    </Button>
                  </a>
                </Link>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Pick N Learn</h3>
              <p className="text-gray-400 text-sm">
                Your complete fantasy cricket education platform. Learn, practice, and excel.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Learn</h3>
              <ul className="space-y-2">
                <li><Link href="/lessons"><a className="text-gray-400 hover:text-white text-sm transition-colors">All Lessons</a></Link></li>
                <li><Link href="/quizzes"><a className="text-gray-400 hover:text-white text-sm transition-colors">Quizzes</a></Link></li>
                <li><Link href="/glossary"><a className="text-gray-400 hover:text-white text-sm transition-colors">Glossary</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="/dashboard"><a className="text-gray-400 hover:text-white text-sm transition-colors">Dashboard</a></Link></li>
                <li><Link href="/about"><a className="text-gray-400 hover:text-white text-sm transition-colors">About Us</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Pick N Learn. All rights reserved. Built for fantasy cricket enthusiasts.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
