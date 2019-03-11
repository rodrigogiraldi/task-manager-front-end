import { Component, OnInit } from '@angular/core';

import { TaskService } from '../task.service';

import { Task } from '../task';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent implements OnInit {

  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAll().subscribe(
      res => {
        this.tasks = res.data;
      });
  }
}
