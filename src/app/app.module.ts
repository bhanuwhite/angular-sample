/*
 Importing all modules in application
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER,ErrorHandler } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Router, NavigationStart, NavigationEnd, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { TopBarComponent} from './components/common-components/top-bar/top-bar.component';
import { MenuLeftComponent } from './components/common-components/menu-left/menu-left.component';
import { MenuRightComponent } from './components/common-components/menu-right/menu-right.component';
import { FooterComponent } from './components/common-components/footer/footer.component';
import { ViewtaskComponent} from './components/module-component/task/task-view/task-view.component';
import { EdittaskComponent } from './components/module-component/task/task-edit/task-edit.component';
import { NewManagerComponent } from './components/module-component/people/manager-add/manager-add.component'
import { AddMemberComponent } from './components/module-component/people/member-add/member-add.component';


import { StructureModule } from './components/module-component/structure.module';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import {  ReactiveFormsModule } from "@angular/forms";

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';
import { UserService } from './services/user-service';

import {SelectModule} from 'angular2-select';

import { EmployeeApiService } from './services/people/employee.service';
import { TasktagService } from './services/task/task-tag.service';
import { UploadService } from './services/upload.service';




import { SimpleNotificationsModule } from 'angular2-notifications-lite';
import { PushNotificationsService } from 'angular2-notifications-lite';

import { StropheService } from 'app/services/strophe/strophe.service';


import { HttpHelper } from './helpers/http.helper'
import { ErrorHandlingService } from '../app/exception/error-handling.service';
import { LoggingService } from '../app/logging/logging.service';

import { AuthenticationService } from './services/login/authentication.service';
import { AuthGuard } from './services/_guards/index';
import {Injector} from "@angular/core";

import { SharedService } from './services/shared.service';
import { LoginSharedService } from './services/shared/login/login-shared';
import { EmployeeSharedService } from './services/shared/people/employee-shared';

declare var NProgress: any;
declare var $: any;
declare var jQuery: any;

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initFactory(config: ConfigService){
  return () => config.load()
}

/**
        TopBarComponent,
        MenuLeftComponent,
        MenuRightComponent,
        FooterComponent,
         */

@NgModule({
    declarations: [
        AppComponent,
        BranchDeepLink
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        HttpModule,
	      JsonpModule,
        RouterModule,
        routing,
        ModalModule.forRoot(),
        BootstrapModalModule,
        StructureModule,
	      SimpleNotificationsModule.forRoot()
    ],
    providers: [
      AuthGuard,
      UserService,
      SharedService,
      EmployeeApiService,
      UploadService,
      DatePipe,
      {
      	provide: APP_INITIALIZER,
      	useFactory: initFactory,
      	deps: [ConfigService, Http],
      	multi: true
      },
      { provide: ErrorHandler, useClass: ErrorHandlingService }
    ],
    bootstrap: [ AppComponent ],
    entryComponents: [  ]
})


export class AppModule {

  constructor(private router: Router,private injector: Injector) {
    ServiceLocator.injector = this.injector;
    router.events.subscribe((event) => {

      if(event instanceof NavigationStart) {
        NProgress.start();
      }

      if(event instanceof NavigationEnd) {
        setTimeout(function(){
          NProgress.done();
        }, 200);
      }

    });
  }
}

export class ServiceLocator {
    static injector: Injector;
}
