import { BiCheck } from 'react-icons/bi';
import TippyHeadless from '@tippyjs/react/headless';
import clsx from 'clsx';
import styles from './FilterCustom.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { removeVietnameseTones } from '~/common/funcs/optionConvert';
import { GrSearch } from 'react-icons/gr';
import { IoIosArrowDown } from 'react-icons/io';

const FilterCustom = ({ listFilter, name, query, isSearch, disabled = false }) => {
	const router = useRouter();
	const { [query]: queryStr, ...rest } = router.query;

	const [open, setOpen] = useState(false);
	const [keyword, setKeyword] = useState('');

	function getNameMethod(arr, id) {
		const item = arr?.find((v) => v.id === id) || null;
		return item?.name || 'Tất cả';
	}

	return (
		<TippyHeadless
			maxWidth={'100%'}
			interactive
			visible={open}
			onClickOutside={() => setOpen(false)}
			placement="bottom-start"
			render={(attrs) => (
				<div className={styles.mainOption}>
					{isSearch && (
						<div className={clsx(styles.main_search)}>
							<div className={styles.icon}>
								<GrSearch color="#005994" size={20} />
							</div>
							<input
								placeholder="Tìm kiếm..."
								value={keyword}
								onChange={(e) => setKeyword(e.target.value)}
							/>
						</div>
					)}
					<div className={styles.overflow}>
						<div
							className={clsx(styles.option, {
								[styles.option_active]: !queryStr,
							})}
							onClick={() => {
								setOpen(false);
								router.replace(
									{
										query: {
											...rest,
										},
									},
									undefined,
									{
										scroll: false,
									}
								);
							}}
						>
							<p>{'Tất cả'}</p>
							{!queryStr && (
								<div className={styles.icon_check}>
									<BiCheck fontSize={18} fontWeight={600} />
								</div>
							)}
						</div>
						{listFilter
							?.filter((v) =>
								removeVietnameseTones(v.name).includes(
									keyword ? removeVietnameseTones(keyword) : ''
								)
							)
							?.map((v, i) => (
								<div
									key={i}
									className={clsx(styles.option, {
										[styles.option_active]: queryStr === v.id,
									})}
									onClick={() => {
										setOpen(false);
										router.replace(
											{
												...router,
												query: {
													...router.query,
													[query]: v.id,
												},
											},
											undefined,
											{ scroll: false }
										);
									}}
								>
									<p>{v.name}</p>
									{queryStr === v.id && (
										<div className={styles.icon_check}>
											<BiCheck fontSize={20} fontWeight={600} />
										</div>
									)}
								</div>
							))}
					</div>
				</div>
			)}
		>
			<div
				className={clsx(styles.dealer, { [styles.active]: open, [styles.disabled]: disabled })}
				onClick={() => {
					if (disabled) {
						setOpen(false);
					} else {
						setOpen(!open);
					}
				}}
			>
				<div className={styles.value}>
					<p className={styles.name}>{name && `${name}:`}</p>
					<p className={styles.text}>{getNameMethod(listFilter, queryStr)}</p>
				</div>
				<div className={styles.icon_arrow}>
					<IoIosArrowDown size={16} />
				</div>
			</div>
		</TippyHeadless>
	);
};

export default FilterCustom;
