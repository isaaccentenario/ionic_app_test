import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	selector: 'page-list',
	templateUrl: 'list.html'
})

export class ListPage {
	selectedItem: any;
	icons: string[];
	items: Array<{title: string, note: string, icon: string}>;
	posts: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
		// If we navigated to this page, we will have an item available as a nav param
		this.selectedItem = navParams.get('item');

		// Let's populate this page with some filler content for funzies
		this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
		'american-football', 'boat', 'bluetooth', 'build'];

		this.items = [];
		this.http.get('https://www.reddit.com/r/gifs/top/.json?limit=10&sort=hot')
		.map( res => res.json() )
		.subscribe( data => {
			this.posts = data.data.children;

			for( let i of this.posts ) {
				this.items.push( i.data );
			}

			console.log(this.items);
		}, err => {
			console.log( err );
		})

	}

	itemTapped(event, item) {
		// That's right, we're pushing to ourselves!
		this.navCtrl.push(ListPage, {
			item: item
		});
	}
}
