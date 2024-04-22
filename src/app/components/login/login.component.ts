import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthServiceService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl(false)
  })

  fb= inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router)

  constructor(
    public authService : AuthServiceService,
  ){}

   ngOnInit() {
   this.form =  this.fb.group({
    
      email:['',Validators.required,Validators.email],
      password:['',Validators.required, ],
      remember:['false',Validators.requiredTrue]
    })
    this.reset()

  }
  submitted = false;

  get f(): { [key: string]: AbstractControl } {
   const validateCheck =  this.form.controls;
    return validateCheck
  }
  login() {
    this.authService
    console.log("login with google");
  }

 async onSubmit(): Promise<void> {
    const rowForm = this.form.getRawValue();
     this.submitted=true
    
    if(this.form.invalid){
      return
    }
    
   await this.authService.SignIn(rowForm.email,rowForm.password)

    // const currentuser = await (this.authService.userData )
    // console.log(currentuser);
    // if(currentuser){
    //    const isadmin= await this.authService.isAdmin(currentuser)
    //     if(isadmin){
    //       this.router.navigateByUrl('/home')
    //     }
    //     else{
    //       alert("you are not one of admins")
    //     }
    // }
    this.reset()
    
  }

  reset(){
    this.submitted= false;
    this.form.reset()
  }

}