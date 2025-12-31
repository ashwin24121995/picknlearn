import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Target, Users, TrendingUp, Heart, Award, BookOpen, Brain, Trophy, LineChart, Sparkles, CheckCircle2 } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Educational Focus",
      description: "We prioritize learning and skill development over gambling, providing comprehensive educational resources that empower users to make informed decisions based on knowledge and analysis."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by fantasy cricket enthusiasts for enthusiasts, fostering a supportive learning community where players share insights, strategies, and experiences to grow together."
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Approach",
      description: "Teaching analytical thinking and statistical reasoning for informed decision-making. We emphasize the importance of data analysis, player metrics, and match conditions in fantasy cricket success."
    },
    {
      icon: Heart,
      title: "Responsible Gaming",
      description: "Promoting ethical play, bankroll management, and responsible gaming practices. We advocate for setting limits, maintaining balance, and treating fantasy sports as entertainment rather than income."
    },
    {
      icon: Award,
      title: "Expert Content",
      description: "Lessons and strategies developed by experienced fantasy cricket analysts and players who have achieved consistent success through systematic approaches and continuous learning."
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "Clear, honest information about strategies, probabilities, and realistic expectations. We don't promise guaranteed wins—we teach sustainable skills and decision-making frameworks."
    },
  ];

  const offerings = [
    {
      icon: BookOpen,
      title: "Comprehensive Lesson Library",
      description: "Access 8+ detailed lessons covering everything from fantasy cricket fundamentals to advanced strategies. Each lesson includes real match examples, statistical analysis, and practical applications.",
      features: [
        "Beginner-friendly fundamentals",
        "Player analysis techniques",
        "Scoring system mastery",
        "Team building strategies",
        "Advanced captain selection",
        "Contest-specific tactics"
      ]
    },
    {
      icon: Brain,
      title: "Interactive Quiz System",
      description: "Test and reinforce your knowledge with our comprehensive quiz system featuring multiple question types, instant feedback, and detailed explanations for every answer.",
      features: [
        "Multiple-choice questions",
        "Scenario-based problems",
        "Instant feedback and scoring",
        "Detailed answer explanations",
        "Progress tracking",
        "Retake quizzes anytime"
      ]
    },
    {
      icon: Trophy,
      title: "Progress Tracking Dashboard",
      description: "Monitor your learning journey with our comprehensive dashboard that tracks completed lessons, quiz scores, achievements, and provides personalized insights into your progress.",
      features: [
        "Lesson completion tracking",
        "Quiz performance history",
        "Achievement badges",
        "Learning streak monitoring",
        "Personalized statistics",
        "Bookmark favorite content"
      ]
    },
    {
      icon: LineChart,
      title: "Extensive Glossary",
      description: "Master fantasy cricket terminology with our searchable glossary containing 30+ terms with clear definitions, practical examples, and related concepts to build your vocabulary.",
      features: [
        "50+ fantasy cricket terms",
        "Clear, concise definitions",
        "Real-world examples",
        "Related concept links",
        "Searchable interface",
        "Category filtering"
      ]
    }
  ];

  const journey = [
    {
      phase: "Foundation",
      title: "Understanding the Basics",
      description: "Start with fundamental concepts including fantasy cricket rules, player roles, scoring systems, and basic team composition. Learn how points are calculated and what makes a successful fantasy team.",
      duration: "Week 1-2"
    },
    {
      phase: "Analysis",
      title: "Player & Match Analysis",
      description: "Develop analytical skills to evaluate player form, match conditions, pitch types, and head-to-head statistics. Learn to identify value picks and avoid common traps.",
      duration: "Week 3-4"
    },
    {
      phase: "Strategy",
      title: "Team Building Mastery",
      description: "Master advanced team building techniques including budget allocation, captain selection, differential picks, and lineup construction for different contest types.",
      duration: "Week 5-6"
    },
    {
      phase: "Advanced",
      title: "Contest-Specific Tactics",
      description: "Learn specialized strategies for head-to-head contests, grand prix tournaments, multi-entry approaches, and bankroll management for sustainable long-term success.",
      duration: "Week 7+"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="glass-card px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              About Us
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Pick N Learn
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Your trusted educational platform for mastering fantasy cricket strategies through comprehensive lessons, interactive quizzes, and data-driven insights.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center gap-3">
                  <Target className="w-8 h-8 text-blue-400" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  Pick N Learn was created to bridge the gap between casual fantasy cricket participation and strategic mastery. We believe that success in fantasy sports comes from <strong className="text-white">knowledge, analysis, and informed decision-making</strong>—not luck alone.
                </p>
                <p className="leading-relaxed">
                  Our mission is to democratize fantasy cricket education by providing <strong className="text-white">accessible, comprehensive, and actionable learning resources</strong> that empower players of all skill levels to improve their understanding and performance.
                </p>
                <p className="leading-relaxed">
                  We strive to create a learning environment that emphasizes <strong className="text-white">responsible gaming, analytical thinking, and continuous improvement</strong> while fostering a supportive community of fantasy cricket enthusiasts.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-purple-400" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  We envision a future where every fantasy cricket participant has access to <strong className="text-white">professional-grade education and analytical tools</strong>, enabling them to compete at the highest level through skill and knowledge.
                </p>
                <p className="leading-relaxed">
                  Our goal is to become the <strong className="text-white">leading educational platform</strong> for fantasy cricket, recognized for our comprehensive curriculum, expert content, and commitment to responsible gaming practices.
                </p>
                <p className="leading-relaxed">
                  We aim to build a global community of informed, analytical, and responsible fantasy cricket players who approach the game with <strong className="text-white">strategic thinking and data-driven decision-making</strong>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-slate-900/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Core Values</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The principles that guide everything we do at Pick N Learn
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="glass-card hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-6">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 border border-blue-500/30">
                      <Icon className="h-7 w-7 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What We Offer</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive resources designed to accelerate your fantasy cricket learning journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {offerings.map((offering, index) => {
              const Icon = offering.icon;
              return (
                <Card key={index} className="glass-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center border border-green-500/30">
                        <Icon className="h-6 w-6 text-green-400" />
                      </div>
                      <CardTitle className="text-2xl text-white">{offering.title}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-300 text-base leading-relaxed">
                      {offering.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {offering.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
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

      {/* Learning Journey */}
      <section className="py-16 bg-slate-900/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Your Learning Journey</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A structured path from beginner to advanced fantasy cricket strategist
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {journey.map((stage, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-shrink-0">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm">
                        {stage.phase}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white">{stage.title}</h3>
                        <span className="text-sm text-gray-400 mt-1 md:mt-0">{stage.duration}</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{stage.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-3xl text-white text-center">Why Choose Pick N Learn?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">1. Comprehensive Curriculum</h4>
                  <p className="leading-relaxed">
                    Unlike scattered blog posts or YouTube videos, our structured curriculum takes you from fundamentals to advanced strategies in a logical, progressive manner. Each lesson builds on previous knowledge, ensuring deep understanding rather than surface-level tips.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">2. Real-World Examples</h4>
                  <p className="leading-relaxed">
                    Every strategy and concept is illustrated with actual match examples, real player statistics, and practical scenarios you'll encounter in fantasy cricket. We don't just teach theory—we show you how to apply it.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">3. Interactive Learning</h4>
                  <p className="leading-relaxed">
                    Passive reading isn't enough. Our interactive quizzes, progress tracking, and achievement system keep you engaged and motivated while reinforcing key concepts through active recall and spaced repetition.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">4. Responsible Gaming Focus</h4>
                  <p className="leading-relaxed">
                    We're committed to promoting responsible participation in fantasy sports. Our content emphasizes bankroll management, realistic expectations, and healthy gaming habits—because sustainable success is more important than short-term wins.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">5. Continuously Updated</h4>
                  <p className="leading-relaxed">
                    Fantasy cricket evolves with new platforms, rule changes, and emerging strategies. We regularly update our content to reflect the latest trends, ensuring you're always learning current, relevant information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 bg-slate-900/30">
        <div className="container">
          <Card className="glass-card max-w-4xl mx-auto border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center flex items-center justify-center gap-2">
                <Shield className="w-6 h-6 text-yellow-400" />
                Important Notice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300 text-center">
              <p className="leading-relaxed">
                <strong className="text-white">Pick N Learn is an educational platform only.</strong> We provide learning resources about fantasy cricket strategies and analytical skills. We do not operate fantasy sports contests, handle real money transactions, provide gambling services, or facilitate betting of any kind.
              </p>
              <p className="leading-relaxed">
                All content on this platform is <strong className="text-white">for educational and informational purposes only</strong>. It should not be considered as financial, investment, or professional advice. Users should conduct their own research and exercise independent judgment when participating in fantasy sports.
              </p>
              <p className="leading-relaxed">
                We strongly encourage <strong className="text-white">responsible participation</strong> in fantasy sports and compliance with all applicable local laws and regulations. Fantasy sports should be treated as entertainment, not as a source of income.
              </p>
              <p className="leading-relaxed text-yellow-400 font-semibold">
                You must be 18+ years of age to use this platform. Residents of restricted states (Assam, Odisha, Telangana, Andhra Pradesh, Sikkim, Nagaland) should verify local laws before participating in fantasy sports.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container">
          <Card className="glass-card max-w-3xl mx-auto bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Master Fantasy Cricket?
              </h2>
              <p className="text-xl text-gray-300">
                Start your learning journey today and transform from a casual player to a strategic expert.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a 
                  href="/lessons" 
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform"
                >
                  Start Learning
                  <BookOpen className="w-5 h-5 ml-2" />
                </a>
                <a 
                  href="/quizzes" 
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg glass-card text-white font-semibold hover:scale-105 transition-transform"
                >
                  Take a Quiz
                  <Brain className="w-5 h-5 ml-2" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
