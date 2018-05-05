//===============================================================================
// © 2018 xxxx.  All rights reserved.
// Original Author: Saurabh
// Original Date: xxxx
//==============================================================================

import { Injectable } from '@angular/core';
import { HttpHelper } from '../../helpers/http.helper';
import { Headers, Request, Response, RequestMethod, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { AuthConstants } from "app/misc/constants";
import { environment } from "environments/environment";
import { InvitedEmployeeViewModel } from "app/models/configurations/invited-employee-view-model";
import { TenantViewModel } from "app/models/configurations/tenant-view-model";

@Injectable()
export class ConfigurationService { 

    constructor(private _httpHelper: HttpHelper) {
    }

  getNewsLetterPreference(){
        let headers: Headers = new Headers();
        headers.append(AuthConstants.EwpAccessTokenKey, SessionHelper.getAuthToken());
        let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headers });
        return this._httpHelper.get(Config.EDBaseUrl + 'preferences/tenant/all', reqOption)
   }
  getInviteList(){
        let headers: Headers = new Headers();
        headers.append(AuthConstants.EwpAccessTokenKey, SessionHelper.getAuthToken());
        let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headers });
        return this._httpHelper.get(Config.EDBaseUrl + 'invitedemployees', reqOption)
   }
  deleteAccount(deleteRequest: DeleteTenantRequest){
        let headers: Headers = new Headers();
        headers.append(AuthConstants.EwpAccessTokenKey, SessionHelper.getAuthToken());
        let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headers });
        return this._httpHelper.put(Config.EDBaseUrl + 'employees/deletetenant',deleteRequest, reqOption)
   }  
   updateProfile(tenantModel: TenantViewModel){
        let headers: Headers = new Headers();
        headers.append(AuthConstants.EwpAccessTokenKey, SessionHelper.getAuthToken());
        let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headers });
        return this._httpHelper.put(Config.EDBaseUrl + 'employees/updatetenant',tenantModel, reqOption)
   }       
}