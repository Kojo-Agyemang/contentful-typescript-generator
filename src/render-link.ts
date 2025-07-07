import { ContentFields } from "contentful-management";

function renderEntryLink(field: ContentFields): string {
  const linkContentType = field.validations?.find((v) => v.linkContentType)?.linkContentType;

  if (!linkContentType || linkContentType.length === 0) {
    return "contentful.EntryFieldTypes.EntryLink";
  }

  return `contentful.EntryFieldTypes.EntryLink<${linkContentType.map((type) => `${type.charAt(0).toUpperCase() + type.slice(1)}EntrySkeleton`).join(" | ")}>`;
}

function renderAssetLink(): string {
  return "contentful.EntryFieldTypes.AssetLink";
}

export default function renderLink(field: ContentFields): string {
  return field.linkType === "Entry" ? renderEntryLink(field) : renderAssetLink();
}
