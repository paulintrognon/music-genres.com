import { useRouter } from 'next/router'
import { useState } from 'react'
import { addTrack } from '../../../../../services/api/addTrack'
import { createGenre } from '../../../../../services/api/createGenre'
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

  const [isAddingTrack, setIsAddingTrack] = useState(false)
  const handleAddTrack = async (): Promise<void> => {
    if (!genre) {
      const genreResponse = await createGenre(genreName as string)
      if (!genreResponse.ok || !genreResponse.parsedBody) {
        return
      }
      genre = genreResponse.parsedBody
    }

    setIsAddingTrack(true)
    const response = await addTrack(url, genre.id)

    if (response.ok || response.parsedBody.code === 'track-already-listed') {
      router.push(`/genre/${genre.slug}`)
    }
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
