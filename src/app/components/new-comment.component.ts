import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CheckAuthService} from '../services/checkAuth.service.ts';
import {CommentService} from '../services/comment.service';
import {InfoService} from '../services/info.service';
import {Comment} from './comment.component';

@Component({
	selector: 'new-comment',
	templateUrl: 'app/templates/new-comment.html'
})

export class NewCommentComponent implements OnInit {
	@Output() pushNewComment = new EventEmitter();
	private post:string;
	private newPost:Comment;

	constructor(private commentService: CommentService,
				private checkAuthService: CheckAuthService,
				private infoService: InfoService) {	}

	ngOnInit() {
		this.newPost = new Comment();
	}

	private addComment(post) {
			this.newPost.user_at = this.checkAuthService.user_at;	
			this.newPost.status = 0 ;
			this.newPost.post = post ;
			this.newPost.count_child = 0;
		this.commentService.addSubComment(this.newPost).subscribe(
			res => {
				this.infoService.sendInfoMsg("comment added successfully.", "success");
			},
			error => console.log(error)
		);		 
		this.pushNewComment.emit(this.newPost.status);
	}
}