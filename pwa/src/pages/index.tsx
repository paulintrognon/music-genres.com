import { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../components/Layout/Layout/Layout'
import HomePage from '../components/Pages/HomePage/HomePage/HomePage'

const Home: NextPage = () => (
  <Layout>
    <Head>
      <title>Music Genre - Discover genres by listening to what they sound</title>
    </Head>
    <HomePage />
  </Layout>
)
export default Home
