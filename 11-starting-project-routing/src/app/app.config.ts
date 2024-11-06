import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";
import { routes } from "./app.routes";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig : ApplicationConfig = {
    providers:[
        provideRouter(routes , withComponentInputBinding()  , withRouterConfig({
            paramsInheritanceStrategy:"always"
        })), provideFirebaseApp(() => initializeApp({"projectId":"ng-deployement-example-6ecfc","appId":"1:506858643835:web:944fa18e2d5955582d1dde","storageBucket":"ng-deployement-example-6ecfc.firebasestorage.app","apiKey":"AIzaSyArCfB3lAMvfISdvv4N4LJyO63QtJ2Eee0","authDomain":"ng-deployement-example-6ecfc.firebaseapp.com","messagingSenderId":"506858643835"})), provideStorage(() => getStorage()), provideClientHydration()
    ]
}