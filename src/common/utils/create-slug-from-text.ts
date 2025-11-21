import { generateRandomSufix } from './generate-random-sufix';
import { slugify } from './sluguify';

export function createSlugFromText(text: string) {
  const slug = slugify(text);
  return `${slug}-${generateRandomSufix()}`;
}
