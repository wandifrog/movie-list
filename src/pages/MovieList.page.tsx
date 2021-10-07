import React from 'react'
import styled from '@emotion/styled'
import { fontSize } from '../constants/Fonts.constant'
import useTheme from '../hooks/Theme.hook'
import useTranslation from '../hooks/Translation.hook'
import HStack from '../components/HStack'
import PModal from '../components/PModal'
import PText from '../components/PText'

const outsideState = {
  modalImage: '',
  pages: 1,
  typingTimeout: setTimeout(() => { }, 0),
}

const MovieList = (): JSX.Element => {
  const { t } = useTranslation()
  const colors = useTheme()

  const [loading, setLoading] = React.useState(false)
  const [movies, setMovies] = React.useState<Movie[]>([])
  const [searchValue, setSearchValue] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const [suggestion, setSuggestion] = React.useState<Movie[]>([])

  function _getMovies(query: string): Promise<Movie[]> {
    return new Promise((resolve, reject) => {
      const url = `https://www.omdbapi.com/?apikey=db0562f2&s=${query}`
      fetch(url)
        .then((response) => response.json())
        .then((data: MovieResult) => {
          console.log(data)
          data.Response === 'True' ? resolve(data.Search) : reject(data.Error)
        })
        .catch((err) => reject(err))
    }) 
  }

  function _handleTyping(query: string) {
    setSearchValue(query)
    setSuggestion([])
    clearTimeout(outsideState.typingTimeout)

    if (query.length < 3) return

    outsideState.typingTimeout = setTimeout(async() => {
      try {
        const result = await _getMovies(query)
        setSuggestion(result)
      } catch (error) {}
    }, 700)
  }

  function _handleClickSuggestion(query: string) {
    setSearchValue(query)
    _handleSearch()
  }

  async function _handleSearch() {
    setMovies([])
    setSuggestion([])
    setLoading(true)
    try {
      const result: Movie[] = await _getMovies(searchValue)
      setMovies(result)
      
    } catch (error) {
      alert(error)
    }
    setLoading(false)
  }

  // console.log('RENDER', suggestion)

  return (
    <Content>
      <PModal visible={showModal}>
        <PText>test 123</PText>
      </PModal>
      <HStack>
        <PokemonNameInput
          onChange={(el) => _handleTyping(el.target.value)}
          placeholder={t.movieList.inputPlaceholder}
          value={searchValue}
          color={colors.text}
        />
        <button onClick={() => _handleSearch()}>search</button>
      </HStack>
      <AutoCompleteContainer color={colors.background}>
        {
          suggestion.length !== 0 && suggestion.map((movie, index) =>
            (
              <PText 
                key={index} 
                top="10px" 
                bottom="10px" 
                size={fontSize.normal} 
                center
                onClick={() => _handleClickSuggestion(movie.Title)}
              >
                {movie.Title}
              </PText>
            )
          )
        }

      </AutoCompleteContainer>
      {
        movies.map((movie, index) =>
          (
            <HStack key={index} justify="space-between">
              <PText>{movie.Title}</PText>
              <PText>{movie.Year}</PText>
            </HStack>
          )
        )
      }
      {
        movies.map((movie, index) =>
          (
            <HStack key={index} justify="space-between">
              <PText>{movie.Title}</PText>
              <PText>{movie.Year}</PText>
            </HStack>
          )
        )
      }
      {
        movies.map((movie, index) =>
          (
            <HStack key={index} justify="space-between">
              <PText>{movie.Title}</PText>
              <PText>{movie.Year}</PText>
            </HStack>
          )
        )
      }
      {
        movies.map((movie, index) =>
          (
            <HStack key={index} justify="space-between">
              <PText>{movie.Title}</PText>
              <PText>{movie.Year}</PText>
            </HStack>
          )
        )
      }
      {
        loading ? <PText top="20px" center>{t.movieList.loading}</PText> : null
      }
    </Content>
  )
}

const Content = styled.div`
  padding: 0 12px 12px;
  height: calc(100% - 137px);
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`
const AutoCompleteContainer = styled.div`
position: absolute;
left: 0;
z-index: 10;
  width: 100%;
  /* background-color: white; */
  margin: 0 auto;
  background-color: ${(props) => props.color};
`
const PokemonNameInput = styled.input`
  background: transparent;
  display: flex;
  height: 30px;
  margin: 0 auto;
  padding: 0 10px;
  width: 100%;
  text-align: center;
  color: ${(props) => props.color};
  outline: none;
  
  &::placeholder {
    color: ${(props) => props.color};
    font-weight: bold;
  }
`

export default MovieList
