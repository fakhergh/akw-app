import { DateTime, DateTimeFormatOptions } from 'luxon';

export function formatDate(
    date: string | number,
    lng = 'en',
    options: DateTimeFormatOptions = DateTime.DATETIME_MED_WITH_WEEKDAY,
) {
    switch (typeof date) {
        case 'number':
            return DateTime.fromMillis(date)
                .setLocale(lng)
                .toLocaleString(options);
        default:
            return DateTime.fromISO(date)
                .setLocale(lng)
                .toLocaleString(options);
    }
}
