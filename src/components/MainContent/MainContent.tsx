import Grid from '@mui/material/Grid';
import NewsCard from '../../components/NewsCard/NewsCard';

const MainContent = ({ allNews }: { allNews: number[] }) => {
	const renderNews = (news: number[]) => {
		return news.map((id: number) => <NewsCard key={id} id={id} />);
	};

	const news = renderNews(allNews);

	return (
		<>
			<Grid container sx={{ mt: 0, pb: 2 }} spacing={2}>
				{news}
			</Grid>
		</>
	);
};

export default MainContent;
