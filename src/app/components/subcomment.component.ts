import {Component, OnInit,Input, EventEmitter, Output} from '@angular/core';
import {Comment} from './comment.component';
import {CommentService} from '../services/comment.service';
import {CheckAuthService} from '../services/checkAuth.service.ts';
import {InfoService} from '../services/info.service';

@Component({
	selector: 'subcomment',
	templateUrl: 'app/templates/subcomment.html'
})

export class SubCommentComponent implements OnInit {
	@Input()postForComment:any; 
	@Output()endSubComment = new EventEmitter();
	private comments=[];
	private idComment: string ;
	private newSubComment: Comment ;
	constructor(private commentService: CommentService,
				private checkAuthService: CheckAuthService,
				private infoService: InfoService) {
		this.newSubComment = new Comment()}

	ngOnInit() { 
	}

	private cancelSubcomment(){ 
		this.endSubComment.emit(this.newSubComment.status);
	}

	private addSubComment(newCom){ 
		this.newSubComment.post = newCom;
		this.newSubComment.time = new Date();
		this.newSubComment.user_at = this.checkAuthService.user_at;	 
		this.newSubComment.status = this.postForComment.status+1;
		this.newSubComment.parent_id = this.postForComment._id;
		this.newSubComment.count_child = 0;
		this.commentService.addSubComment(this.newSubComment).subscribe(
			res => { 
		 		this.addChildForParent(this.postForComment._id);		 		
		 		this.infoService.sendInfoMsg("comment added successfully.", "success");
		 		this.endSubComment.emit(false);
			},
			error => console.log(error)
		);
	
	}

	private addChildForParent(id){ 
		 this.commentService.addCildComment(id).subscribe(
		res => {},
			error => console.log(error)
		); 
	}/*

	private updateParent(id){
		this.commentService.updateParentComment(id).subscribe(
		res => {},
			error => console.log(error)	
		); 
	}*/
	
}