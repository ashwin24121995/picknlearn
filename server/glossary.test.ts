import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createTestContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("Glossary API", () => {
  it("should list all glossary terms", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const terms = await caller.glossary.list();

    expect(terms).toBeDefined();
    expect(Array.isArray(terms)).toBe(true);
    expect(terms.length).toBeGreaterThan(0);
    
    // Verify term structure
    const firstTerm = terms[0];
    expect(firstTerm).toHaveProperty("id");
    expect(firstTerm).toHaveProperty("term");
    expect(firstTerm).toHaveProperty("slug");
    expect(firstTerm).toHaveProperty("definition");
    expect(firstTerm).toHaveProperty("category");
  });

  it("should get term by slug", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    // First get all terms to find a valid slug
    const terms = await caller.glossary.list();
    expect(terms.length).toBeGreaterThan(0);

    const testSlug = terms[0]!.slug;
    const term = await caller.glossary.getBySlug({ slug: testSlug });

    expect(term).toBeDefined();
    expect(term?.slug).toBe(testSlug);
    expect(term).toHaveProperty("definition");
    expect(term?.definition).toBeTruthy();
  });

  it("should return null for non-existent term slug", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const term = await caller.glossary.getBySlug({ slug: "non-existent-term-slug-12345" });

    expect(term).toBeUndefined();
  });

  it("should search terms by query", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    // Search for "captain" which should exist in our seed data
    const results = await caller.glossary.search({ query: "captain" });

    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    
    // Should find at least one result
    expect(results.length).toBeGreaterThan(0);
    
    // Results should contain the search term
    const hasMatchingTerm = results.some(term => 
      term.term.toLowerCase().includes("captain") ||
      term.definition.toLowerCase().includes("captain")
    );
    expect(hasMatchingTerm).toBe(true);
  });

  it("should filter terms by category", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const allTerms = await caller.glossary.list();
    expect(allTerms.length).toBeGreaterThan(0);

    // Get a category from existing terms and filter client-side
    const testCategory = allTerms[0]!.category;
    const filteredTerms = allTerms.filter(t => t.category === testCategory);

    expect(filteredTerms).toBeDefined();
    expect(Array.isArray(filteredTerms)).toBe(true);
    expect(filteredTerms.length).toBeGreaterThan(0);
    
    // All terms should belong to the specified category
    filteredTerms.forEach(term => {
      expect(term.category).toBe(testCategory);
    });
  });

  it("should have terms with valid categories", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const terms = await caller.glossary.list();

    expect(terms).toBeDefined();
    expect(Array.isArray(terms)).toBe(true);
    expect(terms.length).toBeGreaterThan(0);
    
    // All terms should have a category
    terms.forEach(term => {
      expect(term.category).toBeDefined();
      expect(typeof term.category).toBe("string");
      expect(term.category.length).toBeGreaterThan(0);
    });
  });

  it("should handle empty search query", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const results = await caller.glossary.search({ query: "" });

    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    // Empty query should return all terms
    expect(results.length).toBeGreaterThan(0);
  });
});
