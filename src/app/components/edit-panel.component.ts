import {Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {CommentService} from '../services/comment.service';

@Component({
	selector: 'edit-panel',
	templateUrl: 'app/templates/edit-panel.html'
})

export class EditPanelComponent implements OnInit {
	private isAvalibleComment = false;
	private comments = [];
	@Input()comment;
	@Output()resultEditing = new EventEmitter();

	constructor(private commentService: CommentService) {	}

	ngOnInit() {}

	private editComment(comment) {
		this.commentService.editComment(comment).subscribe(
			res => {
				this.resultEditing.emit(false);				
			},
			error => console.log(error)
		);		
	}

	private deleteComment(comment) {
		if(window.confirm("Are you sure you want to permanently delete this item?")) {
			this.commentService.deleteComment(comment).subscribe(
				res => {
					var pos = this.comments.map(comment => { return comment._id }).indexOf(comment._id);
					this.comments.splice(pos, 1);
					this.removeChildComment(comment.parent_id)
				},
				error => console.log(error)
			);
			this.resultEditing.emit(false);
		}
	}

	private removeChildComment(id) {
	 
		this.commentService.removeCildComment(id).subscribe(
			res => {},
			error => console.log(error)
		);
		this.resultEditing.emit(false);		 
	}	
}