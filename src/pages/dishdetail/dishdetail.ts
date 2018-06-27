import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';

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
		private toastCtrl: ToastController
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
}
