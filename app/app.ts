import {enableProdMode, Component, ViewChild} from '@angular/core';
import {Platform, Events, MenuController, Nav, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {MainPage} from './pages/main/main';
import {IntroPage} from './pages/intro/intro';


declare var window: any;
declare var facebookConnectPlugin: any;

@Component({
    templateUrl: 'build/app.html',
    providers: []
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  user: any;
  rootPage: any;
  pages: Array<{ id: number, title: string, icon: string, component: any }>;
  service;

  constructor(
    private platform: Platform,
    private menu: MenuController, public events: Events) {
      
      this.initializeApp();     
  }
      
  getData() {
      var app = this; 
      this.user = localStorage.getItem('activeuser') ? JSON.parse(localStorage.getItem('activeuser')) : null;
      if (!this.user) {          
        // User not logged int - Go to login page
          this.rootPage = IntroPage;
      } else {
          var userPages = [             
              { id: 1, title: 'Log Out', icon: 'power', component: IntroPage }
          ];

          this.rootPage = MainPage;
          this.pages = userPages;
      }
  }

 
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
        this.getData();
    });
  }

  openPage(page) {
    // Delete user's data from localstorage
    window.localStorage.removeItem('activeuser');
    window.location.reload();
  }   
}


enableProdMode();
ionicBootstrap(MyApp);
