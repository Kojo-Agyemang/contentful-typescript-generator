import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { ArgumentsCamelCase } from "yargs";

const mockGenerateTypes = vi.fn();
const mockGetEnvironment = vi.fn();
const mockWriteFileSync = vi.fn();

vi.mock("../src/generate-types.ts", () => ({
  generateTypes: mockGenerateTypes,
  getEnvironment: mockGetEnvironment,
}));

vi.mock("fs", () => ({
  writeFileSync: mockWriteFileSync,
}));

const { generateTypesHandler } = await import("../src/generate-types-handler.ts");

describe("generateTypesHandler", () => {
  const baseArgs: ArgumentsCamelCase = {
    output: "types.ts",
    space: "spaceid",
    accessToken: "token",
    environment: "master",
    _: [],
    $0: "",
  };

  let logSpy: ReturnType<typeof vi.spyOn>;
  let errorSpy: ReturnType<typeof vi.spyOn>;
  let exitSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    exitSpy = vi.spyOn(process, "exit").mockImplementation((...args: unknown[]): never => {
      throw new Error("exit");
    });
    mockGenerateTypes.mockReset();
    mockGetEnvironment.mockReset();
    mockWriteFileSync.mockReset();
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  it("exits if required arguments are missing", async () => {
    const args = { ...baseArgs, space: undefined };
    await expect(generateTypesHandler(args as any)).rejects.toThrow("exit");
    expect(errorSpy).toHaveBeenCalledWith("Missing required arguments: space, environment, access-token, or output.");
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it("exits if environment is not found", async () => {
    mockGetEnvironment.mockResolvedValue(undefined);
    await expect(generateTypesHandler(baseArgs)).rejects.toThrow("exit");
    expect(errorSpy).toHaveBeenCalledWith("Failed to get Contentful environment.");
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it("writes types to file on success", async () => {
    mockGetEnvironment.mockResolvedValue("env");
    mockGenerateTypes.mockResolvedValue("export type Foo = string;");
    await generateTypesHandler(baseArgs);
    expect(mockWriteFileSync).toHaveBeenCalledWith("types.ts", "export type Foo = string;", "utf8");
    expect(logSpy).toHaveBeenCalledWith("Generated TypeScript types");
    expect(logSpy).toHaveBeenCalledWith("Types written to types.ts");
  });
});
