import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-cons-panne',
  templateUrl: './cons-panne.component.html',
  styleUrls: ['./cons-panne.component.css']

})
export class ConsPanneComponent implements OnInit {
dataPanne={
  ref:'',
  libelle:'',
  description:'',
  NumDossier:'',
  dateArret:'',
  appareilID:''
}
  constructor(private fs:AngularFirestore,private route:Router, private ss:StoreService) { }

  ngOnInit(): void {
    this.fs
    .collection("panne")
    .ref.doc(localStorage.getItem("panneID")).get().then((data)=>{
      this.dataPanne.ref=data.data()["ref"],
      this.dataPanne.libelle=data.data()["libelle"],
      this.dataPanne.description=data.data()["description"],
      this.dataPanne.NumDossier=data.data()["NumDossier"],
      this.dataPanne.dateArret=this.ss.dateString( new Date (data.data()["dateArret"].seconds *1000)),
      this.dataPanne.appareilID=data.data()["appareilID"]
    })

  }
fermer(){
  localStorage.removeItem("panneID");
  this.route.navigate(["/notifications"]);
}
}
