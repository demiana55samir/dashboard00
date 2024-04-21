import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guardAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  const localdata = localStorage.getItem('user')
  if(localdata != null){
    return true
    console.log("from guard")
  } else{
    alert("you should login first")
    router.navigateByUrl('/login')
    return false;
  }
};
