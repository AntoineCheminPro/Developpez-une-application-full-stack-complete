import { Component } from '@angular/core';
import { BtnComponent } from '../../components/btn/btn.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BtnComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
