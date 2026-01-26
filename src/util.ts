import { index } from "../static/data/tag";

export const getTags = () => {
  const tags = index;
  return tags;
}

export const getTagLabel = (id: string) => {
  const tags = index;
  return `#${tags.find(tag => tag.id === id)?.label || ""}`;
}