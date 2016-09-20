import './polyfills';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



/*import { routing,
         appRoutingProviders } from './app.routes';*/

import {AppComponent} from './components/app.component';
import {AboutComponent} from './components/about.component';
import {ForumComponent} from './components/forum.component';
import {SubCommentComponent} from './components/subcomment.component';
import {CommentService} from './services/comment.service';
import {NewCommentComponent} from './components/new-comment.component';
import {BufferCommentsComponent} from './components/buffer-comments.component'; 
import {ListForumComponent} from './components/list-forum.component'; 
import {ItemCommentComponent} from './components/item-comment.component';
import {EditPanelComponent} from './components/edit-panel.component'; 
import {ChildCommentsComponent} from './components/child-comments.component';
import {AuthService} from './services/auth.service.ts';  
import {enableProdMode} from '@angular/core';
import {AUTH_PROVIDERS } from 'angular2-jwt';
import {CheckAuthService} from './services/checkAuth.service.ts';
import {InfoService} from './services/info.service';
enableProdMode();

const routing = RouterModule.forRoot([
    
    { path: 'about', component: AboutComponent },
    { path: '', component: ForumComponent }
]);

@NgModule({
    imports: [BrowserModule,
    		  routing,
    		  HttpModule,
    		  FormsModule,
    		  ReactiveFormsModule],
    declarations: [AppComponent,
    			         AboutComponent,
                   ForumComponent,
                   SubCommentComponent,
                   NewCommentComponent,
                   BufferCommentsComponent,
                   ListForumComponent,
                   ItemCommentComponent,
                   EditPanelComponent,
                   ChildCommentsComponent],
    providers: [CommentService, AuthService,AUTH_PROVIDERS,
    CheckAuthService, InfoService],
    bootstrap: [AppComponent]
})

export class AppModule {}