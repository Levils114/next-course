import Head from 'next/head';

interface ISEO{
	title: string;
	description?: string;
	image?: string;
	shouldExcludeTitleSuffix?: boolean;
	shouldIndexPage?: boolean;
}

const SEO: React.FC<ISEO> = ({ title, description, image, shouldExcludeTitleSuffix = false, shouldIndexPage = true }: ISEO) => {
	const pageTitle = !!shouldExcludeTitleSuffix ? `${title}` : `${title} | Rocketseat`;

	return(
		<Head>
			<title>{pageTitle}</title>

			{!!description && (<meta name="description" content={description} />)}
			{!!image && (<meta name="image" content={image}/>)}

			{!shouldIndexPage && (<meta name="robots" content="noindex,nofollow"/>)}
		</Head>
	);
};

export default SEO;