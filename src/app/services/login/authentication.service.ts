//===============================================================================
// © 2015 eWorkplace Apps.  All rights reserved.
// Original Author: Sanjeev Khanna
// Original Date: 10 June 2017
//==============================================================================

import { Injectable, Injector } from '@angular/core';
import { AuthenticationRequestModel, AuthenticationResponseModel, SetLoginSessionReqeustModel } from '../../models/login/index'
import { HttpHelper } from '../../helpers/http.helper';
import { Config } from '../../config/config';
import { ErrorHandlingService } from '../../exception/error-handling.service';
import { CommonHelper } from '../../helpers/common.helper';
import { SharedEnvironment } from 'environments/shard-environment';
import { SessionHelper } from "app/helpers/session.helper";
import { LoggingService } from "app/logging/logging.service";
import { Http, Headers, Request, Response, RequestMethod, RequestOptionsArgs, XHRBackend, ConnectionBackend, BrowserXhr, ResponseOptions, XSRFStrategy, BaseResponseOptions, CookieXSRFStrategy, RequestOptions, BaseRequestOptions } from '@angular/http';
import { AuthConstants } from "app/misc/constants";
import { AppLocaleHelper } from "app/helpers/applocale.helper";

@Injectable()
export class AuthenticationService {

  constructor(private _httpHelper: HttpHelper, private _errorHandler: ErrorHandlingService, private _logger: LoggingService) {
  }

  /**
   * Authenticate user 
   * @param email: Login Email Id 
   * @param password: Login Password 
   */
  async authenticate(email: string, password: string): Promise<any> {
    let appLocalhelper: AppLocaleHelper = new AppLocaleHelper();
    // Init Reqeust   
    let request: AuthenticationRequestModel = new AuthenticationRequestModel();
    request.AuthenticationType = 1;
    request.LoginEmail = email;
    request.Password = password;
    request.RequesterType = 2;
    request.RequesterId = "";    
    request.IANATimeZoneId = appLocalhelper.getIANATimeZoneId();
    request.Region = appLocalhelper.getRegion();
    request.RegionLanguage = appLocalhelper.getRegionLanguage();
    request.ApplicationId = SharedEnvironment.ApplicationId;
    request.OAuthAccessToken = "";
    request.Latitude = appLocalhelper.getLatitude();
    request.Longitude = appLocalhelper.getLongitude();
    // Reqeust Url
    let requestUrl: string = Config.AuthenticationBaseURL + 'tenantusers/authenticateuser';

    // Init reqeust option  
    let headers: Headers = new Headers();
    let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });

    // Call API
    return await this._httpHelper.post(requestUrl, request, reqOption).toPromise();
  }

  /**
   * Authenticate multitennat user
   * @param email: Login user email 
   * @param token: EwpAccess token 
   * @param tenantId: Selected tenant 
   */
  async authenticateMultiTenant(email: string, token: string, tenantId: string): Promise<any> {
    // Init request  
    let appLocalhelper: AppLocaleHelper = new AppLocaleHelper();
    let request: SetLoginSessionReqeustModel = new SetLoginSessionReqeustModel();
    request.LoginEmail = email;
    request.AccessToken = token;
    request.IANATimeZoneId = appLocalhelper.getIANATimeZoneId();
    request.Region = appLocalhelper.getRegion();
    request.RegionLanguage = appLocalhelper.getRegionLanguage();
    request.Latitude = appLocalhelper.getLatitude();
    request.Longitude = appLocalhelper.getLongitude();
    request.TenantId = tenantId;
    // Reqeust url
    let requestUrl: string = Config.AuthenticationBaseURL + "tenantusers/settenantinloginsession";

    // Init reqeust option  
    let headers: Headers = new Headers();
    headers.append(AuthConstants.EwpAccessTokenKey, token);
    let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });

    // Call APi.
    return this._httpHelper.put(requestUrl, request, reqOption).toPromise();
  }

  /**
   * Get user information from server and set in local storage
   * @param userId: Login user Id
   * @param accessToken: EwpAccess token. 
   */
  async setUserSession(userId: string, accessToken: string): Promise<any> {
    // Init reqeust option  
    let headers: Headers = new Headers();
    headers.append(AuthConstants.EwpAccessTokenKey, accessToken);
    let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });

    // Reqeust url
    let loginSessionUrl: string = Config.EDBaseUrl + "employees/userid/" + userId;

    console.log(accessToken);
    // Call server API  
    var resp = await this._httpHelper.get(loginSessionUrl, reqOption).toPromise();

    console.log(resp);

    // Set session into local storage
    // var respJson = resp.json();
    SessionHelper.setUserSession(resp);
    SessionHelper.setUserOtherInfo(resp);
    SessionHelper.setAuthToken(accessToken);
    SessionHelper.setIsLogin(true);
  }

  /**
   * Logout from server and clean local storage
   */
  async logout(): Promise<any> {
    // let authUrl: string = Config.AuthenticationBaseURL + "/tenantusers/logout";
    //  await this._httpHelper.post(authUrl, null).toPromise();
    SessionHelper.clearSession();
  }
}

