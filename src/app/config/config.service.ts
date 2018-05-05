//===============================================================================
// © 2018 xxxx Apps.  All rights reserved.
// Original Author: Saurabh
// Original Date: xxxx
//==============================================================================

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Config } from "./config";
import { HttpHelper } from 'app/helpers/http.helper';
import { environment } from 'environments/environment';
import { Http, Headers, Request, Response, RequestMethod, RequestOptionsArgs, XHRBackend, ConnectionBackend, BrowserXhr, ResponseOptions, XSRFStrategy, BaseResponseOptions, CookieXSRFStrategy, RequestOptions, BaseRequestOptions } from '@angular/http';

/**
 * This class provide methods to get routing urls from server and update in config file.
 */
@Injectable()
export class ConfigService {

    /**
     * Constructor
     * @param _httpHelper: Inject http helper  
     */
    constructor(private _httpHelper: HttpHelper) {
    }

    /**
     * This is Sync Method
     *  Method to Init route urls
     */
    public async  load(): Promise<void> {
        await this.initRoutingUrls();
        console.log("Load ED Base Url:" + Config.EDBaseUrl);
        console.log("Load Authentication Base Url:" + Config.AuthenticationBaseURL);
    }

    /**
     *  This is Sync Method
     *  Method to  server API urls and set into conif file
     */
    private async getRoutingUrls(): Promise<any> {
        let url: string = environment.RootRoutingUrl;
        var request = { 'DeploymentName': environment.DeploymentName, 'DeploymentVersion': environment.DeploymentVersion, 'ServiceName': 'All' };
        let headers: Headers = new Headers();
        let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
        return await this._httpHelper.put(url, request, reqOption).toPromise();
    }

    /**
     * Method ot get route ruls from server  and set in config file
     */
    private async initRoutingUrls(): Promise<void> {
        await this.getRoutingUrls()
            .then(res => {
                let urls: Array<[string, string]> = res;
                var i: any;
                for (i in urls) {
                    switch (urls[i]["Key"]) {
                        // ED Base Url
                        case "ED":
                            Config.EDBaseUrl = urls[i]["Value"];
                            break;
                        // Authentication Base Url
                        case "Authentication":
                            Config.AuthenticationBaseURL = urls[i]["Value"];
                            break;
                        // Utility Base Url
                        case "Utils":
                            Config.UtilityBaseURL = urls[i]["Value"];
                            break;
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });

    }
}