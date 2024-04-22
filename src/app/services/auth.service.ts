import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { firstValueFrom, from, Observable } from 'rxjs';
import { IUsers } from '../models/users';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  userData: any;

  userObj: IUsers = {
    displayName: '',
    email: '',
    emailVerified: false,
    phoneNumber: '',
    userID: '',
    showButton: false,
    isAdmin: false,
  };
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    // this.afAuth.authState.subscribe((user) => {
    //   this.userData = user;
    //   if (user) {
    //     console.log(this.userData);
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     router.navigateByUrl('/home');
    //     JSON.parse(localStorage.getItem('user')!);
    //   }
    // });
    // console.log(this.userData);
  }

  ngOninit(): void {}

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

  async SignIn(email: string, password: string): Promise<void> {
    const promis = this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // this.SetUserData(result.user);

        console.log(arguments);
        this.afAuth.authState.subscribe(async (user) => {
          console.log(user);
          const userAD = await this.isAdmin(user?.uid || '');
          if (userAD) {
            localStorage.setItem('user', JSON.stringify(user));

            this.router.navigateByUrl('/home');
            JSON.parse(localStorage.getItem('user')!);

          } else{
            alert("you are not one of the Admins")
          }
        });
      })
      .catch((error) => {
        alert(error);
      });
  }

  async isAdmin(userId: string): Promise<boolean> {
    const adminDoc = await firstValueFrom(
      this.afs.collection('admins').doc(userId).get()
    );
    return adminDoc.exists;
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
