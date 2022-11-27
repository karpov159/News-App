import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../core/store';
import { fetchItem } from '../../core/store/NewsSlice';
import CommentData from '../../shared/interfaces/CommentData';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import Button from '@mui/material/Button';

const Comment = ({ id, padding }: { id: number; padding: number }) => {
	const [commentData, setCommentData] = useState<CommentData>();
	const [isChildrenShowed, setShowChildren] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchItem(id))
			.unwrap()
			.then((res) => setCommentData(res));
	}, [dispatch, id]);

	const calcTime = commentData?.time ? moment.unix(commentData?.time) : null;

	const convertedTime = calcTime
		? moment(calcTime, 'YYYYMMDD').fromNow()
		: null;

	const onClick = () => {
		if (commentData?.kids) {
			setShowChildren(!isChildrenShowed);
		}
	};

	const renderChildrenComments = (comments: number[]) => {
		return comments.map((comment) => {
			return <Comment key={comment} id={comment} padding={padding + 2} />;
		});
	};

	const childrenComments = commentData?.kids
		? renderChildrenComments(commentData.kids)
		: null;

	const renderText = () => {
		return {
			__html: commentData!.text,
		};
	};

	const openCommentsButton =
		commentData?.kids && !isChildrenShowed ? (
			<Button size='small' onClick={onClick}>
				Show more comments
			</Button>
		) : null;

	const hideCommentsButton = isChildrenShowed ? (
		<Button size='small' onClick={onClick}>
			Hide comments
		</Button>
	) : null;

	const text = commentData?.text ? (
		<Typography
			dangerouslySetInnerHTML={renderText()}
			sx={{ mt: 1 }}
			component='div'
			variant='body1'
		/>
	) : null;

	return commentData ? (
		<>
			<Box
				sx={{
					pl: padding,
					mt: 2,
					minWidth: '100%',
					minHeight: '50px',
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'flex-start',
					cursor: 'default',
				}}>
				<AccountCircleIcon sx={{ height: '50px' }} fontSize='large' />

				<Box
					sx={{
						ml: 2,
						mt: 1,
					}}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-start',
							alignItems: 'flex-start',
						}}>
						<Typography component='div' variant='body2'>
							{commentData?.by}
						</Typography>

						<Typography
							sx={{ ml: 2 }}
							component='div'
							variant='caption'>
							{convertedTime}
						</Typography>
					</Box>

					{text}

					{hideCommentsButton}

					{openCommentsButton}
				</Box>
			</Box>

			{isChildrenShowed ? childrenComments : null}
		</>
	) : null;
};

export default Comment;
