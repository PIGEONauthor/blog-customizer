import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from '../../constants/articleProps';
import { Select } from '../../components/select';
import { RadioGroup } from 'src/components/radio-group';
import { Separator } from '../separator';
import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [pageState, setPageState] = useState(defaultArticleState);
	const [formState, setFormState] = useState(defaultArticleState);

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setPageState({
			...pageState,
			fontFamilyOptions: formState.fontFamilyOptions,
			fontSizeOptions: formState.fontSizeOptions,
			fontColors: formState.fontColors,
			contentWidthArr: formState.contentWidthArr,
			backgroundColors: formState.backgroundColors,
		});
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setPageState(defaultArticleState);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamilyOptions.value,
					'--font-size': pageState.fontSizeOptions.value,
					'--font-color': pageState.fontColors.value,
					'--container-width': pageState.contentWidthArr.value,
					'--bg-color': pageState.backgroundColors.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				header={'задайте параметры'}
				onSubmit={handleSubmit}
				onReset={handleReset}>
				<Select
					options={fontFamilyOptions}
					selected={formState.fontFamilyOptions}
					title={'шрифт'}
					onChange={(option) =>
						setFormState({
							...formState,
							fontFamilyOptions: option,
						})
					}
				/>
				<RadioGroup
					options={fontSizeOptions}
					name={'размер шрифта'}
					selected={formState.fontSizeOptions}
					title={'размер шрифта'}
					onChange={(option) =>
						setFormState({
							...formState,
							fontSizeOptions: option,
						})
					}
				/>
				<Select
					options={fontColors}
					selected={formState.fontColors}
					title={'цвет шрифта'}
					onChange={(option) =>
						setFormState({
							...formState,
							fontColors: option,
						})
					}
				/>
				<Separator />
				<Select
					options={backgroundColors}
					selected={formState.backgroundColors}
					title={'цвет фона'}
					onChange={(option) =>
						setFormState({
							...formState,
							backgroundColors: option,
						})
					}
				/>
				<Select
					options={contentWidthArr}
					selected={formState.contentWidthArr}
					title={'ширина контента'}
					onChange={(option) =>
						setFormState({
							...formState,
							contentWidthArr: option,
						})
					}
				/>
			</ArticleParamsForm>
			<Article />
		</div>
	);
};
