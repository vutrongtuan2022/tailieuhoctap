import React from 'react';
import styles from './Breadcrumb.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import clsx from 'clsx';

import { DocumentText1 } from 'iconsax-react';

function Breadcrumb( listUrls, action ) {
	const navigate = useNavigate();

	return (
		<div className={clsx(styles.container)}>
			<div className={styles.main}>
				<div className={styles.breadcrumb}>
					<div className={styles.icon}>
						<DocumentText1 size={20} />
					</div>

					{listUrls?.map((v, i) => (
						<div key={i} className={styles.item}>
							{v.path && i !== listUrls.length - 1 ? (
								<Link
									to={v.path}
									className={clsx(styles.link, { [styles.pathNow]: i === listUrls.length - 1 })}
								>
									{v.title}
								</Link>
							) : (
								<span className={clsx(styles.link, styles.pathNow)}>{v.title}</span>
							)}
							{i !== listUrls.length - 1 && <IoIosArrowForward color='#fff' />}
						</div>
					))}
				</div>
				{action}
			</div>
		</div>
	);
}

export default Breadcrumb;
