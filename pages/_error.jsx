import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Header from "../components/header";
import Layout from "../components/layout";
import Head from "next/head";

function Error({ statusCode }) {

    return (
        <Layout>
                <Head>
                    <meta property="og:image" content="/ogimage.jpg" />
                    <title>{statusCode} | Richard McSorley | A blog of sorts.</title>
                </Head>
                <Container>
                   <Header />
                <div className="text-center">
                    {statusCode && <h1 className="text-5xl font-bold">{statusCode}</h1>} 
                    <p>Looks like you stumbled upon a broken page...</p> 
                </div>
        </Container>
        </ Layout >
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
