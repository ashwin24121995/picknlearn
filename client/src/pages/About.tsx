import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Target, Users, TrendingUp, Heart, Award } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Educational Focus",
      description: "We prioritize learning and skill development over gambling, providing comprehensive educational resources."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by fantasy cricket enthusiasts for enthusiasts, fostering a supportive learning community."
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Approach",
      description: "Teaching analytical thinking and statistical reasoning for informed decision-making."
    },
    {
      icon: Heart,
      title: "Responsible Gaming",
      description: "Promoting ethical play, bankroll management, and responsible gaming practices."
    },
    {
      icon: Award,
      title: "Expert Content",
      description: "Lessons and strategies developed by experienced fantasy cricket analysts and players."
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "Clear, honest information about strategies, probabilities, and realistic expectations."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="py-12 md:py-20 bg-card/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              About Pick N Learn
            </h1>
            <p className="text-xl text-muted-foreground">
              Your trusted educational platform for mastering fantasy cricket strategies
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container">
          <Card className="premium-card max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Pick N Learn was created to bridge the gap between casual fantasy cricket participation 
                  and strategic mastery. We believe that success in fantasy sports comes from knowledge, 
                  analysis, and informed decision-making—not luck alone.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  Our platform provides comprehensive educational resources covering everything from basic 
                  concepts to advanced strategies, helping players of all skill levels improve their 
                  understanding and performance in fantasy cricket.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-card/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="premium-card">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What We Offer</h2>
            <div className="space-y-6">
              <Card className="premium-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Comprehensive Lessons</h3>
                  <p className="text-muted-foreground">
                    22+ detailed lessons covering fundamentals, player analysis, scoring systems, 
                    team building strategies, and advanced concepts like correlation and leverage.
                  </p>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Interactive Quizzes</h3>
                  <p className="text-muted-foreground">
                    Test your knowledge with multiple-choice questions, scenario-based problems, 
                    and instant feedback to reinforce learning.
                  </p>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Extensive Glossary</h3>
                  <p className="text-muted-foreground">
                    50+ fantasy cricket terms with clear definitions, practical examples, and 
                    related concepts to build your vocabulary.
                  </p>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
                  <p className="text-muted-foreground">
                    Monitor your learning journey, track completed lessons and quizzes, and 
                    see your improvement over time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 bg-card/50">
        <div className="container">
          <Card className="premium-card max-w-4xl mx-auto border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">Important Notice</h2>
              <div className="prose prose-invert max-w-none text-center">
                <p className="text-muted-foreground">
                  Pick N Learn is an educational platform designed to teach fantasy cricket strategies 
                  and analytical skills. We do not operate fantasy sports contests, handle real money 
                  transactions, or provide gambling services.
                </p>
                <p className="text-muted-foreground mt-4">
                  All content is for educational purposes only. We encourage responsible participation 
                  in fantasy sports and compliance with local laws and regulations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
