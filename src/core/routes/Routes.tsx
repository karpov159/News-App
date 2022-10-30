import { Routes, Route } from 'react-router-dom';
import { MAIN, NEWS } from '../config/RoutesConfig';
import { Main, News } from '../../pages';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path={MAIN} element={<Main />} />
			<Route path={NEWS} element={<News />} />
		</Routes>
	);
};

export default AppRoutes;
