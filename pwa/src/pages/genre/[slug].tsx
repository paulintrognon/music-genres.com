import { GetServerSideProps, NextPage } from 'next'
import { Layout } from '../../components/Layout/Layout'
import GenrePage from '../../components/Pages/GenrePage/GenrePage/GenrePage'
import { get } from '../../services/api/api'
import { MusicGenreDetailsType } from '../../types/MusicGenre/MusicGenreDetailsType'

interface Props {
  genre: MusicGenreDetailsType
}
const Page: NextPage<Props> = ({ genre }) => (
  <Layout>
    <GenrePage genre={genre} />
  </Layout>
)
export default Page

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug as string

  const response = await get<MusicGenreDetailsType>(`/api/music-genres/${slug}/with-tracks`)

  if (response.ok) {
    return {
      props: {
        genre: response.parsedBody,
      },
    }
  }

  if (response.status === 404) {
    return { notFound: true }
  }

  throw new Error(response.statusText)
}
