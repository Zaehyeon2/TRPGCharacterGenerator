import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  textInformation: {
    textAlign: 'left',
    fontSize: 'small',
    fontWeight: 500,
    fontFamily: 'Greycliff CF, sans-serif',
  },
  textWeighted: {
    textAlign: 'left',
    fontSize: 'medium',
    fontWeight: 700,
    fontFamily: 'Greycliff CF, sans-serif',
  },
}));

export const explorerStyles = createStyles(() => ({
  label: {
    width: '50px',
    marginLeft: '10px',
  },
  sectionContainer: {
    padding: '0',
    paddingBottom: '10px',
    border: 'solid',
    marginTop: '16px',
  },
  sectionStack: {
    paddingBottom: '10px',
    border: 'solid',
    marginTop: '16px',
  },
  sectionStackNoMargin: {
    border: 'solid',
    paddingBottom: '10px',
    height: '330px',
  },
  statBox: {
    border: '1px solid',
    borderRadius: '0.5em',
    paddingTop: '11.15px',
    paddingBottom: '11.25px',
  },
  statBoxTall: {
    border: '1px solid',
    borderRadius: '0.5em',
    paddingTop: '11.15px',
    paddingBottom: '11.25px',
    height: '70.88px',
  },
  headerBlack: {
    backgroundColor: 'black',
    width: '100%',
  },
  headerBrown: {
    backgroundColor: 'brown',
  },
  headerTeal: {
    backgroundColor: 'teal',
  },
  headerPurple: {
    backgroundColor: 'purple',
  },
  headerGold: {
    backgroundColor: 'gold',
    color: 'black',
  },
  headerRed: {
    backgroundColor: 'red',
    color: 'white',
  },
  headerGray: {
    backgroundColor: 'lightgray',
    color: 'black',
  },
  headerYellow: {
    backgroundColor: 'yellow',
    color: 'black',
  },
  groupCenter: {
    margin: 'auto',
  },
  inputWidth60: {
    width: '60%',
  },
  marginX5: {
    marginLeft: '5px',
    marginRight: '5px',
  },
  gridMarginTop: {
    marginTop: '5px',
  },
  gridPadding: {
    padding: '5px',
  },
}));

export const componentStyles = createStyles(() => ({
  statContainer: {
    border: '1px solid',
    borderRadius: '0.5em',
  },
  skillLabel: {
    height: '30px',
  },
}));
