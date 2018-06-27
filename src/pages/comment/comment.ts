import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../../shared/comment';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

	commentForm: FormGroup;
	comment: Comment;

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public viewCtrl: ViewController,
		private formBuilder: FormBuilder
	) {
		this.commentForm = this.formBuilder.group({
			rating: 5,
			author: ['', Validators.required],
			comment: ['', Validators.required],
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationPage');
  }
	
	dismiss() {
		this.viewCtrl.dismiss();
	}
	
	onSubmit() {
		this.comment = this.commentForm.value;
		let time = new Date().getTime(); 
		this.comment.date = time;
		
		console.log(this.comment);
		this.viewCtrl.dismiss();
	}

}

