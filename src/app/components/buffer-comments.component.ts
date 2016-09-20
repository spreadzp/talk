import {Component, OnInit} from '@angular/core';
import {CommentService} from '../services/comment.service';
import {CheckAuthService} from '../services/checkAuth.service.ts';

@Component({
	selector: 'buffer-comments',
	templateUrl:'app/templates/buffer-comments.html'
})

export class BufferCommentsComponent implements OnInit {
    private isAuth : boolean;
	private comments=[];

	constructor(private commentService: CommentService,
				private checkAuthService: CheckAuthService) {}

	ngOnInit() {
		this.isAuth = this.checkAuthService.isAuth;
		this.getComments();
	}
 
	private getComments() {
		this.commentService.getPosts(0).subscribe(
			data => this.comments = data,
			error => console.log(error)
		);
	}
	private getAllComments(event){
	this.comments = event;
	}

	private pushNewComment(event){ 
	this.comments = event; 	
	}
}


