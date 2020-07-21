import { getAllPosts } from '../lib/api'

const allPosts = getAllPosts([
        "title",
        "date",
        "slug",
        "author",
        "coverImage",
        "excerpt"
    ]);

console.log(JSON.stringify(allPosts))
