//===============================================================================
// © 2018 xxx Apps.  All rights reserved.
// Original Author: Saurabh
// Original Date: xxxxx
//==============================================================================

import { Injectable } from '@angular/core';
import { Logger, Options } from "angular2-logger/core";
import { HttpHelper } from 'app/helpers/http.helper';
import { environment } from 'environments/environment';
import { Config } from '../config/config';
import { ErrorLog } from 'app/logging/error-log';
import { WebApiDebugLog } from 'app/logging/webapi-debug-log';
import { DebugLog } from 'app/logging/debug-log';
import { SessionHelper } from "app/helpers/session.helper";
import { UserSession, UserOtherInfo } from '../models/login/index';

/**
 * This Class provide configurable log 
 */
@Injectable()
export class LoggingService extends Logger {

/**
 * Constructor to inject http helper
 */
    constructor(public _httpHelper: HttpHelper) {
        super();
        this.level = environment.LoggerLevel;
    }

    /**
     * Method to log error detail on server
     * @param errorMsg: Error message 
     * @param methodName: Method name 
     * @param stackTrace: Stack trace 
     */
    public logErrorOnServer(errorLogModel: ErrorLog) {
        try {
            this._httpHelper.post(Config.UtilityBaseURL + 'dblogger/log/error', errorLogModel, null)
                .subscribe(
                res => { this.info("Log error on server") },
                error => { this.logErrorOnConsole(error) }
                );
        }
        catch (e) {
            this.logErrorOnConsole(e);
        }
    }

    /**
     * Method to save debug log on server
     * @param detail 
     * @param title 
     */
    public logDebugOnServer(detail: string, title: string) {
        try {
            let debugLog = new DebugLog();
            debugLog.Detail = detail;
            debugLog.Title = title
            this._httpHelper.post(Config.UtilityBaseURL + 'dblogger/log/error', debugLog, null)
                .subscribe(
                res => { this.info("Log error on server") },
                error => { this.logErrorOnConsole(error) }
                );
        }
        catch (e) {
            this.logErrorOnConsole(e);
        }
    }

    /**
     * Method to show message on console
     * @param error 
     */
    public logErrorOnConsole(error: Error) {
        this.error(error);
    }
}