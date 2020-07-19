import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Header from "../components/header";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";

export default function Index({ allPosts }) {
    const heroPost = allPosts[0];
    const morePosts = allPosts.slice(1);
    return (
        <>
            <Layout>
                <Head>
                    <meta property="og:image" content="/ogimage.jpg" />
                    <title>Richard McSorley | A blog of sorts.</title>
                </Head>
                <Container>
                    <Header isHome={true} />
                    {heroPost && (
                        <HeroPost
                            title={heroPost.title}
                            coverImage={heroPost.coverImage}
                            date={heroPost.date}
                            author={heroPost.author}
                            slug={heroPost.slug}
                            excerpt={heroPost.excerpt}
                        />
                    )}
                    {morePosts.length > 0 && <MoreStories posts={morePosts} />}
                    {morePosts.length === 0 && <p>Until this guy writes more articles, this text will display in protest.</p>}
                </Container>
            </Layout>
        </>
    );
}

export async function getStaticProps() {
    const allPosts = getAllPosts([
        "title",
        "date",
        "slug",
        "author",
        "coverImage",
        "excerpt"
    ]);

    return {
        props: { allPosts }
    };
}
