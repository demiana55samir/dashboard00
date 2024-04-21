import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { firstValueFrom, from, Observable } from 'rxjs';


interface User{
  uid: string;
  email: string;
}


@Injectable({
  providedIn: 'root'
})


export class AuthServiceService {
  userData: any;
  user$ :Observable<User | any>
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
     
    this.user$= this.afAuth.authState
    console.log(this.afAuth.authState);
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        console.log( this.userData);
        localStorage.setItem('user', JSON.stringify(this.userData));
        router.navigateByUrl('/home')
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  } 

  ngOninit():void {
    console.log(this.afAuth.authState);

  }

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);

        // this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignIn(email: string, password: string): Observable<void> {
    const promis = this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // this.SetUserData(result.user);

        console.log(arguments);
        this.afAuth.authState.subscribe((user) => {
          console.log(user);
          if (user) {
            this.router.navigateByUrl('/home');
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
    return from(promis);
  }

 async isAdmin(uid:string): Promise<boolean>{
   const adminDoc =  await firstValueFrom(this.afs.collection('admins').doc(uid).get())
    return adminDoc.exists
  }


  // login() {
  //   this.afAuth
  //     .signInWithPopup(new auth.GoogleAuthProvider())
  //     .then(() => {
  //       this.afAuth.authState.subscribe((user) => {
  //         console.log(user);
  //       });

  //       this.router.navigateByUrl('/home');
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // }



  // SetUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `users/${user.uid}`
  //   );
  //   const userData: Iuser = {
  //     firstName: user.firstName,
  //     lastName:user.lastName,
  //     uId: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified,
  //   };
  //   return userRef.set(userData, {
  //     merge: true,
  //   });
  // }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
}

