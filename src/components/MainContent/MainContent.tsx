import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import NewsCard from '../../components/NewsCard/NewsCard';
import { useAppDispatch } from '../../core/store';
import { fetchNews } from '../../core/store/NewsSlice';

const MainContent = ({ allNews }: { allNews: number[] }) => {
	const dispatch = useAppDispatch();

	const onClick = () => {
		dispatch(fetchNews());
	};

	const renderNews = (news: number[]) => {
		return news.map((id: number) => <NewsCard key={id} id={id} />);
	};

	const news = renderNews(allNews);

	return (
		<>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					alignItems: 'flex-end',
					justifyContent: 'flex-end',
				}}>
				<Button
					onClick={onClick}
					variant='outlined'
					size='large'
					color='inherit'>
					Обновить
				</Button>
			</Box>

			<Grid container sx={{ mt: 0 }} spacing={2}>
				{news}
			</Grid>
		</>
	);
};

export default MainContent;
