import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'app/user/profile.component.html',
  styles:[`
    em { float:right; color:#E05C65; padding-left:10px;}
    .error input { background-color :#E3C3C5; }
    .error :: -webkit-input-placeholder { color: #999;}
    .error :: -moz-placeholder { color: #999;}
    .error : -moz-placeholder { color: #999;}
    .error :ms-input-placeholder { color: #999;}
  `
  ]
})
export class ProfileComponent implements OnInit{
  profileForm:FormGroup
  //since firstName and last name are both of type form control we would like to pull them up of the ngOnInit so we do this
    private firstName: FormControl
    private lastName: FormControl
    constructor(private authService: AuthService, private router:Router){
      
    }
    ngOnInit () {
      // first value in the form control is the value you would like pre populated
      // in the field => that will come from the authService so inject it
      
      // One of the benefits of using reactive forms is that we can define our code
      // in the component where it is unit testable.
      // Validators are just passed in as the second parameters of the form FormControl
      // so we can just use Validators.required as the second parameter

      this.firstName = new FormControl(this.authService.currentUser.firstName, Validators.required)
      this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required)

      this.profileForm = new FormGroup({
        firstName:this.firstName,
        lastName: this.lastName
      })
    }
    cancel(){
      this.router.navigate(['/events'])
    }

    // lets add the logic that the form is saved only if it is validated
    saveProfile(formValues){
      if (this.profileForm.valid){
        this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
        this.router.navigate(['events'])
      }
    }
    //logic to be added into the function
    // {'error':profileForm.controls.lastName.invalid && profileForm.controls.lastName.touched }
    validateFirstName(){
      return this.firstName.valid || this.firstName.untouched
    }

    validateLastName(){
      return this.lastName.valid || this.lastName.untouched
    }
}
