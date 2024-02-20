import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

const ArrowWirhState = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<ArrowButton open={isOpen} handleOpen={() => setIsOpen(!isOpen)} />
		</>
	);
};

export const ArrowButtonStory: Story = {
	render: () => <ArrowWirhState />,
};
