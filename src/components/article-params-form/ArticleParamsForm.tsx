import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, ReactNode, FormEvent } from 'react';

import { Button } from 'components/button';
import { Text } from 'components/text';
import { ArrowButton } from 'components/arrow-button';
import { useCloseByOutClick } from 'src/hooks/useCloseByOutClick';

type TForm = {
	header?: string;
	children: ReactNode | null;
	onSubmit?: (evt: FormEvent<HTMLFormElement>) => void;
	onReset?: () => void;
};

export const ArticleParamsForm = ({
	header,
	children,
	onSubmit,
	onReset,
}: TForm) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const toggleOpenForm = () => {
		setIsOpen(!isOpen);
	};

	useCloseByOutClick({
		isOpen,
		onClose: () => setIsOpen(false),
		rootRef: rootRef,
	});

	return (
		<>
			<ArrowButton open={isOpen} handleOpen={toggleOpenForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}
				ref={rootRef}>
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
