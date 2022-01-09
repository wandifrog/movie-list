import React from 'react'
import styled from '@emotion/styled'
import {fontFamily, fontSize} from '../constants/Fonts.constant'
import useTheme from '../hooks/Theme.hook'
import useTranslation from '../hooks/Translation.hook'
import HStack from '../components/HStack'
import PModal from '../components/PModal'
import Text from '../components/Text'

const outsideState = {
  modalImage: '',
  typingTimeout: setTimeout(() => { }, 0),
}

const MovieList = (): JSX.Element => {
  const {t} = useTranslation()
  const colors = useTheme()

  const [loading, setLoading] = React.useState(false)
  const [movies, setMovies] = React.useState<Movie[]>([])
  const [searchValue, setSearchValue] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const [suggestion, setSuggestion] = React.useState<Movie[]>([])

  const _getMovies = (query: string, page = 1): Promise<Movie[]> => {
    return new Promise((resolve, reject) => {
      const url = `https://www.omdbapi.com/?apikey=db0562f2&s=${query}&page=${page}`
      fetch(url)
        .then((response) => response.json())
        .then((data: MovieResult) => {
          console.log(data)
          data.Response === 'True' ? resolve(data.Search) : reject(data.Error)
        })
        .catch((err) => reject(err))
    })
  }

  const _handleTyping = (query: string) => {
    clearTimeout(outsideState.typingTimeout)
    setSearchValue(query)
    setSuggestion([])

    if (query.length < 3) return

    outsideState.typingTimeout = setTimeout(async() => {
      try {
        const result = await _getMovies(query)
        setSuggestion(result)
      } catch (error) {
        alert(error)
      }
    }, 700)
  }

  const _handleClickSuggestion = (query: string) => {
    setSearchValue(query)
    _handleSearch()
  }

  const _handleSearch = async() => {
    clearTimeout(outsideState.typingTimeout)
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

  const _handleOnScroll = async(el: React.UIEvent<HTMLDivElement>) => {
    const {offsetHeight, scrollTop, scrollHeight} = el.currentTarget
    if (scrollTop + 100 >= scrollHeight - offsetHeight) {
      const page = Math.ceil(movies.length / 10) + 1
      const result = await _getMovies(searchValue, page)
      setMovies([...movies, ...result])
    }
  }

  const _handleModal = (image: string) => {
    outsideState.modalImage = image
    setShowModal(true)
  }

  console.log('movies', movies)

  return (
    <Content onScroll={(el) => _handleOnScroll(el)}>
      <PModal visible={showModal}>
        <MovieImage src={outsideState.modalImage} />
        <Text
          top="15px"
          font={fontFamily.pokemonSolid}
          center
          onClick={() => setShowModal(false)}
        >
          {t.movieList.close}
        </Text>
      </PModal>
      <HStack>
        <PokemonNameInput
          onChange={(el) => _handleTyping(el.target.value)}
          placeholder={t.movieList.inputPlaceholder}
          value={searchValue}
          color={colors.text}
        />
        <button onClick={() => _handleSearch()}>{t.movieList.search}</button>
      </HStack>
      <AutoCompleteContainer color={colors.background}>
        {
          suggestion.length !== 0 && suggestion.map((movie, index) =>
            (
              <Text
                key={index}
                top="10px"
                bottom="10px"
                size={fontSize.normal}
                center
                onClick={() => _handleClickSuggestion(movie.Title)}
              >
                {movie.Title}
              </Text>
            )
          )
        }
      </AutoCompleteContainer>
      {
        movies.map((movie, index) =>
          (
            <HStack top="50px" key={index} justify="space-between" onClick={() => _handleModal(movie.Poster)}>
              <Text>{movie.Title}</Text>
              <Text>{movie.Year}</Text>
            </HStack>
          )
        )
      }
      {
        loading ? <Text top="20px" center>{t.movieList.loading}</Text> : null
      }
    </Content>
  )
}

const Content = styled.div`
  height: calc(100% - 137px);
  overflow: scroll;
  padding: 0 12px 120px;
  -ms-overflow-style: none;  /* IE and Edge scrollbar */
  scrollbar-width: none;  /* Firefox scrollbar */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`
const AutoCompleteContainer = styled.div`
  background-color: ${(props) => props.color};
  left: 0;
  margin: 0 auto;
  position: absolute;
  width: 100%;
  z-index: 10;
`
const PokemonNameInput = styled.input`
  background: transparent;
  color: ${(props) => props.color};
  display: flex;
  height: 30px;
  margin: 0 auto;
  outline: none;
  padding: 0 10px;
  text-align: center;
  width: 100%;
  
  &::placeholder {
    color: ${(props) => props.color};
    font-weight: bold;
  }
`
const MovieImage = styled.img`
  width: 100%;
  height: 100%;
`

export default MovieList
