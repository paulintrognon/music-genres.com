import { ChangeEvent, useState } from 'react'
import useSWR from 'swr'
import { GenreSuggestionsApiResultType } from '../../../../../types/Api/GenreSuggestionsApiResultType'
import MagnifyingGlassIcon from '../../../Atoms/Icons/MagnifyingGlass/MagnifyingGlass'
import InputWithIcon from '../../InputWithIcon/InputWithIcon'
import GenresSuggestions from '../GenresSuggestions/GenresSuggestions'
import classes from './SearchGenresInput.module.scss'

interface Props {
  slugToHref: (slug: string) => string
  onChange?: (entry: string) => void
  onSubmit?: (entry: string) => void
  onDirty?: () => void
  onClean?: () => void
}
const SearchGenresInput: React.FC<Props> = ({
  slugToHref,
  onChange,
  onSubmit,
  onDirty,
  onClean,
}) => {
  /**
   * On string query changes, we update query state
   */
  const [typedText, setTypedText] = useState('')
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTypedText(event.target.value)
    onChange && onChange(event.target.value)
  }

  /**
   * On query state changes, we fetch up to 5 genres suggestions
   */
  const { data, isValidating } = useSWR<GenreSuggestionsApiResultType>(
    typedText && `/api/music-genres/search?query=${typedText}&limit=5`
  )

  /**
   * On submit, we pass the typed text to onSubmit handler (if exists)
   */
  const handleOnSubmit = (): void => {
    onSubmit && onSubmit(typedText)
  }

  return (
    <div className={classes.container}>
      <InputWithIcon
        className={classes.searchInput}
        placeholder="Start looking for a genre"
        icon={<MagnifyingGlassIcon />}
        onDirty={onDirty}
        onClean={onClean}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
      />
      {typedText ? (
        <GenresSuggestions
          isLoading={isValidating}
          genreName={typedText}
          suggestions={data?.result || []}
          slugToHref={slugToHref}
        />
      ) : null}
    </div>
  )
}
export default SearchGenresInput
