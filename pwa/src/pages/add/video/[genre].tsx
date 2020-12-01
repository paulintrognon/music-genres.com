import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../../../components/Layout/Layout'
import SelectVideoPage from '../../../components/Pages/AddVideo/SelectVideoPage/SelectVideoPage/SelectVideoPage'
import { get } from '../../../services/api/api'
import { MusicGenreBaseType } from '../../../types/MusicGenre/MusicGenreBaseType'

interface Props {
  genre?: MusicGenreBaseType
  genreName?: string
}
const AddVideoIndex: NextPage<Props> = ({ genre, genreName }) => (
  <Layout>
    <Head>
      <title>Add a video to {genre?.name || genreName} | Music Genre</title>
    </Head>
    <SelectVideoPage genre={genre} genreName={genreName} />
  </Layout>
)
export default AddVideoIndex

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.genre as string
  const response = await get<MusicGenreBaseType>(`/api/music-genres/${slug}/with-tracks`)

  if (response.ok) {
    return {
      props: {
        genre: response.parsedBody,
      },
    }
  }

  return {
    props: {
      genreName: context.query.genre,
    },
  }
}
