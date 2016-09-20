import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {tokenNotExpired } from 'angular2-jwt';
import {AuthHttp } from 'angular2-jwt';
import {myConfig } from '../config/auth.config';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  // Configure Auth0
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain);
  lockLink = new Auth0Lock(myConfig.clientID, myConfig.domain, {
    auth: {params: {state: "linking"}},
    allowedConnections: ['Username-Password-Authentication', 'facebook', 'google-oauth2'],
    languageDictionary: { // allows to override dictionary entries
      title: "Link with:"
    }
  });
  userProfile: any;

  constructor(private authHttp: AuthHttp, private router: Router) {
    // Set userProfile attribute if already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      // Every lock instance listen to the same event, so we have to check if
      // it's not the linking login here.
      if(authResult.state != "linking"){
        localStorage.setItem('id_token', authResult.idToken);
        this.fetchProfile(authResult.idToken);
        console.log('id_token='+ authResult.idToken);
      }
    });

    // Add callback for lockLink `authenticated` event
    this.lockLink.on("authenticated", (authResult) => {
      // Every lock instance listen to the same event, so we have to check if
      // it's the linking login here.
      if(authResult.state == "linking"){
        // If it's the linking login, then do the link through the API.
        this.doLinkAccounts(authResult.idToken);
      }
    });
  };

  loggedIn() {
  return tokenNotExpired();
}
 logout() {
   // To log out, we just need to remove
   // the user's profile and token
   console.log('logout() ! ' );
   localStorage.removeItem('profile');
   localStorage.removeItem('id_token');
 }

   public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };
 
  public linkAccount() {
    this.lockLink.show();
  }

  public doLinkAccounts(accountToLinkJWT) {
    var headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var data: any = JSON.stringify({
      link_with: accountToLinkJWT
    });

    this.authHttp
      .post('https://' + myConfig.domain+ '/api/v2/users/' + this.userProfile.user_id + '/identities', data, {headers: headers})
      .map(response => response.json())
      .subscribe(
        response => {
          console.log("accounts linked");
          this.fetchProfile(localStorage.getItem('id_token'));
          this.router.navigate(['/profile']);
        },
        error => alert(error.json().message)
      );
  }
public find() {
    var headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

     

    this.authHttp.get('http://localhost:2016' +'/comments/0',  {headers: headers})
      .map(response => response.json())
      .subscribe(
        response => {
          console.log("accounts linked");
          this.fetchProfile(localStorage.getItem('id_token'));
          this.router.navigate(['/']);
        },
        error => alert(error.json().message)
      );
  }
  public unLinkAccount(identity) {
    var headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    this.authHttp
    .delete('https://' + myConfig.domain + '/api/v2/users/' + this.userProfile.user_id + '/identities/' + identity.provider + "/" + identity.user_id, {headers: headers})
      .map(response => response.json())
      .subscribe(
        response => {
          console.log("unlinked account");
          this.fetchProfile(localStorage.getItem('id_token'));
          this.router.navigate(['/profile']);
        },
        error => alert(error.json().message)
      );
  }

  public linkedAccounts() {
   return this.userProfile.identities.filter(identity => {
      return this.userProfile.user_id != identity.provider + '|' + identity.user_id
    })
  }

  public fetchProfile(token) {
    this.userProfile = null;
    // Fetch profile information
    this.lock.getProfile(token, (error, profile) => {
      if (error) {
        // Handle error
        alert(error);
        return;
      }

      profile.user_metadata = profile.user_metadata || {};
      localStorage.setItem('profile', JSON.stringify(profile));
      this.userProfile = profile;
    });
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

 /* public logout() {
    // Remove token and profile from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = null;
  };*/
}