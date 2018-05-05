import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/login/authentication.service';
import { ConfigurationService } from '../../../services/configuration/configuration.service';
import { ErrorHandlingService } from "app/exception/error-handling.service";
import { InvitedEmployeeViewModel } from "app/models/configurations/invited-employee-view-model";
import { InvitedEmployeeResponseModel } from "app/models/configurations/invited-employee-res-model";
import { DeleteTenantRequest } from "app/models/configurations/delete-tenant-req";
import { SessionHelper } from "app/helpers/session.helper";
import { TenantViewModel } from "app/models/configurations/tenant-view-model";

@Component({
  selector: 'configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css'],
  providers: [ConfigurationService]
})
export class ConfigurationsComponent implements OnInit {
  inviteList: InvitedEmployeeResponseModel;
  inviteModel: InvitedEmployeeViewModel;
  public key1Value=[];
  public key2Value=[];  
  public newsLetterArray=[];
  companyName:any;
  tenantId:any;

  constructor(public router: Router, private _authenticationService: AuthenticationService, private _errorHandler: ErrorHandlingService, private _configService: ConfigurationService) { 
  SessionHelper.getUserSession().TenantId
  }

  ngOnInit() {    
    this.getInviteList();
    this.getNewsLetterPreference();
    this.companyName=JSON.parse(SessionHelper.getUserInfo()).TenantName;
    this.tenantId = SessionHelper.getUserSession().TenantId;
  }
  /*
  * Getting News Letter Prefernce
  */  
  getNewsLetterPreference(){
    try {
      this._configService.getNewsLetterPreference().subscribe(
        result => {
          console.log(result)
          result.forEach(element => {
            if(element.Key1=='WeeklyNewsletter'){
              this.key1Value.push(element)
            }else if(element.Key1=='WeeklyNewsletterItemPreference'){
              this.key2Value.push(element)
            }
          });
          this.newsLetterArray.push(this.key1Value,this.key2Value)
          console.log(this.newsLetterArray)
        }, error => {
          this._errorHandler.handleHttpError(error, "GetNewsLetterpreference");
        },
        () => {
          console.log("GetNewsLetterpreference success");
        }
      )
    } catch (ex) {
      this._errorHandler.handledError(ex, "GetNewsLetterpreference");
    } finally {

    }
  }
   /*
  * Getting Invite list
  */
  getInviteList() {
    try {
      this._configService.getInviteList().subscribe(
        result => {
          this.inviteList = result;
          console.log(this.inviteList)
        }, error => {
          this._errorHandler.handleHttpError(error, "GetManageInviteList");
        },
        () => {
          console.log("GetManageInviteList success");
        }
      )
    } catch (ex) {
      this._errorHandler.handledError(ex, "GetManageInviteList");
    } finally {

    }
  }
  /*
  * Resend Invite list
  */
  resendInvite(data) {
    try {
      let inviteModel = [{"Key":"LoginEmail","Value":data.Email},
      {"Key":"TenantId","Value":this.tenantId}];
      this._configService.resendInvite(inviteModel)
        .subscribe(
        result => {
          console.log(result);
        }, error => {
          this._errorHandler.handleHttpError(error, "ResendInviteList");
        },
        () => {
          console.log("ResendInviteList success");
        }
        )
    } catch (ex) {
      this._errorHandler.handledError(ex, "ResendInviteList");
    } 
  }
  /*
  * Cancel Invite list
  */
  cancelInvite(data) {
    try {
      let deleteModel = [{"Key":"LoginEmail","Value":data.Email},
      {"Key":"TenantId","Value":this.tenantId}];
      this._configService.cancelInvite(deleteModel)
        .subscribe(
        result => {
          console.log(result);
        }, error => {
          this._errorHandler.handleHttpError(error, "CancelInviteList");
        },
        () => {
          console.log("CancelInviteList success");
        }
        )
    } catch (ex) {
      this._errorHandler.handledError(ex, "CancelInviteList");
    } finally {

    }
  }
  /*
  * Delete Tenant Account
  */
  deleteAccount(){
    try {
      let deleteRequest = new DeleteTenantRequest();
      //deleteRequest=this.deleteAccountValue
      this._configService.deleteAccount(deleteRequest)
        .subscribe(
        result => {
          console.log(result);
        }, error => {
          this._errorHandler.handleHttpError(error, "deleteAccount");
        },
        () => {
          console.log("deleteAccount success");
        }
        )
    } catch (ex) {
      this._errorHandler.handledError(ex, "deleteAccount");
    } finally {

    }
  }
  /*
  * Update tenant profile
  */
  updateCompanyName(){
      try {
      let tenantViewModel = new TenantViewModel();
      tenantViewModel.Name = this.companyName;
      tenantViewModel.TenantId = this.tenantId;
      this._configService.updateProfile(tenantViewModel)
        .subscribe(
        result => {
          console.log(result);
        }, error => {
          this._errorHandler.handleHttpError(error, "updateAccount");
        },
        () => {
          console.log("updateAccount success");
        }
        )
    } catch (ex) {
      this._errorHandler.handledError(ex, "updateAccount");
    } 
  }
}