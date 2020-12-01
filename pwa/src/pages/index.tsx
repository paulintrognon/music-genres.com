import { NextPage } from 'next'
import { Layout } from '../components/Layout/Layout'
import HomePage from '../components/Pages/HomePage/HomePage/HomePage'

const Home: NextPage = () => (
  <Layout>
    <HomePage />
  </Layout>
)
export default Home
