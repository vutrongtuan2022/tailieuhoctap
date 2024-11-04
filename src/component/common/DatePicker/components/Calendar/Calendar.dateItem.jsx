import clsx from 'clsx';
import {memo} from 'react';
import style from './Calendar.module.scss';


function DateItem(date, status, time, isActive, disable, onClick, onChoose) {
	const handleClick = () => {
		if (!disable) {
			onChoose(time);
			if (onClick) {
				onClick(time);
			}
		}
	};
	return (
		<div
			className={clsx(style.dateItem, style[`${status}`], {
				[style.active]: isActive,
				[style.disable]: disable,
			})}
			onClick={handleClick}
		>
			<span className={style.dateText}>{date}</span>
		</div>
	);
}

export default memo(DateItem);
