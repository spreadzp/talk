import {Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {CommentService} from '../services/comment.service';
import {Comment} from './comment.component';
import {CheckAuthService} from '../services/checkAuth.service.ts';

@Component({
	selector: 'item-comment',		
	templateUrl: 'app/templates/item-comment.html'
})

export class ItemCommentComponent implements OnInit {
	private isAuth : boolean;
 	private isAvalibleComment = false;
 	private isShowChild = false;
 	private isEdit = false;
 	private idParent:string;
 	private children =[];
 	private message:string = 'Show';
 	@Output()refreshForum = new EventEmitter();
	@Input() comment;
	@Input() comments=[];
	private newSubComment;
	private isUserRegisted = true;

	constructor( private commentService: CommentService,
	private checkAuthService:CheckAuthService ) {	}

	ngOnInit() {
		this.isAuth = this.checkAuthService.isAuth;
	}
	private ShowChildComment(id){
		this.idParent = id;
		this.getChildComment(id);
		this.message = this.isShowChild ? 'Show': 'Hide';
	}
	private getComments(status) {
		this.commentService.getPosts(status).subscribe(
			data => this.comments = data,
			error => console.log(error) 
		);
	}

	private resultEditing(event){
		this.isEdit = event;
		this.refreshForum.emit(0);
		 
	}
	private endSubComment(event){
		this.isAvalibleComment = false;
		this.refreshForum.emit(0);
		
		
	}

	getChildComment(id) {
		this.commentService.getChildComment(id).subscribe(
			data => this.children = data,
			error => console.log(error) 		 
		);
	}

		refreshData(event){
			this.getComments(0);
		}

	addSubComment(newCom){
	this.newSubComment.post = newCom;
	this.newSubComment.time = new Date();
	this.newSubComment.user_at =this.checkAuthService.user_at;
			 this.commentService.addSubComment(this.newSubComment).subscribe(
				res => {},
				error => console.log(error)
			); 
			 this.refreshForum.emit(0);
	}
}

