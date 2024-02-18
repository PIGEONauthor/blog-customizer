import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import { Select } from './components/select';
import { RadioGroup } from './components/radio-group';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import { ArrowButton } from 'components/arrow-button';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [pageState, setPageState] = useState(defaultArticleState);
	const [formState, setFormState] = useState(defaultArticleState);
	const [formIsOpen, setFormIsOpen] = useState(false);

	const handleSubmit = (evt: React.MouseEvent) => {
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
	}

	const handleCloseByOver = () => {
		formIsOpen && setFormIsOpen(!formIsOpen);
	}

	const handleOpenForm = () => {
		setFormIsOpen(!formIsOpen)
	}

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
				open={formIsOpen}
				onSubmit={handleSubmit}
				onReset={handleReset}
				openButton={
					<ArrowButton open={formIsOpen} handleOpen={handleOpenForm} />
				}>
				<Select
					options={fontFamilyOptions}
					selected={formState.fontFamilyOptions}
					title={'шрифт'}
					onChange={(option) => setFormState({
						...formState,
						fontFamilyOptions: option
					})}
				/>
				<RadioGroup
					options={fontSizeOptions}
					name={'размер шрифта'}
					selected={formState.fontSizeOptions}
					title={'размер шрифта'}
					onChange={(option) => setFormState({
						...formState,
						fontSizeOptions: option
					})}
				/>
				<Select
					options={fontColors}
					selected={formState.fontColors}
					title={'цвет шрифта'}
					onChange={(option) => setFormState({
						...formState,
						fontColors: option
					})}
				/>
				<Select
					options={backgroundColors}
					selected={formState.backgroundColors}
					title={'цвет фона'}
					onChange={(option) => setFormState({
						...formState,
						backgroundColors: option
					})}
				/>
				<Select
					options={contentWidthArr}
					selected={formState.contentWidthArr}
					title={'ширина контента'}
					onChange={(option) => setFormState({
						...formState,
						contentWidthArr: option
					})}
				/>
			</ArticleParamsForm>
			<Article handler={handleCloseByOver} />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
