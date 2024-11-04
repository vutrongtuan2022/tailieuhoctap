import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Button.module.scss';
import { useStyleClass } from '~/common/hooks/usStyleClass';

function Button({ children, onClick, icon, href, className, target, div, ...props }) {
	const styleClass = useStyleClass(props, styles);

	let onClickHandler = null;

	// Chọn component bọc ngoài
	let Wrapper = onClick ? 'div' : 'button';
	let Comp = 'div';

	if (href) {
		Wrapper = Link; // Sử dụng Link từ react-router-dom nếu có href
		Comp = 'div';
	}

	const handleClick = (e) => {
		if (props.disable) {
			e.preventDefault();
		}

		if (!props.disable && onClick) {
			onClick(e);
		}
	};

	// Đảm bảo onClick handler không hoạt động nếu không có href
	if (!href) {
		onClickHandler = {
			onClick: handleClick,
		};
	}

	return (
		<Wrapper
			to={href} // Dùng `to` thay cho `href` trong react-router-dom
			className={clsx(styles.container, {
				[styles.maxContent]: props.maxContent,
				[styles.maxHeight]: props.maxHeight,
			})}
			{...onClickHandler}
			target={target}
		>
			<Comp className={clsx(styleClass, styles.btn, className)}>
				{icon && <div className={styles.icon}>{icon}</div>}
				<div className={styles.text}>{children}</div>
			</Comp>
		</Wrapper>
	);
}

export default Button;
