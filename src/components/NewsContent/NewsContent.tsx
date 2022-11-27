import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import moment from 'moment';
import NewsCardData from '../../shared/interfaces/NewsCardData';
import Comment from '../Comment/Comment';
import Button from '@mui/material/Button';

interface NewsContentData {
	onReload: () => void;
}

const NewsContent = ({
	title,
	by,
	time,
	kids,
	onReload,
}: NewsCardData & NewsContentData) => {
	const calcTime = time ? moment.unix(time) : null;
	const convertedTime = calcTime
		? moment(calcTime, 'YYYYMMDD').fromNow()
		: null;

	const renderComments = (comments: number[]) => {
		return comments.map((comment) => {
			return <Comment key={comment} id={comment} padding={0} />;
		});
	};

	const numOfComments = kids ? kids.length : 0;

	const comments = kids ? renderComments(kids) : null;

	return (
		<Card
			elevation={3}
			sx={{
				width: '100%',
				minHeight: '200px',
				mt: 2,
				mb: 2,
			}}>
			<CardContent
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: 'column',
					minHeight: '100%',
				}}>
				<Typography sx={{ mt: 5 }} variant='h4' component='div'>
					{title}
				</Typography>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}>
					<Typography sx={{ mt: 3 }} variant='body1'>
						{'by ' + by + ' ' + convertedTime}
					</Typography>
				</Box>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						height: '50px',
						mt: 5,
					}}>
					<Typography variant='body1'>
						Comments {numOfComments}
					</Typography>

					<Button
						onClick={onReload}
						variant='text'
						size='small'
						color='inherit'>
						Обновить
					</Button>
				</Box>

				{comments}
			</CardContent>
		</Card>
	);
};

export default NewsContent;
