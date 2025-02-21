import { Component } from '@angular/core';

enum TabName {
  START,
  MEMBERS,
  QUERIES,
  EXPORT
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  standalone: false
})
export class ToolbarComponent {
  currentTab: TabName = TabName.START;

  switchTab(tab: TabName) {
    this.currentTab = tab;
  }

  protected readonly TabName = TabName;
}
