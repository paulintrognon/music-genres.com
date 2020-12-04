import { useRouter } from 'next/router'
import { useState } from 'react'
import { addTrack } from '../../../../../services/api/addTrack'
import { createGenre } from '../../../../../services/api/createGenre'
import { genreLink } from '../../../../../services/links/links'
import { MusicGenreBaseType } from '../../../../../types/MusicGenre/MusicGenreBaseType'
import SquareButton from '../../../../Atoms/Buttons/SquareButton/SquareButton'
import classes from './AddTrack.module.scss'

interface Props {
  url: string
  genre?: MusicGenreBaseType
  genreName?: string
}
const AddTrack: React.FC<Props> = ({ url, genre, genreName }) => {
  const router = useRouter()

  /**
   * Add Track Handler
   */
  const [isAddingTrack, setIsAddingTrack] = useState(false)
  const handleAddTrack = async (): Promise<void> => {
    /**
     * Change UI state to loading: true
     */
    setIsAddingTrack(true)

    /**
     * Genre Creation
     * If no genre has been given upstream, it means that we need to create it first.
     */
    if (!genre) {
      // We create the new genre based on its name
      const genreResponse = await createGenre(genreName as string)

      // If an error occurred during genre creation, we stop here.
      // TODO: show error in ui
      if (!genreResponse.ok || !genreResponse.parsedBody) {
        setIsAddingTrack(false)
        return
      }

      // We assign the new created genre
      genre = genreResponse.parsedBody
    }

    /**
     * Add Track To Genre
     */
    const response = await addTrack(url, genre.id)
    if (response.ok || response.parsedBody.code === 'track-already-listed') {
      router.push(genreLink(genre.slug))
    }

    /**
     * Change UI State to loading: false
     */
    setIsAddingTrack(false)
  }

  return (
    <div className={classes.container}>
      <button type="button" onClick={handleAddTrack}>
        <SquareButton isLoading={isAddingTrack}>Add video</SquareButton>
      </button>
    </div>
  )
}
export default AddTrack
