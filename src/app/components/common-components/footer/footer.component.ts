import { Component, OnInit } from '@angular/core';
import { AccessHelper } from "app/helpers/access.helper";
import { EDEntityType, EmployeeOperation, LocationOperation, DepartmentOperation, TeamOperation } from '../../../misc/ed.enum';
import { PeopleComponentSharedService } from "app/services/shared/people/peoplecomponent-shared-service";
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'cat-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  // Based on this property UI element of 'add employee' will become visible.
  protected addEmployee: boolean;
  // Based on this property UI element of 'add team' will become visible.
  protected addTeam: boolean;
  // Based on this property UI element of 'add department' will become visible.
  protected addDepartment: boolean;
  // Based on this property UI element of 'add location' will become visible.
  protected addLocation: boolean;
  
  constructor(private peopleShareService: PeopleComponentSharedService) {
     
    }

  ngOnInit() {
      // Gets 'Add Employee' permission for login user.
    this.addEmployee = true; //AccessHelper.getPermissionBitByEntityAndOp(EDEntityType.Employee, EmployeeOperation.AddEmployee);
    // Gets 'Add Team' permission for login user.
    this.addTeam = true; //AccessHelper.getPermissionBitByEntityAndOp(EDEntityType.Team, TeamOperation.AddTeam);
    // Gets 'Add Department' permission for login user.
    this.addDepartment = true; //AccessHelper.getPermissionBitByEntityAndOp(EDEntityType.Department, DepartmentOperation.AddDepartment);
    // Gets 'Add Location' permission for login user.
    this.addLocation = true; //AccessHelper.getPermissionBitByEntityAndOp(EDEntityType.Location, LocationOperation.AddLocation);
  }
   addNewEmployee(){
    this.peopleShareService.reloadAddEmployeePage("");
    $('body').addClass('add-employee-right-sidebar--visible');
  }
  addNewDepartment(){
    this.peopleShareService.reloadAddDepartmentPage("");
    $('body').addClass('add-department-right-sidebar--visible');
  }
  addNewLocation(){
    this.peopleShareService.reloadAddLocationPage("");
    $('body').addClass('add-location-right-sidebar--visible');
  }
  addNewTeam(){
    this.peopleShareService.reloadAddTeamPage("");
    $('body').addClass('add-team-right-sidebar--visible');
  }
  addNewFavorite(){
    this.peopleShareService.reloadAddFavoritePage("");
    $('body').addClass('add-favorite-member-right-sidebar--visible');
  }
}
