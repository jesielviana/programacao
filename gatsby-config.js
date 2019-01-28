module.exports = {
  siteMetadata: {
    title: `CIS 197`,
    description: `JavaScript web development at the University of Pennsylvania.`, // eslint-disable-line
    author: `Cameron Cabo <ccabo@seas.upenn.edu>`,
    keywords: [
      'javascript',
      'js',
      '197',
      'cis197',
      'cis',
      'seas',
      'penn',
      'upenn',
      'university',
      'pennsylvania',
      'script',
      'react',
      'learn',
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`, // eslint-disable-line
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // Path is relative to site root
      },
    },

    // Optional plugin that enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
