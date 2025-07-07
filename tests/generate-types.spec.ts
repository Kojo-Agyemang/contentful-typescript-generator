import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getEnvironment } from "../src/generate-types";

describe("getEnvironment", () => {
  beforeEach(() => {
    vi.mock("contentful-management", () => ({
      createClient: vi.fn(() => ({
        getSpace: vi.fn(() => ({
          getEnvironment: vi.fn().mockResolvedValue({
            sys: { id: "envId" },
          }),
        })),
      })),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("correctly returns the environment with the given ID", async () => {
    const result = await getEnvironment("token", "space", "envId");

    expect(result.sys.id).toBe("envId");
  });
});
