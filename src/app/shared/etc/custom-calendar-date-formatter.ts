import {DatePipe} from '@angular/common';
import {CalendarDateFormatter, DateFormatterParams} from 'angular-calendar';
import * as getISOWeek from 'date-fns/get_iso_week';

export class CustomCalendarDateFormatter extends CalendarDateFormatter {

  public monthViewTitle({date, locale}: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'MMMM, y', null, locale);
  }

  public weekViewTitle({date, locale}: DateFormatterParams): string {
    const year: string = new DatePipe(locale).transform(date, 'y', locale);
    const weekNumber: number = getISOWeek(date);
    return `第${weekNumber}周, ${year}`;
  }
}
