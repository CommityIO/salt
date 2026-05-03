import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const contentDir = path.join(process.cwd(), "content");

export interface WorkEntry {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  result: string;
  featured: boolean;
  featuredOrder: number;
  heroImage: string;
  thumbnailImage: string;
  metaDescription: string;
  content: string;
  contentHtml?: string;
}

function parseWorkFrontmatter(data: Record<string, unknown>, slug: string): Omit<WorkEntry, "content" | "contentHtml"> {
  return {
    slug,
    title: String(data.title ?? ""),
    client: String(data.client ?? ""),
    category: String(data.category ?? ""),
    summary: String(data.summary ?? ""),
    result: String(data.result ?? ""),
    featured: Boolean(data.featured),
    featuredOrder: Number(data.featuredOrder ?? 99),
    heroImage: String(data.heroImage ?? ""),
    thumbnailImage: String(data.thumbnailImage ?? ""),
    metaDescription: String(data.metaDescription ?? ""),
  };
}

export async function getAllWork(): Promise<WorkEntry[]> {
  const workDir = path.join(contentDir, "work");
  const files = fs.readdirSync(workDir).filter((f) => f.endsWith(".md"));

  const entries = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fullPath = path.join(workDir, filename);
      const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
      const meta = parseWorkFrontmatter(data as Record<string, unknown>, slug);
      return { ...meta, content };
    })
  );

  return entries.sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export async function getWorkBySlug(slug: string): Promise<WorkEntry | null> {
  const fullPath = path.join(contentDir, "work", `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  const meta = parseWorkFrontmatter(data as Record<string, unknown>, slug);

  const processed = await remark().use(remarkHtml).process(content);
  const contentHtml = processed.toString();

  return { ...meta, content, contentHtml };
}

export function getFeaturedWork(): WorkEntry[] {
  const workDir = path.join(contentDir, "work");
  const files = fs.readdirSync(workDir).filter((f) => f.endsWith(".md"));

  const entries = files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fullPath = path.join(workDir, filename);
      const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
      const meta = parseWorkFrontmatter(data as Record<string, unknown>, slug);
      return { ...meta, content };
    })
    .filter((e) => e.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);

  return entries;
}
