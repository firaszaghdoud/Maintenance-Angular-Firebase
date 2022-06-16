import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
dataArray={
  ref:'',
  libelle:'',
  description:'',
  NumDossier:'',
  dateArret:'',
  appareilID:''

}
  constructor(private fs:AngularFirestore, private route:Router,private ss:StoreService) { }

  ngOnInit(): void {
    this.fs
    .collection("demande_serv")
    .ref.doc(localStorage.getItem("demandeID")).get().then((data)=>{
      this.dataArray.ref=data.data()["ref"],
      this.dataArray.libelle=data.data()["libelle"],
      this.dataArray.description=data.data()["description"],
      this.dataArray.NumDossier=data.data()["NumDossier"],
      this.dataArray.dateArret=this.ss.dateString(new Date (data.data()["dateArret"].seconds*1000)),
      this.dataArray.appareilID=data.data()["appareilID"]
    })
  }

  fermer(){
    localStorage.removeItem("demandeID");
    this.route.navigate(["/rapport"]);
  }
}
