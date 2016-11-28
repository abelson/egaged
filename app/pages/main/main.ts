import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {IntroPage} from '../intro/intro';


@Component({
    templateUrl: 'build/pages/main/main.html',
    providers: []
})
export class MainPage {
  user: any;
  items: Array<{ id: number, title: string, note: string, link: any, picture: string }>;
  service;

  constructor(private nav: NavController, navParams: NavParams) {      
      

      
      this.user = localStorage.getItem('activeuser') ? JSON.parse(localStorage.getItem('activeuser')) : null;
      if (this.user) {
          this.user.picture = "https://graph.facebook.com/" + this.user.id + "/picture?type=large";
      }
      
         
  }  

}
