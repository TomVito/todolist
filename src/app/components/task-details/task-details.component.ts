import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  @Input() task : Task | null = null;
  @Output() taskDetailsCloseEvent : EventEmitter<boolean> = new EventEmitter();
 
  ngOnInit(): void {}

  closeTaskDetails() {
    this.taskDetailsCloseEvent.emit(true);
  }
  
}
