import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

	dish: Dish;
	errMess: string;
	avgstars: string;
	numcomments: number;
	favorite: boolean;

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		@Inject('BaseURL') private BaseURL,
		private favoriteService: FavoriteProvider,
		private toastCtrl: ToastController,
		private asCtrl: ActionSheetController,
		private modalCtrl: ModalController
	) {
		this.dish = navParams.get('dish');
		this.numcomments = this.dish.comments.length;
		let total = 0;
		this.dish.comments.forEach(comment => total += comment.rating );
		this.avgstars = (total/this.numcomments).toFixed(2);
		this.favorite = favoriteService.isFavorite(this.dish.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

	addToFavorites() {
		this.favorite = this.favoriteService.addFavorite(this.dish.id);
		if( this.favorite ) {
			this.toastCtrl.create({
				message: 'Dish ' + this.dish.id + ' added as favorite successfully',
				position: 'middle',
				duration: 3000
			}).present();
		}
	}
	
	openActionSheet() {
		const actionSheet = this.asCtrl.create({
			title: 'Action Sheet',
			buttons: 
			[
				{
					text: 'Add to Favorites',
					role: 'destructive',
					handler: () => {
						this.favoriteService.addFavorite(this.dish.id);
					}
				},
				{
					text: 'Add Comment',
					handler: () => {
						let modal = this.modalCtrl.create(CommentPage);
						modal.present();
					}
				},
				{
					text: 'Cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		actionSheet.present();
	}
	

}
