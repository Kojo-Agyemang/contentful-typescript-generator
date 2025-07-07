import { ContentFields } from "contentful-management";
import renderSymbol from "./render-symbol";
import renderLink from "./render-link";

export default function renderArray(field: ContentFields): string {
  return field.items?.type === "Link"
    ? `contentful.EntryFieldTypes.Array<${renderLink(field.items as ContentFields)}>`
    : field.items?.type === "Symbol"
    ? `contentful.EntryFieldTypes.Array<${renderSymbol(field.items as ContentFields)}>`
    : "";
}
