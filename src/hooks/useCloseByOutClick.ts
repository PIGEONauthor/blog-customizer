import { useEffect } from 'react';

type TUseCloseByOutClick = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};
export function useCloseByOutClick({
	isOpen,
	onClose,
	rootRef,
}: TUseCloseByOutClick) {
	useEffect(() => {
		if (!isOpen) return;

		function handleClickOutside(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target);
			if (isOutsideClick) {
				onClose();
			}
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose, rootRef]);
}
