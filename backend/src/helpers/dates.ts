import * as dayjs from 'dayjs';
import * as isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

const getWeekDates = (givenDate: string): string[] => {
    const date = givenDate ? dayjs(givenDate) : dayjs();

    const startOfWeek = date.startOf('isoWeek');

    const weekDates: string[] = [];

    for (let i = 0; i < 7; i++) {
        weekDates.push(startOfWeek.add(i, 'day').format('YYYY-MM-DD'));
    }

    return weekDates;
};

export { dayjs, getWeekDates };
