import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import Post from './Post';

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = []) {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    let fileContents = null;
    try {
        fileContents = fs.readFileSync(fullPath, "utf8");
    } catch(error){
        console.error(error);
        return;
    }
    const { data, content } = matter(fileContents);
    const postData = new Post(data, realSlug);

    const items = {};

    fields.forEach(field => {
        if (field === "slug") {
            items[field] = realSlug;
        }
        if (field === "content") {
            items[field] = content;
        }
        if (postData[field]) {
            items[field] = postData[field];
        }
    });

    return items;
}

export function getAllPosts(fields = []) {
    const slugs = getPostSlugs();
    const posts = slugs
        .map(slug => getPostBySlug(slug, fields))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? "-1" : "1"));
    return posts;
}
