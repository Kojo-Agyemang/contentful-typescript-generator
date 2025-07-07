import { ContentFields } from "contentful-management";

export default function renderSymbol(field: ContentFields): string {
  const inValidation = field.validations?.find((v) => !!v.in);

  return !!inValidation
    ? `contentful.EntryFieldTypes.Symbol<${inValidation.in!.map((value) => `"${value}"`).join(" | ")}>`
    : "contentful.EntryFieldTypes.Symbol";
}
