//===============================================================================
// © 2018 eWorkplace Apps.  All rights reserved.
// Original Author: Saurabh
// Original Date: xxxx
//===============================================================================
import { Observable } from 'rxjs/Observable';
import { Config } from '../config/config';
import { AuthConstants } from "app/misc/constants";
import { ErrorHandlingService } from "app/exception/error-handling.service";
import { EDEntityType } from "app/misc/ed.enum";

/**
 * This class provide helper methods to get login user access permission bits.
 */
export class AccessHelper {
    // This is global access vector that contains permission bits in against entities i.e. Employee, Team, Department, Location.
    private static globalAccessVector: { [index: string]: boolean[] } = null;

    // This flag set to true if login user is Admin.
    private static admin: boolean = false;

    /**
     * Initializes dependent service instances and member variables.
     * @param {ErrorHandlingService} An instance of {ErrorHandlingService} service to handle exceptions and its logging.
     * 
     * @memberof AccessHelper
     */
    constructor(private errorHandler: ErrorHandlingService) {
    }

    /**
     * This is readonly property returns true if current login user is admin otherwise return false.
     */
    public static get Admin(): boolean {
        return this.admin;
    }

    /**
     * Initialzes glocal access vector permission set of login userfor Employee, Team, Department and location entities.
     * @param data Access vector API response data in form of JSON object.
     */
    public static initializeGlobalAccessVector(data: any): void {
        // Sets entity access vector sets from received JSON response.
        this.globalAccessVector = data.AccessVectors;

        // Sets flag for login user. This is true if login user is admin. 
        this.admin = data.IsAdmin;
    }

    /**
     * This method evalutes permisison bit for requested entity type and corresponding action/index bit. 
     * @param {(EDEntityType | null)} Entity type value to specific entity permission. If it's  
     * @param {(number | null)} Entity operation enum value to find specific operation permission bit.
     * @returns {boolean} returns true if login user has permission for requested operation on requested entity.
     * 
     * @memberof AccessHelper
     */
    public static getPermissionBitByEntityAndOp(entityType: EDEntityType | null, entityOp: number | null): boolean {
        // Check if access vector initialized and also requested entity type and operation type should be null.

        console.log(this.globalAccessVector);
        console.log(entityType);
        console.log(entityOp);
        if (this.globalAccessVector != null && entityType != null && entityOp != null) {
            // return access permission by entity type and operation type enum.
            return this.globalAccessVector[(EDEntityType[entityType]).toString()][entityOp];
        }
        else {
            // in-case of invalid permission set or entity type or operation type is null return false.
            return false;
        }
    }


}