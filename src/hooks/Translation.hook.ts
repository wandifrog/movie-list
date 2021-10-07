import globalTranslation from '../translations/Global.translation'
import homeTranslation from '../translations/Home.translation'
import movieListTranslation from '../translations/MovieList.translation'
import useApp from './App.hook'

function useTranslation() {
  const [state] = useApp()
  const { language } = state

  const t = {
    global: globalTranslation[language],
    home: homeTranslation[language],
    movieList: movieListTranslation[language],
  }

  return { t, language }
}

export default useTranslation
