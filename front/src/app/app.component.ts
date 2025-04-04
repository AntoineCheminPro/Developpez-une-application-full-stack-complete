import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavigationService } from './core/services/navigation/navigation.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { storageProvider } from './core/providers/storage.provider';
import { AuthStorageService } from './core/services/auth.storage.service';
import { sessionProvider } from './core/providers/session.provider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AsyncPipe, NgIf],
  providers: [
    storageProvider,
    sessionProvider,
    AuthStorageService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public navigationService: NavigationService) {}
}
