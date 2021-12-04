module.exports = {
  siteMetadata: {
    siteUrl: "https://stereotyper.io/",
    title: "Stereotyper",
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Nixie One\:400`,
          `Montserrat\:400`,
          `Roboto`,
          `Outfit`,
          `Raleway`,
          `Montagu Slab`,
        ],
        display: "swap",
      },
    },
  ],
};
