import type { ArgumentsCamelCase } from "yargs";

export async function generateTypesHandler(argv: ArgumentsCamelCase) {
  console.log("Generating TypeScript types...");

  const { output, space, accessToken, environment: env } = argv;

  if (!output || !space || !accessToken || !env) {
    console.error("Missing required arguments: space, environment, access-token, or output.");
    process.exit(1);
  }

  const { generateTypes, getEnvironment } = await import("./generate-types.ts");

  const environment = await getEnvironment(accessToken as string, space as string, env as string);

  if (!environment) {
    console.error("Failed to get Contentful environment.");
    process.exit(1);
  }

  const types = await generateTypes(environment);

  if (types) {
    console.log("Generated TypeScript types");

    const { writeFileSync } = await import("fs");
    writeFileSync(output as string, types, "utf8");
    console.log(`Types written to ${output}`);
  }
}
