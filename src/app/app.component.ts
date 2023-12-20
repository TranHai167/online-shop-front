import {Component} from '@angular/core';
import {LoaderService} from "./services/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'online-shop';
  loggedIn: boolean = !!localStorage.getItem('token');
  constructor(public loadingService: LoaderService) {}
}
