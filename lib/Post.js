export default function Post(data, slug){
    const { ogImage = {}, coverImage =`/assets/blog/covers/${slug}.jpg`} = data;
    this.coverImage = coverImage;
    this.title = data.title;
    this.excerpt = data.excerpt;
    this.date = data.date;
    const { name, picture = `/assets/blog/authors/${data.author.name.replace(' ', '').toLowerCase()}.jpg`} = data.author;
    this.author = {
        name,
        picture,
    }
    const { url = `/assets/blog/covers/${slug}.jpg`} = ogImage;
    this.ogImage = {
        url,
    }
}
