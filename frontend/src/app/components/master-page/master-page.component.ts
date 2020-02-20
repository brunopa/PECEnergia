import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent {

  title = 'app';
  currentUserName = null;
  @HostBinding('class') componentCssClass;
  @Input() showMasterPage: boolean = true;

  constructor(
    public overlayContainer: OverlayContainer,
    private router: Router,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.userSubject.subscribe(user => {
      if (user != null) {
        this.currentUserName = (user.nome || "");
        this.applyTheme(user.theme);
      }
    });

    var user = this.auth.getCurrentUser();

    if (user != null) {
      this.currentUserName = (user.nome || "");
      this.applyTheme(user.theme);
    }
  }

  sair() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  changeTheme(theme: string) {
    this.auth
      .setTheme(this.auth.getCurrentUser().id, theme)
      .subscribe(i => this.applyTheme(i.toString()));
  }

  applyTheme(theme: string) {
    this.componentCssClass = theme;

    const classList = this.overlayContainer.getContainerElement().parentElement.classList;//<body>
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add("mat-app-background");
    classList.add(theme);
  }

}
