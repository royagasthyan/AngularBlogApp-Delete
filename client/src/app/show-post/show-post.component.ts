import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShowPostService } from './show-post.service';
import { Post } from '../models/post.model';
import { CommonService, } from '../service/common.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css'],
  providers: [ ShowPostService ]
})
export class ShowPostComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;

  public posts : any [];
  public post_to_delete;

  constructor(private showPostService: ShowPostService, private commonService: CommonService) {
  	
  }

  ngOnInit(){
  	this.getAllPost();

    this.commonService.postAdded_Observable.subscribe(res => {
      this.getAllPost();
    });
  }

  setDelete(post: Post){
    this.post_to_delete = post;
  }

  unsetDelete(){
    this.post_to_delete = null;
  }

  getAllPost(){
  	this.showPostService.getAllPost().subscribe(result => {
  		console.log('result is ', result);
  		this.posts = result['data'];
  	});
  }

  editPost(post: Post){
    this.commonService.setPostToEdit(post);
  }

  deletePost(){
    this.showPostService.deletePost(this.post_to_delete._id).subscribe(res => {
      this.getAllPost();
      this.closeBtn.nativeElement.click();
    })
  }

}
