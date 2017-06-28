import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { FirebaseProvider } from '../providers/firebase-provider';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public firebase: FirebaseProvider ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.firebase.auth().onAuthStateChanged(user=>{
      //Se o usuário não logou, mande para a pagina de login, caso contrario mande para pagina de notas.
      this.rootPage = (!user)? 'Login': HomePage;
    })
  }
}
