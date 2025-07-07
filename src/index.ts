#! /usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generateTypesHandler } from "./generate-types-handler";

console.log("Contentful TypeScript Generator");

yargs(hideBin(process.argv))
  .env("CONTENTFUL")
  .config()
  .command({
    command: "generate",
    describe: "Generate TypeScript types from Contentful",
    builder: (yargs: any) => {
      return yargs
        .option("space", {
          alias: "s",
          type: "string",
          demandOption: true,
          describe: "Contentful Space ID",
        })
        .option("access-token", {
          alias: "t",
          type: "string",
          demandOption: true,
          describe: "Contentful Access Token",
        })
        .option("environment", {
          alias: "e",
          type: "string",
          default: "master",
          describe: "Contentful Environment ID (default: master)",
        })
        .option("output", {
          alias: "o",
          type: "string",
          default: "./contentful-types.ts",
          describe: "Output file for generated types",
        });
    },
    handler: generateTypesHandler,
  })
  .parse();
