import { Component, EventEmitter, Input, Output, output } from "@angular/core";

const theme = "light";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
selectTheme = output<string>();

  onThemeSwitcherClick(){
    this.selectTheme.emit(theme);
  }
}