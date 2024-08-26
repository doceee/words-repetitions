import dayjs, { extend, locale } from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/pl';

extend(isToday);
locale('pl');

dayjs.extend(localizedFormat);

export { dayjs };
