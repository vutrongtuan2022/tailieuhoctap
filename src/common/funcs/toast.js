import {toast} from 'react-toastify';
import IconToastifyCustom from '~/components/common/IconToastifyCustom';

export const toastText = (msg) =>
	toast.info(msg, {
		position: 'top-center',
		autoClose: 2000,
		hideProgressBar: true,
		closeButton: false,
		className: 'toastify-custom',
		icon: IconToastifyCustom({type: 'info'}),
	});

export const toastSuccess = (msg) =>
	toast.success(msg, {
		autoClose: 2000,
		hideProgressBar: true,
		position: 'top-center',
		closeButton: true,
		className: 'toastify-custom-success',
		icon: IconToastifyCustom({type: 'success'}),
	});

export const toastInfo = (msg) =>
	toast.info(msg, {
		autoClose: 2000,
		hideProgressBar: true,
		position: 'top-center',
		closeButton: true,
		className: 'toastify-custom-info',
		icon: IconToastifyCustom({type: 'info'}),
	});

export const toastWarn = (msg) =>
	toast.warning(msg, {
		autoClose: 2000,
		hideProgressBar: true,
		position: 'top-center',
		closeButton: true,
		className: 'toastify-custom-warn',
		icon: IconToastifyCustom({type: 'warn'}),
	});

export const toastError = (msg) =>
	toast.error(msg, {
		autoClose: 2000,
		hideProgressBar: true,
		position: 'top-center',
		closeButton: true,
		className: 'toastify-custom-error',
		icon: IconToastifyCustom({type: 'error'}),
	});
