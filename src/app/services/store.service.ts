import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

import { map, Observable, Subject } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class StoreService {
  availableExercices: any[];
  availableExercicesChanged = new Subject<any[]>();

  constructor(private fs:AngularFirestore) {}
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  dateDifference(date2, date1) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate(),
      date1.getHours(),
      date1.getMinutes(),
      date1.getSeconds()
    );
    const utc2 = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate(),
      date2.getHours(),
      date2.getMinutes(),
      date2.getSeconds()
    );

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }



  getDifferenceInHours(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000* 60 * 60);
  }
  getDifferenceInHours3(date1, date2,temp) {
    const diffInMs = Math.abs(date2 - date1);
    return (diffInMs-temp) / (1000* 60 * 60);
  }
 dateString(date){
  const dateS= date.getDate() + '/' + ((date.getMonth() + 1)) + '/' + date.getFullYear()+ ' ' + date.getHours() + ':' + date.getMinutes()+ ':' + date.getSeconds();
return dateS
}

fetchAvailableExercices() {
  this.fs.collection('appareils')
  .snapshotChanges()
  .pipe(map( docArray => {
    return docArray.map( doc => {
      console.log(doc);
      return(
      {
        id: doc.payload.doc.id,
        ref: doc.payload.doc.data()["ref"],
        libelle: doc.payload.doc.data()["libelle"],
        etat: doc.payload.doc.data()["etat"],
        tempArret: doc.payload.doc.data()["tempArret"],
        date_mise_premier_service: new Date(doc.payload.doc.data()["date_mise_premier_service"].seconds*1000),
        heuretrav: doc.payload.doc.data()["heuretrav"],
        dateAlert:new Date(doc.payload.doc.data()["dateAlert"].seconds*1000),
        sdateAlert:this.dateString (new Date(doc.payload.doc.data()["dateAlert"].seconds*1000))


       }

    );
    });
  }))
  .subscribe(exercices => {
    this.availableExercices = exercices;
    this.availableExercicesChanged.next([...this.availableExercices]);
  });
}
}
