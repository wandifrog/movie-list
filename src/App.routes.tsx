import styled from '@emotion/styled'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import PBottomNavigation from './components/PBottomNavigation'
import PFancyHeader from './components/PFancyHeader'
import useTheme from './hooks/Theme.hook'
import Home from './pages/Home.page'
import MovieList from './pages/MovieList.page'

type ContainerProps = {
  background: string
}

const AppRoutes = (): JSX.Element => {
  const colors = useTheme()

  return (
    <Router>
      <Container background={colors.background}>
        <PFancyHeader />
        <Switch>
          <Route path="/movies" exact>
            <MovieList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <PBottomNavigation />
      </Container>
    </Router>
  )
}

const Container = styled.div<ContainerProps>`
  margin: 0 auto;
  position: relative;
  background-color: ${(props) => props.background};
  width: 375px;
  height: 100vh;
  @media (max-width: 375px) {
    width: 100%;
  }
`

export default AppRoutes
