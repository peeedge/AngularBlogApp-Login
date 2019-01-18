import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent {
 
  public user : User;
  public loggedIn : boolean;
 
  constructor(private loginService: LoginService, private router: Router) {
      this.user = new User();
  }
 
  validateLogin() {
    if(this.user.username && this.user.password) {
        this.loginService.validateLogin(this.user).subscribe(result => {
        console.log('result is ', result);
        this.loggedIn = result['status'] === 'success';
        if(result['status'] === 'success') {
          //this.router.navigate(['/home']);
        } else {
          alert('Wrong username password');
        }
         
      }, error => {
        console.log('error is ', error);
      });
    } else {
        alert('enter user name and password');
    }
  }
 
}