import {Component,OnInit,Input,Output,EventEmitter} from '@angular/core'; 
import {CommentService} from '../services/comment.service';
@Component({
	selector: 'child-comments',
	templateUrl: 'app/templates/child-comments.html'
})

export class ChildCommentsComponent implements OnInit {
	@Input()children;
	@Output()refreshForum = new EventEmitter();

	constructor(private commentService: CommentService) {}

	ngOnInit() {
	  	 this.refreshForum.emit();
	}		 
}
