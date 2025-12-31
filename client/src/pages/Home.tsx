import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Trophy, BookMarked, TrendingUp, Users, Shield, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Lessons",
      description: "22+ detailed lessons covering everything from basics to advanced strategies",
    },
    {
      icon: Trophy,
      title: "Interactive Quizzes",
      description: "Test your knowledge with multiple question types and instant feedback",
    },
    {
      icon: BookMarked,
      title: "Extensive Glossary",
      description: "50+ fantasy cricket terms with definitions and examples",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your learning journey and achievements",
    },
    {
      icon: Users,
      title: "Expert Strategies",
      description: "Learn from proven tactics and analytical approaches",
    },
    {
      icon: Shield,
      title: "Responsible Gaming",
      description: "Emphasis on ethical play and fair gaming practices",
    },
  ];

  const categories = [
    { name: "Fundamentals", count: "6 lessons", color: "from-blue-500 to-cyan-500" },
    { name: "Player Analysis", count: "5 lessons", color: "from-purple-500 to-pink-500" },
    { name: "Scoring Systems", count: "4 lessons", color: "from-orange-500 to-red-500" },
    { name: "Team Building", count: "4 lessons", color: "from-green-500 to-emerald-500" },
    { name: "Advanced Strategies", count: "3 lessons", color: "from-indigo-500 to-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden animated-bg">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Master Fantasy Cricket with{" "}
              <span className="gradient-text">Expert Guidance</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Learn strategies, analyze players, and build winning teams with our comprehensive educational platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/lessons">
                <a>
                  <Button size="lg" className="glow-primary text-lg px-8">
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </Link>
              <Link href="/quizzes">
                <a>
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Take a Quiz
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-card/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive resources for fantasy cricket mastery
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className={`premium-card animate-fade-in stagger-${(index % 5) + 1}`}
                >
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Learning Paths
            </h2>
            <p className="text-xl text-muted-foreground">
              Structured curriculum from beginner to advanced
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href="/lessons">
                <a>
                  <Card className="premium-card hover-glow cursor-pointer">
                    <CardHeader>
                      <div className={`h-2 w-full rounded-full bg-gradient-to-r ${category.color} mb-4`} />
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription className="text-base">
                        {category.count}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/50">
        <div className="container">
          <Card className="premium-card text-center max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl">
                Ready to Start Your Journey?
              </CardTitle>
              <CardDescription className="text-lg mt-4">
                Join thousands of fantasy cricket enthusiasts learning to build winning strategies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/lessons">
                <a>
                  <Button size="lg" className="glow-primary text-lg px-12">
                    Explore Lessons
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Pick N Learn</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Educational platform for fantasy cricket strategies and analysis
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Learn</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/lessons"><a className="hover:text-foreground transition-colors">Lessons</a></Link></li>
                <li><Link href="/quizzes"><a className="hover:text-foreground transition-colors">Quizzes</a></Link></li>
                <li><Link href="/glossary"><a className="hover:text-foreground transition-colors">Glossary</a></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about"><a className="hover:text-foreground transition-colors">About Us</a></Link></li>
                <li><Link href="/fair-play"><a className="hover:text-foreground transition-colors">Fair Play</a></Link></li>
                <li><Link href="/compliance"><a className="hover:text-foreground transition-colors">Compliance</a></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy"><a className="hover:text-foreground transition-colors">Privacy Policy</a></Link></li>
                <li><Link href="/terms"><a className="hover:text-foreground transition-colors">Terms of Service</a></Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p>© 2026 Pick N Learn. Educational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
