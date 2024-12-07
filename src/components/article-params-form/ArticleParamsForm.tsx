import { ArrowButton } from '../../ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { SyntheticEvent, useState, useRef, useEffect } from 'react';

import {
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

type TArticleParamsFormProps = {
	defaultStates: ArticleStateType;
	setCurrentArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultStates,
	setCurrentArticleState,
}: TArticleParamsFormProps) => {
	const [isFormOpen, setFormOpen] = useState<boolean>(false);

	const formRef = useRef<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLDivElement | null>(null);

	const asideStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isFormOpen,
	});

	const [fontFamilySelected, setFontFamilySelected] = useState(
		defaultStates.fontFamilyOption
	);
	const [fontSizeOptionsSelected, setFontSizeOptionsSelected] = useState(
		defaultStates.fontSizeOption
	);
	const [fontColorsSelected, setFontColorsSelected] = useState(
		defaultStates.fontColor
	);
	const [backgroundColorSelected, setbackgroundColorSelected] = useState(
		defaultStates.backgroundColor
	);
	const [contentWidthSelected, setContentWidthSelected] = useState(
		defaultStates.contentWidth
	);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				!formRef.current?.contains(target) &&
				!buttonRef.current?.contains(target)
			) {
				setFormOpen(false);
			}
		};

		if (isFormOpen) {
			window.addEventListener('mousedown', handleClickOutside);

			return () => {
				window.removeEventListener('mousedown', handleClickOutside);
			};
		}
	}, [isFormOpen, formRef, buttonRef, setFormOpen]);

	function resetValue() {
		setFontFamilySelected(fontFamilyOptions[0]);
		setFontSizeOptionsSelected(fontSizeOptions[0]);
		setFontColorsSelected(fontColors[0]);
		setbackgroundColorSelected(backgroundColors[0]);
		setContentWidthSelected(contentWidthArr[0]);

		setCurrentArticleState(defaultArticleState);
	}

	const submitValue = (e: SyntheticEvent) => {
		e.preventDefault();

		const currentArticleState = {
			fontFamilyOption: fontFamilySelected,
			fontColor: fontColorsSelected,
			backgroundColor: backgroundColorSelected,
			contentWidth: contentWidthSelected,
			fontSizeOption: fontSizeOptionsSelected,
		};
		console.log(currentArticleState);
		setCurrentArticleState(currentArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => {
					setFormOpen(!isFormOpen);
				}}
			/>

			<aside className={asideStyle} ref={formRef}>
				<form className={styles.form} onSubmit={submitValue}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamilySelected}
						onChange={setFontFamilySelected}
						options={fontFamilyOptions}
						title='ШРИФТ'
					/>
					<RadioGroup
						selected={fontSizeOptionsSelected}
						name='fontSize'
						onChange={setFontSizeOptionsSelected}
						options={fontSizeOptions}
						title='РАЗМЕР ШРИФТА'
					/>
					<Select
						selected={fontColorsSelected}
						onChange={setFontColorsSelected}
						options={fontColors}
						title='ЦВЕТ ШРИФТА'
					/>
					<Separator />
					<Select
						selected={backgroundColorSelected}
						onChange={setbackgroundColorSelected}
						options={backgroundColors}
						title='ЦВЕТ ФОНА'
					/>
					<Select
						selected={contentWidthSelected}
						onChange={setContentWidthSelected}
						options={contentWidthArr}
						title='ШИРИНА КОНТЕНТА'
					/>
					<div className={styles.bottomContainer}>
						<Button
							onClick={resetValue}
							htmlType='reset'
							title='Сбросить'
							type='clear'
						/>
						<Button htmlType='submit' title='Применить' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
