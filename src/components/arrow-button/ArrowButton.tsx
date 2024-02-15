import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { useEffect, useRef /*, useState*/ } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type TArrowProps = {
	open: boolean;
	handleOpen: OnClick;
};

export const ArrowButton = (arrowProps: TArrowProps) => {
	const { open, handleOpen } = arrowProps;

	// const [isOpen, setIsOpen] = useState(open);
	const buttonRef = useRef<HTMLDivElement | null>(null);
	const arrowRef = useRef<HTMLImageElement | null>(null);

	useEffect(() => {
		buttonRef.current &&
			buttonRef.current.classList.toggle(styles.container_open);
		arrowRef.current && arrowRef.current.classList.toggle(styles.arrow_open);
	}, [open]);

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={styles.container}
			onClick={handleOpen}
			ref={buttonRef}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={styles.arrow}
				ref={arrowRef}
			/>
		</div>
	);
};
