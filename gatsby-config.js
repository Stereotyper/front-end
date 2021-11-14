module.exports = {
  siteMetadata: {
    siteUrl: "https://www.stereotyper.io",
    title: "Stereotyper",
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Nixie One\:400`],
        display: "swap",
      },
    },
  ],
};
