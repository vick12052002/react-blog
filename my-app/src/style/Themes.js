import color from './color';
const Themes = {
  primary: {
    background: color['blue-dark'],
    navbarHover: color['blue-light'],
    shadow: color['blue-light'],
    textColor: color['white'],
    titleColor: color['blue-dark'],
    textHover: color['wheat'],
    mediaIcon: color['blue-dark'],
    errorText:color['red'],
  },
  secondary: {
    background: color['blue-light'],
    navbarHover: color['blue-dark']+'77',
    textHover: color['wheat'],
    shadow: color['blue-light'],
    textColor: color['blue-dark'],
    titleColor: color['blue-dark'],
    mediaIcon: color['blue-dark'],
    errorText:color['red'],
  },
}


export default Themes;