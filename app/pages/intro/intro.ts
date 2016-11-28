import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides, AlertController, Platform} from 'ionic-angular';
import {MainPage} from '../main/main';

declare var window: any;
declare var facebookConnectPlugin: any;

@Component({
    templateUrl: 'build/pages/intro/intro.html',
    providers: []
})
export class IntroPage {
    @ViewChild('slider') slider: Slides;

    constructor(public platform: Platform, public alertCtrl: AlertController, private nav: NavController, navParams: NavParams) {            
        var app = this;

        //timeout requried to wait for facebook plugin file to load
        window.setTimeout(function () {
            // Not using "ionic run"
            if (!window.cordova || !facebookConnectPlugin) {
                console.log('Run this app using "ionic run broswer/android/ios" to activate FB login');
            }
            else {
                // BROWSER
                if (window.cordova.platformId == "browser") {
                    facebookConnectPlugin.browserInit('1763382523986538', 'v2.4', function () {
                        app.logout();
                    });
                }
                // NATIVE
                else {
                    app.logout();
                }
            }
        }, 1000);

    }

  
    logout() {     
      // Delete user's data from localstorage
      window.localStorage.removeItem('activeuser');    
  }

  facebookLogin() {    
    if (typeof facebookConnectPlugin !== 'undefined') {
        facebookConnectPlugin.login(['public_profile'], this.fbSuccess.bind(this), this.fbError);
    } 
  }   

  fbError(response) {
      facebookConnectPlugin.logout(function () {
          console.log('loged out');
          window.location.reload();
        }, function (fail) {
            console.log(fail);
        });
  }

  fbSuccess(response) {
    if (!response.authResponse) {
        console.log('fbLoginError', "Cannot find the authResponse");
        return;
    }

    var obj = this;
    var auth = response.authResponse;     

    // Get FB data
    var fields = 'id,name,gender,first_name,middle_name,last_name';
    facebookConnectPlugin.api('/me?fields=' + fields + '&access_token=' + auth.accessToken, ['public_profile'], function (response) {
        console.log(response);

        var user = {
            authResponse: auth,
            id: response.id,
            name: response.name,
            first_name: response.first_name,
            middle_name: response.middle_name,
            last_name: response.last_name,
            gender: response.gender           
        };

        // Store user's data in localStorage
        window.localStorage.setItem('activeuser', JSON.stringify(user));
        window.location.reload();
    },
    function (response) {
        console.log(response);
    });  
  }  

  
 
}
