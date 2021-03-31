import Button from './Button';
import { useLocation } from 'react-router-dom';

const Header = ({ title, onAdd, showAddTask }) => {
	const location = useLocation();

	return (
		<header className="header">
			<h1>{title}</h1>
			{location.pathname === '/' && (
				<Button
					color={showAddTask ? '#D32F2F' : 'steelblue'}
					text={showAddTask ? 'Close' : 'Add'}
					onClick={onAdd}
				/>
			)}
		</header>
	);
};

export default Header;
