import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
// import {
// 	fontFamilyOptions,
// 	fontColors,
// 	backgroundColors,
// 	contentWidthArr,
// 	fontSizeOptions,
// } from 'src/constants/articleProps';
import { Text } from 'components/text';
import { useEffect, useRef, useState, ReactNode } from 'react';
// import { Select } from '../select';
import styles from './ArticleParamsForm.module.scss';
// import { RadioGroup } from '../radio-group';
// import { OnClick } from '../arrow-button/ArrowButton';

type TForm = {
	children: ReactNode,
	onSubmit: (evt: React.MouseEvent) => void,
	onReset: () => void
}

export const ArticleParamsForm = ({children, onSubmit, onReset}: TForm) => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLElement | null>(null);

	const handleChangeState = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		formRef.current && formRef.current.classList.toggle(styles.container_open);
	}, [isOpen]);

	return (
		<>
			<ArrowButton open={isOpen} handleOpen={handleChangeState} />
			<aside className={styles.container} ref={formRef}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						<p style={{color: '#000'}}>
							задайте параметры
						</p>
					</Text>

					{children}

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={onReset}/>
						<Button title='Применить' type='submit' onClick={onSubmit}/>
					</div>
				</form>
			</aside>
		</>
	);
};
