import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from 'components/text';
import { useEffect, useRef, useState } from 'react';
import { Select } from '../select';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
// import { OnClick } from '../arrow-button/ArrowButton';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLElement | null>(null);

	const handChangeState = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		formRef.current && formRef.current.classList.toggle(styles.container_open);
	}, [isOpen]);

	return (
		<>
			<ArrowButton open={isOpen} handleOpen={handChangeState} />
			<aside className={styles.container} ref={formRef}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						placeholder={'шрифт'}
						selected={fontFamilyOptions[0]}
						title={'шрифт'}
					/>
					<RadioGroup
						name={'размер шрифта'}
						options={fontSizeOptions}
						selected={fontSizeOptions[0]}
						title={'размер шрифта'}
					/>
					<Select
						options={fontColors}
						placeholder={'цвет шрифта'}
						selected={fontColors[0]}
						title={'цвет шрифта'}
					/>
					<Select
						options={backgroundColors}
						placeholder={'цвет фона'}
						selected={backgroundColors[0]}
						title={'цвет фона'}
					/>
					<Select
						options={contentWidthArr}
						placeholder={'ширина контента'}
						selected={contentWidthArr[0]}
						title={'ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
