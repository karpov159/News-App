interface CommentData {
	by: string;
	id: number;
	kids: number[] | undefined;
	parent: number;
	text: string;
	time: number;
}

export default CommentData;
