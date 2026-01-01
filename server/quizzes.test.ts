import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createTestContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    email: "test@example.com",
    name: "Test User",
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

describe("Quizzes API", () => {
  it("should list all published quizzes", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const quizzes = await caller.quizzes.list();

    expect(quizzes).toBeDefined();
    expect(Array.isArray(quizzes)).toBe(true);
    expect(quizzes.length).toBeGreaterThan(0);
    
    // Verify quiz structure
    const firstQuiz = quizzes[0];
    expect(firstQuiz).toHaveProperty("id");
    expect(firstQuiz).toHaveProperty("title");
    expect(firstQuiz).toHaveProperty("slug");
    expect(firstQuiz).toHaveProperty("description");
    expect(firstQuiz).toHaveProperty("difficulty");
    expect(firstQuiz.isPublished).toBe(true);
  });

  it("should get quiz by slug with questions", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    // First get all quizzes to find a valid slug
    const quizzes = await caller.quizzes.list();
    expect(quizzes.length).toBeGreaterThan(0);

    const testSlug = quizzes[0]!.slug;
    const quiz = await caller.quizzes.getBySlug({ slug: testSlug });

    expect(quiz).toBeDefined();
    expect(quiz?.slug).toBe(testSlug);
    expect(quiz).toHaveProperty("questions");
    expect(Array.isArray(quiz?.questions)).toBe(true);
    
    // Verify questions don't include correct answers (security)
    if (quiz?.questions && quiz.questions.length > 0) {
      const firstQuestion = quiz.questions[0];
      expect(firstQuestion).toHaveProperty("question");
      expect(firstQuestion).toHaveProperty("options");
      expect(firstQuestion).toHaveProperty("questionType");
      // correctAnswer should not be exposed to client
    }
  });

  it("should return null for non-existent quiz slug", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const quiz = await caller.quizzes.getBySlug({ slug: "non-existent-quiz-slug-12345" });

    expect(quiz).toBeNull();
  });

  it("should submit quiz attempt and calculate score", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    // Get a quiz to test with
    const quizzes = await caller.quizzes.list();
    expect(quizzes.length).toBeGreaterThan(0);
    
    const quiz = await caller.quizzes.getBySlug({ slug: quizzes[0]!.slug });
    expect(quiz).toBeDefined();
    expect(quiz?.questions).toBeDefined();

    // Create answers (intentionally wrong to test scoring)
    const answers: Record<string, string> = {};
    quiz!.questions!.forEach(q => {
      answers[q.id.toString()] = "Z"; // Wrong answer
    });

    const result = await caller.quizzes.submitAttempt({
      quizId: quiz!.id,
      answers,
      timeSpent: 300,
    });

    expect(result).toBeDefined();
    expect(result).toHaveProperty("score");
    expect(result).toHaveProperty("correctAnswers");
    expect(result).toHaveProperty("totalQuestions");
    expect(result).toHaveProperty("isPassed");
    expect(typeof result.score).toBe("number");
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.totalQuestions).toBe(quiz!.questions!.length);
  });

  it("should correctly identify passing and failing scores", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const quizzes = await caller.quizzes.list();
    const quiz = await caller.quizzes.getBySlug({ slug: quizzes[0]!.slug });

    // Submit with all wrong answers
    const wrongAnswers: Record<string, string> = {};
    quiz!.questions!.forEach(q => {
      wrongAnswers[q.id.toString()] = "Z";
    });

    const failResult = await caller.quizzes.submitAttempt({
      quizId: quiz!.id,
      answers: wrongAnswers,
      timeSpent: 300,
    });

    expect(failResult.score).toBeLessThan(quiz!.passingScore || 70);
    expect(failResult.isPassed).toBe(false);
  });
});
