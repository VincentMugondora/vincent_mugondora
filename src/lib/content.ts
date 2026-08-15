import { getCollection } from "astro:content";

export async function getPublishedPosts() {
  const posts = await getCollection("posts");
  return posts
    .filter((post) => !post.data.draft)
    .sort(
      (a, b) =>
        b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
    );
}

export async function getFeaturedProjects() {
  const projects = await getCollection("projects");
  return projects.filter((project) => project.data.featured);
}

export async function getAllProjects() {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => {
    const dateA = a.data.publishedAt?.getTime() ?? 0;
    const dateB = b.data.publishedAt?.getTime() ?? 0;
    return dateB - dateA;
  });
}

export async function getAllExperiments() {
  const experiments = await getCollection("experiments");
  return experiments.sort((a, b) => {
    const dateA = a.data.publishedAt?.getTime() ?? 0;
    const dateB = b.data.publishedAt?.getTime() ?? 0;
    return dateB - dateA;
  });
}

export async function getAllSpeaking() {
  const speaking = await getCollection("speaking");
  return speaking.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}
