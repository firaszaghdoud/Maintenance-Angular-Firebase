import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-cons-appareil',
  templateUrl: './cons-appareil.component.html',
  styleUrls: ['./cons-appareil.component.css']
})
export class ConsAppareilComponent implements OnInit {
dataAppareil={
  ref:'',
  libelle:'',
  heuretrav:'',
  tempArret:'',
  date_mise_premier_service:'',
  etat:'',
  file:''
}
  constructor(private fs:AngularFirestore, private ss:StoreService, private route:Router) { }

  ngOnInit(): void {
    this.fs
      .collection("appareils")
      .ref.doc(localStorage.getItem("appareilID")).get().then((data) => {
        this.dataAppareil.ref = data.data()["ref"],
          this.dataAppareil.libelle = data.data()["libelle"],
          this.dataAppareil.heuretrav = data.data()["heuretrav"],
          this.dataAppareil.tempArret = data.data()["tempArret"],
          this.dataAppareil.date_mise_premier_service =this.ss.dateString(new Date(data.data()["date_mise_premier_service"].seconds*1000)),
          this.dataAppareil.etat= data.data()["etat"],
          this.dataAppareil.file=data.data()["file"]

      })
  }
  fermer(){
    localStorage.removeItem("appareilID");
    this.route.navigate(["/appareils"]);
  }

}
