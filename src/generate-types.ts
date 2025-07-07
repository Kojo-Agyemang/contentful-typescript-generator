import * as contentfulManagement from "contentful-management";
import { ContentFields } from "contentful-management";
import renderFieldType from "./render-field-type";

async function getEnvironment(accessToken: string, spaceId: string, environmentId: string) {
  const client = contentfulManagement.createClient({ accessToken });
  const space = await client.getSpace(spaceId);
  return space.getEnvironment(environmentId);
}

function renderField(field: ContentFields) {
  const type = renderFieldType(field);

  return [`/** ${field.name} */\n`, field.id, ":", type, ";"].join("");
}

function renderContentType(contentType: contentfulManagement.ContentType): string {
  const typeName = contentType.sys.id.charAt(0).toUpperCase() + contentType.sys.id.slice(1);
  const fields = contentType.fields
    .filter((field) => field.omitted !== true)
    .map((field) => renderField(field))
    .join("\n ");

  return `export type ${typeName}EntrySkeleton = {
      contentTypeId: "${contentType.sys.id}";
      fields: {
          ${fields}
      };
  };`;
}

async function generateTypes(environment: contentfulManagement.Environment): Promise<string | undefined> {
  try {
    const contentTypes = await environment.getContentTypes();

    const types = contentTypes.items.map((contentType) => renderContentType(contentType));

    return 'import * as contentful from "contentful";\n\n' + types.join("\n\n");
  } catch (error) {
    console.error("Error writing TypeScript typings to file:", error);
  }
}

export { generateTypes, getEnvironment };
