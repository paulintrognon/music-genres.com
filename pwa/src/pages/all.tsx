import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../components/Layout/Layout'
import AllGenres from '../components/Pages/AllGenres/AllGenres'
import { get } from '../services/api/api'
import { MusicGenreBaseType } from '../types/MusicGenre/MusicGenreBaseType'

interface Props {
  genres: MusicGenreBaseType[]
}
const AllGenresPage: NextPage<Props> = ({ genres }) => (
  <Layout>
    <Head>
      <title>All Music Genres And Styles | Music Genre</title>
    </Head>
    <AllGenres genres={genres} />
  </Layout>
)
export default AllGenresPage

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await get<MusicGenreBaseType[]>(`/api/music-genres/all`)

  if (response.ok) {
    return {
      props: {
        genres: response.parsedBody,
      },
    }
  }

  if (response.status === 404) {
    return { notFound: true }
  }

  throw new Error(response.statusText)
}
