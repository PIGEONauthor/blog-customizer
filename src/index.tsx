import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from './constants/articleProps';
import { Select } from './components/select';
import { RadioGroup } from './components/radio-group';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
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
				<div style={{ height: '1px', color: '#D7D7D7', opacity: '0.5' }}>
					<hr></hr>
				</div>
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

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
