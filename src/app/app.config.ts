import { ApplicationConfig , importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { firebaseConfig } from './Firebase/firebase';
import { firebaseProviders } from './firebase.config';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    firebaseProviders,
    provideHttpClient(
      withFetch()
    ),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      AngularFirestoreModule
    ]), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"iti-final-project0","appId":"1:590751786816:web:cc6dbbc1feb8e65dda7ca5","storageBucket":"iti-final-project0.appspot.com","apiKey":"AIzaSyAThtL3FG5oSY1_-DQq6cvod0T463-Nwlc","authDomain":"iti-final-project0.firebaseapp.com","messagingSenderId":"590751786816","measurementId":"G-5N6JRTD2XG"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase()))
  ]
};
