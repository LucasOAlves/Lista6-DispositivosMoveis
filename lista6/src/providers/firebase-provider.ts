import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseProvider {

	constructor() {
		let config = {
			apiKey: "AIzaSyBnX8EK868aPljHXLmx94MaExzdCKii9-E",
	 		authDomain: "lucasoliveiraalves-lista6-7-bd.firebaseapp.com",
	 		databaseURL: "https://lucasoliveiraalves-lista6-7-bd.firebaseio.com",
	 		projectId: "lucasoliveiraalves-lista6-7-bd",
	 		storageBucket: "lucasoliveiraalves-lista6-7-bd.appspot.com",
	 		messagingSenderId: "596345306093"
		};
		firebase.initializeApp(config);
	}

    database() {
        return firebase.database();
    }

    auth() {
        return firebase.auth();
    }

}
