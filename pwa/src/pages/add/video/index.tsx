import Head from 'next/head'
import { Layout } from '../../../components/Layout/Layout/Layout'
import SelectGenrePage from '../../../components/Pages/AddVideo/SelectGenrePage/SelectGenrePage'

const AddVideoIndex: React.FC = () => (
  <Layout>
    <Head>
      <title>Add a Music Genre | Music Genre</title>
    </Head>
    <SelectGenrePage />
  </Layout>
)
export default AddVideoIndex
