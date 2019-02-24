import { Component, OnInit } from '@angular/core';

import { TaskService } from '../task.service';

import { Task } from '../task';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  task: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.task = {
      id: 0,
      category: 0,
      startDateTime: new Date(),
      endDateTime: new Date()
    }
  }

  createTask() {
    this.taskService.create(this.task).subscribe(
      res => {
        console.log(res);
      }
    )
  }

}
