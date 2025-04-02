import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  public navigateTo(page: string): void {
    this.router.navigate([page]);
  }
}
