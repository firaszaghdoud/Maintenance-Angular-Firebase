import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-cons-bon-trav',
  templateUrl: './cons-bon-trav.component.html',
  styleUrls: ['./cons-bon-trav.component.css']
})
export class ConsBonTravComponent implements OnInit {
  dataBon={
    ref:'',
    libelle:'',
    description:'',
    bonID:'',
    demandeID:'',
    dateArret:'',
    date_mise_service:'',
    appareilID:'',
    observation:'',
    coutTotale: 0,
    coutDetaille:'',

  }
  constructor(private fs:AngularFirestore, private ss:StoreService, private route:Router) { }

  ngOnInit(): void {
    this.fs
    .collection("bonTrav")
    .ref.doc(localStorage.getItem("bonTravID")).get().then((data)=>{
      this.dataBon.ref=data.data()["ref"],
      this.dataBon.libelle=data.data()["libelle"],
      this.dataBon.description=data.data()["description"],

      this.dataBon.bonID=data.data()["bonID"],
      this.dataBon.demandeID=data.data()["damandeID"],

      this.dataBon.dateArret=this.ss.dateString( new Date (data.data()["dateArret"].seconds *1000)),
      this.dataBon.date_mise_service=this.ss.dateString (new Date(data.data()["date_mise_service"].seconds *1000)),

      this.dataBon.appareilID=data.data()["appareilID"],
      this.dataBon.observation=data.data()["observation"],
      this.dataBon.coutTotale=data.data()["coutTotale"],
      this.dataBon.coutDetaille=data.data()["coutDetaille"]
    })

  }
  demande(id){
    localStorage.setItem("demandeID",id);
    this.route.navigate(["/demande"]);
  }

fermer(){
  localStorage.removeItem("bonTravID");
  this.route.navigate(["/rapport"]);
}
}
