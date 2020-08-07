import { Component, OnInit, Input } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  @Input()
  date!: Date;

  @Input()
  format!: string;

  get display() {
    const vm = this;

    return moment(vm.date).format(vm.format || 'DD');
  }

  constructor() { }

  ngOnInit(): void {
  }
}