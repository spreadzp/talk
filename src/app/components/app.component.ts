import {Component, OnInit} from '@angular/core'; 
import {AuthService} from '../services/auth.service.ts';
import {CheckAuthService} from '../services/checkAuth.service.ts'; 

@Component({
	selector: 'app',
	templateUrl: 'app/templates/app.component.html'
})

export class AppComponent {
  private isAuth = false;
  private params: any;
  constructor(private auth: AuthService, private checkAuthService: CheckAuthService ) {}
   
  ngOnInit(){ 
 	this.params = this.parseQueryString(location.hash);
		if (this.params["id_token"] == null){
			this.checkAuthService.isAuth = false;
			this.isAuth = false;
			this.auth.login();
		}
		else if (this.params["access_token"] != null){
			this.checkAuthService.user_at = this.params["access_token"];
			this.checkAuthService.isAuth = true;
			this.isAuth = this.checkAuthService.isAuth;
		}
	}

  	private logout(){
  		this.auth.logout();
  		this.params["access_token"] = null;
  		this.isAuth = !this.checkAuthService.isAuth;
  		this.isAuth = !this.isAuth;
  	}  

  	private parseQueryString = function(url) {
		var params = {}, queryString = url.substring(1),
		regex = /([^&=]+)=([^&]*)/g, m;
		while (m = regex.exec(queryString)) {
			params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
		}
		return params;
	}
}
