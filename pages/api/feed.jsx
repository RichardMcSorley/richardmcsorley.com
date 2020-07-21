import allPosts from '../../public/posts.json'
import moment from 'moment';

const blogPostsRssXml = posts => {
    const latestPostDate = posts[0].date; 
    let rssItemsXml = "";
    posts.forEach(post => {
        rssItemsXml += `
      <item>
        <title>${post.title}</title>
        <link>
          ${`https://richardmcsorley.com/posts/${post.slug}`}
        </link>
        
        <pubDate>${post.date}</pubDate>
        <description>
        <![CDATA[${post.excerpt}]]>
        </description>
        <enclosure url="https://richardmcsorley.com${post.coverImage}" type="image/jpeg"/>
        <author>${post.author.name}</author>
    </item>`;
    });
    return {
        rssItemsXml,
        latestPostDate
    };
};

const getRssXml = blogPosts => {
    const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);
    return `<?xml version="1.0" ?>
  <rss version="2.0">
    <channel>
        <title>Blog by Richard McSorley</title>
        <link>https://richardmcsorley.com</link>
        <description>A blog of sorts.</description>
        <language>en</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

export default function Feed(req, res){
    res.setHeader("Content-Type", "text/xml");
        res.write(getRssXml(allPosts));
        res.end();
}

