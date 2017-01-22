import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string;
  password: string;

  serverUrl: string;
  params: string;

  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController) {
    this.serverUrl = 'http://localhost:8100/';
    this.params = '';
  }

  login(){
    var paramUrl = '?id='+this.username+'&password='+this.password;
    console.log("login post: "+ this.serverUrl+"login"+paramUrl);
    this.http.post(this.serverUrl+"login"+paramUrl, this.params)
      .map(response => response.json())
      .subscribe(response => {
        // console.log("http respons: "+ response.result);

        if(response.result === 'ok'){
          this.navCtrl.push(ChatPage, {
            // username: username
          })

        }else {
          //error Alert
          console.log(response);
          this.showLoginAlert();
        }
      })
  }

  showLoginAlert(){
    let alert = this.alertCtrl.create({
      title: 'Login Fail',
      subTitle: 'Try again of Join',
      buttons: ['OK']
    });
    alert.present();
  }

  join(){
    var paramUrl = '?id='+this.username+'&password='+this.password;
    console.log("join post: "+ this.serverUrl+"join"+paramUrl);
    this.http.post(this.serverUrl+"join"+paramUrl, this.params)
      .map(response => response.json())
      .subscribe(response => {
        if(response.result === 'join'){
          console.log("Success")
          this.showJoinAlert();
          this.navCtrl.push(ChatPage, {
            // username: username
          })
        }else{
          // console.log(response);
          this.showLoginAlert();
        }
      })
  }

  showJoinAlert(){
    let alert = this.alertCtrl.create({
      title: 'Congratulations!',
      subTitle: 'Welcome to Simple Chat',
      buttons: ['OK']
    });
    alert.present();
  }
}

















