interface NewsCardData {
	by: string;
	id: number;
	score?: number;
	time: number;
	title: string;
	kids: number[] | undefined;
}

export default NewsCardData;
