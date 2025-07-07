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

// describe("renderField", () => {
//   it("renders field with name and type", () => {
//     const mockField = {
//       id: "title",
//       name: "Title",
//       type: "Text",
//     } as any;
//     // vi.spyOn(generateTypesModule, "default" as any, "get").mockReturnValue(undefined);
//     // vi.mocked = undefined;
//     // Mock renderFieldType
//     const renderFieldType = vi.fn();
//     renderFieldType.mockReturnValue("string");
//     vi.mock("./render-field-type", () => ({
//       default: renderFieldType,
//     }));

//     // vi.spyOn(("../src/render-field-type"), "default").mockReturnValue("string");
//     const result = (generateTypesModule as any).renderField(mockField);
//     expect(result).toContain("/** Title */");
//     expect(result).toContain("title:string;");
//     renderFieldType.mockRestore();
//   });
// });

// describe("renderContentType", () => {
//   it("renders a content type as TypeScript type", () => {
//     const mockContentType = {
//       sys: { id: "blogPost" },
//       fields: [
//         { id: "title", name: "Title", omitted: false, type: "Text" },
//         { id: "desc", name: "Desc", omitted: true, type: "Text" },
//         { id: "body", name: "Body", omitted: false, type: "RichText" },
//       ],
//     } as any;
//     // Mock renderFieldType
//     const renderFieldType = vi.spyOn(require("../src/render-field-type"), "default");
//     renderFieldType.mockImplementation((field: any) => (field.type === "Text" ? "string" : "any"));
//     const result = (generateTypesModule as any).renderContentType(mockContentType);
//     expect(result).toContain("export type BlogPostEntrySkeleton");
//     expect(result).toContain('contentTypeId: "blogPost"');
//     expect(result).toContain("/** Title */");
//     expect(result).toContain("title:string;");
//     expect(result).toContain("/** Body */");
//     expect(result).toContain("body:any;");
//     expect(result).not.toContain("desc");
//     renderFieldType.mockRestore();
//   });
// });

// describe("generateTypes", () => {
//   let mockGetContentTypes: any;
//   let mockEnv: any;
//   let logSpy: any;

//   beforeEach(() => {
//     mockGetContentTypes = vi.fn();
//     mockEnv = { getContentTypes: mockGetContentTypes };
//     logSpy = vi.spyOn(console, "error").mockImplementation(() => {});
//   });

//   afterEach(() => {
//     logSpy.mockRestore();
//   });

//   it("returns TypeScript types string on success", async () => {
//     const mockContentType = {
//       sys: { id: "foo" },
//       fields: [{ id: "bar", name: "Bar", omitted: false, type: "Text" }],
//     };
//     mockGetContentTypes.mockResolvedValue({ items: [mockContentType] });
//     // Mock renderFieldType
//     const renderFieldType = vi.spyOn(require("../src/render-field-type"), "default").mockReturnValue("string");
//     const result = await generateTypesModule.generateTypes(mockEnv);
//     expect(result).toContain('import * as contentful from "contentful";');
//     expect(result).toContain("export type FooEntrySkeleton");
//     expect(result).toContain("bar:string;");
//     renderFieldType.mockRestore();
//   });

//   it("logs error and returns undefined on failure", async () => {
//     mockGetContentTypes.mockRejectedValue(new Error("fail"));
//     const result = await generateTypesModule.generateTypes(mockEnv);
//     expect(result).toBeUndefined();
//     expect(logSpy).toHaveBeenCalledWith("Error writing TypeScript typings to file:", expect.any(Error));
//   });
// });
