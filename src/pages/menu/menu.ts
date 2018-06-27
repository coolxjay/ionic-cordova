import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { DishdetailPage } from '../dishdetail/dishdetail';
import { FavoriteProvider } from '../../providers/favorite/favorite';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {

	dishes: Dish[];
	errMess: string;
	favorite: boolean = false;

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private dishService: DishProvider,
		@Inject('BaseURL') private BaseURL,
		private favoriteService: FavoriteProvider,
		private toastCtrl: ToastController
	) {
		
  }

	ngOnInit() {
		this.dishService.getDishes()
		.subscribe(
			dishes => this.dishes = dishes,
			errmess => this.errMess = <any>errmess
		);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
	
	dishSelected(event, dish) {
		this.navCtrl.push(
			DishdetailPage,
			{
				dish: dish
			}
		);
	}

	addToFavorites(dish: Dish) {
		if( !this.favorite) {
			console.log('Adding to Favorites :', dish.id);
			this.favorite = this.favoriteService.addFavorite(dish.id);
			if( this.favorite ) {
				this.toastCtrl.create({
					message: 'Dish ' + dish.id + ' added as favorite successfully',
					duration: 3000
				}).present();
			}
		}
	}

}
