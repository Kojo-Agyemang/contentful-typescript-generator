import { ContentFields } from "contentful-management";
import renderSymbol from "./render-symbol";
import renderLink from "./render-link";
import renderArray from "./render-array";

export default function renderFieldType(field: ContentFields): string {
  switch (field.type) {
    case "Symbol":
      return renderSymbol(field);
    case "Link":
      return renderLink(field);
    case "Array":
      return renderArray(field);
    default:
      return `contentful.EntryFieldTypes.${field.type}`;
  }
}
