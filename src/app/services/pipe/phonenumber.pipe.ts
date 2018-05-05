//===============================================================================
// © 2018 xxxx.  All rights reserved.
// Original Author: Saurabh
// Original Date: xxxxx
//==============================================================================

import { Pipe, PipeTransform } from '@angular/core'
import { CommonHelper } from "app/helpers/common.helper";
import { PhoneNumberHelper } from "app/helpers/phonenumber.helper";
import { ErrorHandlingService } from "app/exception/error-handling.service";

@Pipe(
    {
        name: "PhoneNumberPipe"
    }
)
/**
 * This pipe class provide to format and normalize phone number
 */
export class PhoneNumberPipe implements PipeTransform {

    constructor(private errorHandler:ErrorHandlingService) {

    }

    /**
     * 
     * @param value: Phone Number
     * @param normalizeNo: true, if normalize number else format number 
     */
    public transform(value: string, normalizeNo: boolean): string {
        try {        
        if (CommonHelper.isEmpty(value))
            return  '';

        if (normalizeNo==true)
           return this.normalizeNumber(value)            
        else
         return this.formatedNumber(value);
        }
        catch(ex){
         this.errorHandler.handledError(ex, "PhoneNumberPipe.transform");
        }
    }
}