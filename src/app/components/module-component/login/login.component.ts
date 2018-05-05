import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ErrorHandlingService } from '../../../exception/error-handling.service';
import { LoggingService } from '../../../logging/logging.service';

import { AuthenticationRequestModel, AuthenticationResponseModel } from '../../../models/login/index';
import { AuthenticationService } from '../../../services/login/authentication.service';
import { SessionHelper } from '../../../helpers/session.helper';
import { StropheService } from "app/services/strophe/strophe.service";
import { environment } from "environments/environment";

declare var $: any;
declare var jQuery: any;
declare var autosize: any;
declare var Ladda: any;
declare var Chartist: any;
declare var NProgress: any;

@Component({
  selector: 'cat-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class LoginPage implements OnInit {

  private loginFormEmail: string;
  private status: string;
  private errorMessage: string;
  private disableButton: boolean;
  private signin_btn_txt: string;
  private loginDiv: boolean = true;
  private tenantList: any[];
  private accessToken: string
  private authenticationRes: AuthenticationResponseModel;
  private returnUrl: string;

  constructor(public route: ActivatedRoute, public router: Router, public _authenticationService: AuthenticationService, private _logger: LoggingService, private _errorHandler: ErrorHandlingService) {
    this.errorMessage = '';
    this.disableButton = false;
    this.signin_btn_txt = "Sign In";
    this.loginDiv = true;
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (SessionHelper.getAuthToken() != '') {
      if (this.returnUrl != '')
        this.router.navigate([this.returnUrl]);
      else
        this.router.navigate(["people"]);
    }
    else {
      $('body').addClass('content-page');
      this.loginDiv = true;
    }
  }

  /**
   * Method to authenticate user
   */
  async onSubmit(model) {
    // Validate required email  
    if (model.email == '') {
      this.errorMessage = "Email Should not be blank";
      return false;
    }

    // Validate required password
    if (model.password == '') {
      this.errorMessage = "Password Should not be blank";
      return false;
    }

    this.loginFormEmail = model.email;
    this.disableButton = true;
    this.errorMessage = '';
    this.signin_btn_txt = "Signing in..";

    // Start progress bar  
    NProgress.start();

    try {
      //authenticate user from server
      var respJson = await this._authenticationService.authenticate(model.email, model.password);

      //If there are multiple tenant from server set the tenantlist on same page 
      if (respJson.TenantList.length > 1) {
        this.loginDiv = false;
        this.tenantList = respJson.TenantList;
        this.accessToken = respJson.AccessToken;
      }
      //Get user information and setuserobject
      else {
        // Set User Session and User profile Session at single tenent login
        await this._authenticationService.setUserSession(respJson.UserId, respJson.AccessToken);

        // Open XMPP connection
        this.openXMPPConnection();

        // Navigate to request url
        this.navigateToRequestUrl();
      }
    }
    catch (ex) {
      this.errorMessage = this._errorHandler.handleHttpError(ex, "Login.Component.onSubmit");
    }
    finally {
      NProgress.done();
    }
  }

  /**
   * Method to authenticate mutlti tenant login
   * @param tenantId 
   */
  async multitenantLogin(tenantId: string) {
    NProgress.start();
    try {
      // Authenticate multitenat 
      var resp = await this._authenticationService.authenticateMultiTenant(this.loginFormEmail, this.accessToken, tenantId);

      // Set User Session and User profile Session at single tenent login              
      await this._authenticationService.setUserSession(resp.Id, this.accessToken);

      // Open XMPP Connection
      this.openXMPPConnection();

      // Navigate to request url
      this.navigateToRequestUrl();
    }
    catch (ex) {
      this.errorMessage = this._errorHandler.handleHttpError(ex, "LoginPage.generateTokenForMultiSelect");
    }
    finally {
      NProgress.done();
    }
  }

  /**
   * Method to open XMPP connection.
   */
  private openXMPPConnection(): void {    
    var xmppService = StropheService.Instance();
    xmppService.connect();
  }

  /**
   *  Method to navigate reqeust url. Default url is People module
   */
  private navigateToRequestUrl(): void {
    if (this.returnUrl != '')
      this.router.navigate([this.returnUrl]);
    else
      this.router.navigate(["home"]);
    //window.location.reload();
  }
}