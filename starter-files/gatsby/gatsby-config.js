import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export default {
	siteMetadata: {
		title: `Slicks Slices`,
		siteUrl: 'http://localhost:8000',
		description: `Best Pizza west of the Mississippi!`,
	},
	plugins: [
		`gatsby-plugin-styled-components`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-sanity`,
			options: {
				projectId: `x9z7d9dr`,
				dataset: `production`,
				watchMode: true,
				token: process.env.SANITY_TOKEN,
			},
		},
	],
};
