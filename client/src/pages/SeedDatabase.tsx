import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function SeedDatabase() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; error?: string } | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/seed-database", {
        method: "POST",
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "Failed to seed database",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Seed Database</CardTitle>
            <CardDescription>
              Populate the database with fantasy cricket lessons, quizzes, and sample content.
              This is a one-time setup operation.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">What will be added:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>4 Lesson Categories (Fundamentals, Player Analysis, Team Building, Advanced Strategies)</li>
                <li>6 Comprehensive Lessons covering fantasy cricket basics to advanced tactics</li>
                <li>3 Interactive Quizzes with questions and answer options</li>
              </ul>
            </div>

            <Button 
              onClick={handleSeed} 
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Seeding Database..." : "Seed Database Now"}
            </Button>

            {result && (
              <div className={`p-4 rounded-lg flex items-start gap-3 ${
                result.success ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
              }`}>
                {result.success ? (
                  <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="font-semibold">
                    {result.success ? "Success!" : "Error"}
                  </p>
                  <p className="text-sm mt-1">{result.message}</p>
                  {result.error && (
                    <p className="text-xs mt-2 font-mono bg-black/20 p-2 rounded">{result.error}</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
