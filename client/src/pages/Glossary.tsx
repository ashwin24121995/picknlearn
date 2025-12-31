import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, BookMarked, Filter } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";

export default function Glossary() {
  const { data: terms, isLoading } = trpc.glossary.list.useQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    if (!terms) return [];
    const uniqueCategories = Array.from(new Set(terms.map(t => t.category)));
    return uniqueCategories.sort();
  }, [terms]);

  const filteredTerms = useMemo(() => {
    if (!terms) return [];
    
    let filtered = terms;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(term =>
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(term => term.category === selectedCategory);
    }

    return filtered.sort((a, b) => a.term.localeCompare(b.term));
  }, [terms, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-12 md:py-20 bg-card/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <BookMarked className="h-16 w-16 mx-auto text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Fantasy Cricket Glossary
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive dictionary of fantasy cricket terms and concepts
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b border-border/40">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Results Count */}
            {!isLoading && (
              <p className="text-sm text-muted-foreground">
                Showing {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Terms List */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-1/3 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : filteredTerms.length > 0 ? (
              <div className="space-y-4">
                {filteredTerms.map((term) => {
                  const relatedTerms = term.relatedTerms 
                    ? (typeof term.relatedTerms === 'string' 
                        ? JSON.parse(term.relatedTerms) 
                        : term.relatedTerms)
                    : [];

                  return (
                    <Card key={term.id} className="premium-card">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-2xl mb-2">{term.term}</CardTitle>
                            <Badge variant="outline" className="mb-3">
                              {term.category}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="text-base leading-relaxed">
                          {term.definition}
                        </CardDescription>
                      </CardHeader>
                      {(term.example || relatedTerms.length > 0) && (
                        <CardContent className="space-y-4">
                          {term.example && (
                            <div>
                              <h4 className="font-semibold text-sm mb-2 text-primary">Example:</h4>
                              <p className="text-sm text-muted-foreground italic">
                                {term.example}
                              </p>
                            </div>
                          )}
                          {relatedTerms.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Related Terms:</h4>
                              <div className="flex flex-wrap gap-2">
                                {relatedTerms.map((related: string, idx: number) => (
                                  <Badge key={idx} variant="secondary">
                                    {related}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <BookMarked className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No Terms Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
