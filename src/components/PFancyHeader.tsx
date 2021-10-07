import React from 'react'
import styled from '@emotion/styled'
import { fontFamily } from '../constants/Fonts.constant'
import useApp from '../hooks/App.hook'
import useTheme from '../hooks/Theme.hook'

const outsideState = {
  activeIndex: -3,
}

/**
 * Pokemon header component.
 * @example
 * <PFancyHeader />
 */
const PFancyHeader = (): JSX.Element => {
  const [state] = useApp()
  const colors = useTheme()
  
  const [activeIndex, setActiveIndex] = React.useState(-1)
  
  React.useEffect(() => {
    setInterval(() => {
      if (outsideState.activeIndex < 8) {
        outsideState.activeIndex++
        setActiveIndex(outsideState.activeIndex)
      } else {
        outsideState.activeIndex = -3
        setActiveIndex(outsideState.activeIndex)
      }
    }, 500)
  }, [])

  return (
    <FancyHeader color={colors.text} darkMode={state.darkMode}>
      <span style={{ color: ([-3, -1, 0].includes(activeIndex)) ? colors.fancyHeaderActive : colors.fancyHeader }}>M</span>
      <span style={{ color: ([-3, -1, 1].includes(activeIndex)) ? colors.fancyHeaderActive : colors.fancyHeader }}>o</span>
      <span style={{ color: ([-3, -1, 2].includes(activeIndex)) ? colors.fancyHeaderActive : colors.fancyHeader }}>v</span>
      <span style={{ color: ([-3, -1, 3].includes(activeIndex)) ? colors.fancyHeaderActive : colors.fancyHeader }}>i</span>
      <span style={{ color: ([-3, -1, 4].includes(activeIndex)) ? colors.fancyHeaderActive : colors.fancyHeader }}>e</span>
      <span style={{ color: ([-3, -1, 5].includes(activeIndex)) ? colors.fancyHeaderActive : colors.fancyHeader }}> </span>
      <span style={{ color: ([-3, -1, 5].includes(activeIndex)) ? colors.fancyHeaderActive : colors.fancyHeader }}>L</span>
      <span style={{ color: ([-3, -1, 6].includes(activeIndex)) ? colors.fancyHeaderActive : colors.fancyHeader }}>i</span>
      <span style={{ color: ([-3, -1, 7].includes(activeIndex)) ? colors.fancyHeaderActive : colors.fancyHeader }}>s</span>
      <span style={{ color: ([-3, -1, 8].includes(activeIndex)) ? colors.fancyHeaderActive : colors.fancyHeader }}>t</span>
    </FancyHeader>
  )
}

const FancyHeader = styled.div<{ darkMode: boolean }>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.darkMode ? fontFamily.pokemonHollow : fontFamily.pokemonSolid};
  font-size: 30px;
  font-weight: ${(props) => props.darkMode ? 'bold' : 'normal'};
  letter-spacing: ${(props) => props.darkMode ? '0' : '4px'};
  margin: 0;
  padding: 15px;
  text-align: center;
`

export default PFancyHeader
