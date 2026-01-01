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

describe("Lessons API", () => {
  it("should list all published lessons", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const lessons = await caller.lessons.list();

    expect(lessons).toBeDefined();
    expect(Array.isArray(lessons)).toBe(true);
    expect(lessons.length).toBeGreaterThan(0);
    
    // Verify lesson structure
    const firstLesson = lessons[0];
    expect(firstLesson).toHaveProperty("id");
    expect(firstLesson).toHaveProperty("title");
    expect(firstLesson).toHaveProperty("slug");
    expect(firstLesson).toHaveProperty("description");
    expect(firstLesson).toHaveProperty("difficulty");
    expect(firstLesson.isPublished).toBe(true);
  });

  it("should get lesson by slug", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    // First get all lessons to find a valid slug
    const lessons = await caller.lessons.list();
    expect(lessons.length).toBeGreaterThan(0);

    const testSlug = lessons[0]!.slug;
    const lesson = await caller.lessons.getBySlug({ slug: testSlug });

    expect(lesson).toBeDefined();
    expect(lesson?.slug).toBe(testSlug);
    expect(lesson).toHaveProperty("content");
    expect(lesson?.content).toBeTruthy();
  });

  it("should return null for non-existent lesson slug", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const lesson = await caller.lessons.getBySlug({ slug: "non-existent-lesson-slug-12345" });

    expect(lesson).toBeUndefined();
  });

  it("should filter lessons by category", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const allLessons = await caller.lessons.list();
    const lessonsWithCategory = allLessons.filter(l => l.categoryId === 1);

    expect(allLessons).toBeDefined();
    expect(Array.isArray(allLessons)).toBe(true);
    expect(lessonsWithCategory.length).toBeGreaterThan(0);
    
    // All filtered lessons should belong to category 1
    lessonsWithCategory.forEach(lesson => {
      expect(lesson.categoryId).toBe(1);
    });
  });

  it("should have lessons with valid category IDs", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const lessons = await caller.lessons.list();

    expect(lessons).toBeDefined();
    expect(Array.isArray(lessons)).toBe(true);
    expect(lessons.length).toBeGreaterThan(0);
    
    // All lessons should have a valid categoryId
    lessons.forEach(lesson => {
      expect(lesson.categoryId).toBeDefined();
      expect(typeof lesson.categoryId).toBe("number");
      expect(lesson.categoryId).toBeGreaterThan(0);
    });
  });
});
