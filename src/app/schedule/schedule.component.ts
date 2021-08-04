import { Component, Input } from '@angular/core';

import { chunk, range } from 'lodash';
import * as moment from 'moment';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {

  @Input()
  baseDate: Date = new Date();

  /**
   * Tiêu đề hiển thị dựa vào baseDate
   */
  get title() {
    const vm = this;

    return moment(vm.baseDate).format('MMMM YYYY')
  }

  /**
   * Hàm tính toán số ngày hiển thị dựa vào baseDate
   */
  get dates(): Array<Date[]> {
    const vm = this;
    const { baseDate } = vm;

    const firstDate = moment(baseDate).startOf('month').startOf('week');

    const dates = range(0, 42).map((i) => firstDate.clone().add(i, 'day').toDate());

    return chunk(dates, 7);
  }

  isSameMonth(date: Date) {
    const vm = this;

    return date.getMonth() === vm.baseDate.getMonth() ? 'normal' : 'disabled';
  }

  /**
   * Có thể viết gộp các hàm check lại hoặc cấu trúc dữ liệu thành
   * một đối tượng cho dễ bind và quản lý state
   * @param date 
   */
  isRestDay(date: Date) {
    return [0, 6].indexOf(date.getDay()) > -1 ? 'rest-day' : 'normal';
  }

  isHoliday(date: Date) {
    return date.getDate() === 24 ? 'holiday': 'normal';
  }
}
