import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { Fragment, memo, useEffect, useMemo, useState } from 'react';

import DateItem from './Calendar.dateItem';
import style from './Calendar.module.scss';
import clsx from 'clsx';

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const TYPE = ['XEM_NGAY', 'XEM_THANG', 'XEM_NAM'];

const listMonth = [1, 3, 5, 7, 8, 10, 12];
const listDay = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

function Calendar({ onClickDay, show, blockOldDay, futureDayblock }) {
	const [month, setMonth] = useState(new Date().getMonth() + 1);
	const [year, setYear] = useState(new Date().getFullYear());
	const [numberDay, setNumberDay] = useState(0);
	const [listDate, setListDate] = useState([]);
	const [type, setType] = useState(TYPE[0]);
	const [timeSelect, setTimeSelect] = useState(null);
	const [yearTable, setYearTable] = useState();

	const handlePrevMonth = () => {
		if (type === TYPE[0]) {
			setMonth(month - 1);
			if (month === 1) {
				setMonth(12);
				setYear(year - 1);
			}
		} else if (type === TYPE[1]) {
			setYear(year - 1);
		} else if (type === TYPE[2]) {
			setYearTable((prev) => ({
				last: prev.last - 12,
				first: prev.first - 12,
			}));
		}
	};

	const handleNextMonth = () => {
		if (type === TYPE[0]) {
			setMonth(month + 1);
			if (month === 12) {
				setMonth(1);
				setYear(year + 1);
			}
		} else if (type === TYPE[1]) {
			setYear(year + 1);
		} else if (type === TYPE[2]) {
			setYearTable((prev) => ({
				last: prev.last + 12,
				first: prev.first + 12,
			}));
		}
	};

	useEffect(() => {
		setType(TYPE[0]);
	}, [show]);

	useEffect(() => {
		setYearTable({
			first: year - 5,
			last: year + 6,
		});
	}, [year]);

	useEffect(() => {
		if (listMonth.includes(month)) {
			setNumberDay(31);
		} else if (month === 2) {
			setNumberDay(
				(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28
			);
		} else {
			setNumberDay(30);
		}
	}, [month, year]);

	useEffect(() => {
		const dateCurrent = new Date().toDateString();
		for (let i = 1; i <= numberDay; i++) {
			const date = new Date(`${year}/${month}/${i}`);

			const item = {
				time: Number(date),
				date: i,
				day: date.getDay(),
				status: date.toDateString() === dateCurrent ? 'current' : 'empty',
				isBlock:
					(blockOldDay && Number(date) < new Date(dateCurrent).getTime()) ||
					(futureDayblock &&
						Number(date) > new Date(dateCurrent).getTime() + 86400000 * futureDayblock),
			};

			if (i === 1) {
				for (let j = 1; j <= date.getDay(); j++) {
					const timer = Number(date) - 86400000 * j;
					const dateFirst = new Date(timer);
					const itemFisrt = {
						time: Number(dateFirst),
						date: dateFirst.getDate(),
						day: dateFirst.getDay(),
						status: 'outDate',
					};
					setListDate((prev) => [itemFisrt, ...prev]);
				}
			}

			setListDate((prev) => [...prev, item]);
		}

		return () => setListDate([]);
	}, [numberDay, month, year]);

	const handleChangeType = () => {
		setType(type === TYPE[0] ? TYPE[1] : type === TYPE[1] ? TYPE[2] : TYPE[0]);
	};

	const listYear = useMemo(() => {
		const list = [];
		for (let i = yearTable?.first; i <= yearTable?.last; i++) {
			list.push(i);
		}
		return list;
	}, [yearTable]);

	const displayTextTitle = useMemo(() => {
		if (type === TYPE[1]) return `Năm ${year}`;
		if (type === TYPE[2]) return `Từ ${yearTable.first} - ${yearTable.last}`;
		return `Tháng ${month < 10 ? `0${month}` : month}/${year}`;
	}, [month, year, type, yearTable]);

	return (
		<div className={style.calendar}>
			<div className={style.month}>
				<div className={style.btnMonth} onClick={handlePrevMonth}>
					<MdArrowBackIosNew />
				</div>
				<span className={style.monthText} onClick={handleChangeType}>
					{displayTextTitle}
				</span>
				<div className={style.btnMonth} onClick={handleNextMonth}>
					<MdArrowForwardIos />
				</div>
			</div>
			{type === TYPE[0] && (
				<Fragment>
					<div className={style.day}>
						{listDay.map((text) => (
							<div key={text} className={style.itemDay}>
								{text}
							</div>
						))}
					</div>
					<div className={style.listDate}>
						{listDate.map((item) => (
							<DateItem
								key={item.time}
								date={item.date}
								status={item.status}
								time={item.time}
								onClick={onClickDay}
								isActive={timeSelect === item.time}
								onChoose={setTimeSelect}
								disable={item.isBlock}
							/>
						))}
					</div>
				</Fragment>
			)}
			{type === TYPE[1] && (
				<div className={style.dataMonth}>
					{months.map((v) => (
						<div
							key={v}
							className={clsx(style.itemMonth, {
								[style.active]: v === month,
							})}
							onClick={() => {
								setMonth(v);
								setType(TYPE[0]);
							}}
						>
							Tháng {v}
						</div>
					))}
				</div>
			)}
			{type === TYPE[2] && (
				<div className={style.dataMonth}>
					{listYear.map((v) => (
						<div
							key={v}
							className={clsx(style.itemMonth, {
								[style.active]: v === year,
							})}
							onClick={() => {
								setYear(v);
								setType(TYPE[1]);
							}}
						>
							{v}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default memo(Calendar);
