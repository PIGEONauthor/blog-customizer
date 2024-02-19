import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, ReactNode, FormEvent, useEffect } from 'react';

import { Button } from 'components/button';
import { Text } from 'components/text';
import { ArrowButton } from 'components/arrow-button';

type TForm = {
	open?: boolean;
	header?: string;
	children: ReactNode | null;
	onSubmit?: (evt: FormEvent<HTMLFormElement>) => void;
	onReset?: () => void;
};

export const ArticleParamsForm = ({
	open,
	header,
	children,
	onSubmit,
	onReset,
}: TForm) => {
	const [formIsOpen, setFormIsOpen] = useState(open || false);
	const rootRef = useRef<HTMLDivElement>(null);

	const toggleOpenForm = () => {
		setFormIsOpen(!formIsOpen);
	};
	// -----------------------------------------------------------------------
	/*
	 ** данный блок реализует закрытие по клику вне формы:
	 ** может быть криво, зато работает)
	 */
	const handleCloseByOver = () => {
		window.removeEventListener('click', handleCloseByOver);
		setFormIsOpen(false);
	};

	const handleMouseOut = () => {
		formIsOpen && window.addEventListener('click', handleCloseByOver);
	};

	const handleMouseEnter = () => {
		window.removeEventListener('click', handleCloseByOver);
	};
	/* useEffect использован для того, чтобы повесить слушатель, если
		при открытии формы на ней не оказалось курсора (кто-то очень шустрый) */
	useEffect(() => {
		setTimeout(() => {
			handleMouseOut();
		}, 0);
	}, [formIsOpen]);
	// -----------------------------------------------------------------------
	return (
		<>
			<ArrowButton open={formIsOpen} handleOpen={toggleOpenForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: formIsOpen,
				})}
				ref={rootRef}
				onMouseLeave={handleMouseOut}
				onMouseEnter={handleMouseEnter}>
				<form className={styles.form} onSubmit={onSubmit}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						<p style={{ color: '#000', fontFamily: 'Open Sans' }}>{header}</p>
					</Text>

					{children}

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={onReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
