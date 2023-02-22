import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }){
    return <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
        {/* <Date datestring={postData.date}/> */}
        {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{ __html:postData.contentHtml}}/>
    </Layout>;
}

export async function getStaticPaths() {
    const paths = getAllPostIds()

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // return id and data of a post
    const postData = await getPostData(params.id) 

    return{
        props:{
            postData,
        }
    }
}