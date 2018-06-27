import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;
	reservation: FormGroup;

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
    private favoriteService: FavoriteProvider,
    @Inject('BaseURL') private BaseURL,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController
	) {
  }

  ngOnInit() {
    this.favoriteService.getFavorites()
    .subscribe(
			favorites => { 
				this.favorites = favorites;
				console.log("this.favorites :", this.favorites);
			},
      errmess => this.errMess = errmess
		);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  deleteFavorite(item: ItemSliding, id: number) {
    console.log('delete', id);

    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete Dish '+ id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Deleting . . .'
            });
            let toast = this.toastCtrl.create({
              message: 'Dish ' + id + ' deleted successfully', 
              duration: 3000});
            loading.present();
            this.favoriteService.deleteFavorite(id)
              .subscribe(favorites => {this.favorites = favorites; loading.dismiss(); toast.present(); } ,
                errmess =>{ this.errMess = errmess; loading.dismiss(); });
          }
        }
      ]
    });
		
    alert.present();
  }

}
