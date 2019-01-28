import s from 'styled-components'

import {
  minWidth,
  maxWidth,
  PHONE,
  TABLET,
} from '../constants/widths'

const percent = numCols => (numCols / 12 * 100) + '%'

export const Container = s.div`
  padding: 0 1rem;
  width: 100%;
  display: block;

  ${minWidth(PHONE)} {
    padding: 0 calc(1rem + 2.5%);
  }

  ${minWidth(TABLET)} {
    padding: 0 calc(1rem + 5%);
  }
`

export const Spacer = s.div`
  display: block;
  width: 100%;
  height: 1rem;
`

export const Row = s.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;

  ${({ margin }) => margin && `
    margin-left: -${margin};
    margin-right: -${margin};
  `}

  ${maxWidth(PHONE)} {
    display: block;
  }
`

export const Col = s.div`
  flex: ${({ width }) => width ? 'none' : 1};
  width: ${({ width }) => width || 'auto'};

  ${({ margin }) => margin && `
    margin-left: ${margin};
    margin-right: ${margin};
  `}

  ${maxWidth(PHONE)} {
    ${({ sm }) => sm && `
      width: ${percent(sm)};
      flex: none;
    `}

    ${({ offsetSm }) => offsetSm && `
      margin-left: ${percent(offsetSm)};
    `}
  }

  ${minWidth(PHONE)} {
    ${({ md }) => md && `
      width: ${percent(md)}
      flex: none;
    `}

    ${({ offsetMd }) => offsetMd && `
      margin-left: ${percent(offsetMd)};
    `}
  }

  ${minWidth(TABLET)} {
    ${({ lg }) => lg && `
      width: ${percent(lg)}
      flex: none;
    `}

    ${({ offsetLg }) => offsetLg && `
      margin-left: ${percent(offsetLg)};
    `}
  }

  ${({ flex }) => flex && (`
    display: flex;
  `)}
`

export const ColSpace = s(Col)`
  flex: none;
  width: ${({ width }) => width || '1rem'};

  ${maxWidth(PHONE)} {
    display: none;
  }
`
