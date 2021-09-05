import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
  constructor(private datePipe: DatePipe) {}

  // Convert a date to a string in the format dd/mm/yyyy
  dateToString(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  getHoursAndMinutes(date: string): { hour: number; minute: number } {
    const hour = parseInt(date.split(':')[0]);
    const minute = parseInt(date.split(':')[1]);
    return { hour, minute };
  }
}