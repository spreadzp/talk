import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()

export class CommentService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor (private http: Http) {}

     getPosts(status) {
        return this.http.get('/forum/posts/'+status).map(res => res.json());
    } 
     getChildComment(id) {
        return this.http.get('/forum/child/'+id).map(res => res.json() );
    }
     /*getComments() {
        return this.http.get('/comments' ).map(res => res.json());
    } */

    /*getIdNewSubComment(post) {
        return this.http.get('/comments/'+post).map(res => res.json());
    }*/

   /* getSubComments() {       
        return this.http.get('/subcomments').map(res => res.json());
    }

    addComment(comment) {
        return this.http.post("/comment", JSON.stringify(comment), this.options);
    }*/

    editComment(comment) {
        return this.http.put("/forum/edit/"+comment._id, JSON.stringify(comment), this.options);
    }

    /*updateParentComment(id) {
        return this.http.put("/update-comment/"+id,{},  this.options);
    }*/

    addCildComment(id) {
        return this.http.put("/forum/increment-child/"+id,{}, this.options);
    }
    removeCildComment(id) {
        return this.http.put("/forum/decrement-child/"+id,{}, this.options);
    }
    addSubComment(comment) {
        return this.http.post("/forum/addcomment/", JSON.stringify(comment), this.options).map(res => res.json());
    }

    deleteComment(comment) {
        return this.http.delete("/forum/delete-comment/"+comment._id, this.options);
    }

}
