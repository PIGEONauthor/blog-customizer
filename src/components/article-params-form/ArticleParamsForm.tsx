import { Button } from 'components/button';
import { Text } from 'components/text';
import { useEffect, useRef, ReactNode } from 'react';
import styles from './ArticleParamsForm.module.scss';

type TForm = {
	open: boolean;
	openButton?: ReactNode,
	children: ReactNode,
	onSubmit?: (evt: React.MouseEvent) => void,
	onReset?: () => void
}

export const ArticleParamsForm = ({open, openButton, children, onSubmit, onReset}: TForm) => {
	
	const sideBarRef = useRef<HTMLElement | null>(null);
	const formRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		sideBarRef.current && sideBarRef.current.classList.toggle(styles.container_open);
	}, [open]);

	return (
		<>
			{openButton}
			{/* <ArrowButton open={isOpen} handleOpen={handleChangeState} /> */}
			<aside className={styles.container} ref={sideBarRef}>
				<form className={styles.form} ref={formRef}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						<p style={{color: '#000', fontFamily: 'Open Sans'}}>
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
