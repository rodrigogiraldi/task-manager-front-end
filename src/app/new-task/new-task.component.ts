import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from '../task.service';
import { CategoryService } from '../category.service';

import { Task } from '../task';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  task: Task;
  categories: string[];

  taskStart = {
    date: "",
    time: ""
  };
  taskEnd = {
    date: "",
    time: ""
  };

  showAlert: boolean = false;
  alertMessage: string = "";
  alertType: string = "";

  constructor(private router: Router, private taskService: TaskService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.task = {
      id: 0,
      category: "",
      startDateTime: new Date(),
      endDateTime: new Date(),
      description: ""
    }

    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll().subscribe(
      res => {
        this.categories = res.data;
      });
  }

  createTask() {

    if (this.isFormValid()) {
      this.task.startDateTime = this.createDate(this.taskStart.date, this.taskStart.time);
      this.task.endDateTime = this.createDate(this.taskEnd.date, this.taskEnd.time);

      this.taskService.create(this.task).subscribe(
        res => {
          this.router.navigateByUrl("/search-task");
        }
      )
    }
    else {
      this.showAlert = true;
      this.alertMessage = "You have to fill in all the fields to create a task";
      this.alertType = "alert-warning";
    }

  }

  createDate(date: string, time: string): Date {
    return new Date(`${date} ${time}`);
  }

  isFormValid(): boolean {
    return (
      this.task.category !== "" &&
      this.task.description !== "" &&
      this.taskStart.date !== "" &&
      this.taskStart.time !== "" &&
      this.taskEnd.date !== "" &&
      this.taskEnd.time !== ""
    )
  }

}
