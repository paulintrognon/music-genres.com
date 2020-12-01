import { GetServerSideProps, NextPage } from 'next'
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

  if (!context.query.genre) {
    return { notFound: true }
  }

  if (response.status === 400) {
    return {
      props: {
        genreName: context.query.genre,
      },
    }
  }

  throw new Error(response.statusText)
}
