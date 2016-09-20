import {Component, OnInit,Input} from '@angular/core';
import {CommentService} from '../services/comment.service';
import {CheckAuthService} from '../services/checkAuth.service.ts';

@Component({
	selector: 'list-forum',
	templateUrl: 'app/templates/list-forum.html'
})

export class ListForumComponent implements OnInit {
	private isAuth : boolean; 
	private comments=[];
	private status:number ;
	private infoMsg = { body: "", type: "info"};

	constructor(private commentService: CommentService,
				private checkAuthService: CheckAuthService) {
		this.status = 0;
		}

	ngOnInit() {
		this.getComments(this.status);
		this.isAuth = this.checkAuthService.isAuth;
	}

	private getComments(status:number) {
		 this.commentService.getPosts(status).subscribe(
			data => this.comments = data,
			error => console.log(error) 
		); 
	}

	private refreshForum(event){
		this.getComments(0);
	}

	private pushNewComment(event){ 
	this.getComments(event); 	
	}	
}