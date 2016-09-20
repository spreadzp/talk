import {Component, OnInit} from '@angular/core';
import {InfoService} from '../services/info.service.ts'; 

@Component({
	selector: 'forum',		
	templateUrl: 'app/templates/forum.html'
})

export class ForumComponent implements OnInit {

	private infoMsg = { body: "", type: "info"};

	constructor() { 
	}

	ngOnInit() {
	}
}

