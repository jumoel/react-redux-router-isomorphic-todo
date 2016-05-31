import { injectStyleOnce } from 'aphrodite/lib/inject';
export { StyleSheet } from 'aphrodite';

// Copied from aphrodite source code, but modified to not
// use `!important`.
export const css = (...styleDefinitions) => {
	// Filter out falsy values from the input, to allow for
	// `css(a, test && c)`
	const validDefinitions = styleDefinitions.filter((def) => def);

	// Break if there aren't any valid styles.
	if (validDefinitions.length === 0) {
		return '';
	}

	const className = validDefinitions.map(s => s._name).join('-b33f-');
	injectStyleOnce(
		className,
		`.${className}`,
		validDefinitions.map(d => d._definition),
		false // Don't use `!important`
	);

	return className;
};
