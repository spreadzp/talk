import {Injectable} from '@angular/core';

@Injectable()

export class InfoService {

    public infoMsg = { body: "", type: "info"};

	constructor(){}

    sendInfoMsg(body, type, time = 3000) {
		this.infoMsg.body = body;
		this.infoMsg.type = type;
		window.setTimeout(() => this.infoMsg.body = "", time);
	}   
}