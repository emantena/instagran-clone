import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';

    ngOnInit() {
        const config = {
            apiKey: 'AIzaSyC1z5qcDctk1jJqPNRUSz6A0VO1SQTZss8',
            authDomain: 'instagran-clone-a775c.firebaseapp.com',
            databaseURL: 'https://instagran-clone-a775c.firebaseio.com',
            projectId: 'instagran-clone-a775c',
            storageBucket: 'instagran-clone-a775c.appspot.com',
            messagingSenderId: '355136377384'
        };

        firebase.initializeApp(config);
    }
}
