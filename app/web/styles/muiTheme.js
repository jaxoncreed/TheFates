import {
  blue500, blue700, blue50,
  red500,
  grey100, grey300, grey400, grey500,
  white, darkBlack, transparent,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing: spacing,
  fontFamily: 'Lato, sans-serif',
  palette: {
    primary1Color: blue500,
    primary2Color: blue700,
    primary3Color: grey400,
    accent1Color: "#53c8ae",
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: blue500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: transparent,
  },
};