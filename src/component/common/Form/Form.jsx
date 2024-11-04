import {memo, useCallback, useMemo, useState} from 'react';
import {FormContext} from './contexts';

function Form({children, form, setForm, onSubmit}) {
	const convertForm = Object.fromEntries(Object.entries(form).map(([key]) => [key, null]));

	const [countValidate, setCountValidate] = useState<number>(0);
	const [errorText, setErrorText] = useState<any>(convertForm);
	const [validate, setValidate] = useState<any>(null);

	const isDone = useMemo(() => {
		if (!validate) {
			return false;
		}

		for (let i in validate) {
			if (!validate[i]) {
				return false;
			}
		}
		return true;
	}, [validate]);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			if (isDone) {
				onSubmit && onSubmit();
			} else {
				setCountValidate(countValidate + 1);
			}
		},
		[countValidate, isDone, onSubmit]
	);

	return (
		<FormContext.Provider
			value={{
				form,
				setForm,
				errorText,
				setErrorText,
				validate,
				setValidate,
				countValidate,
				setCountValidate,
				isDone,
			}}
		>
			<form onSubmit={handleSubmit}>{children}</form>
		</FormContext.Provider>
	);
}

export default memo(Form);
