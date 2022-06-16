import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Console } from 'console';
import { element } from 'protractor';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-bon-trav',
  templateUrl: './bon-trav.component.html',
  styleUrls: ['./bon-trav.component.css']

})
export class BonTravComponent implements OnInit {
  dataPanne = {
    ref: '',
    libelle: '',
    description: '',
    NumDossier: '',
    sdateArret: '',
    appareilID: '',
    dateArret:new Date()
  }
  NumBon;

  enceintTarret
  tempArret
  form : FormGroup;


  constructor(private fs: AngularFirestore, private ss: StoreService, fb:FormBuilder, private route:Router) {
    this.form = fb.group({
      presentDate: [new Date()]
   });
  }

  ngOnInit(): void {
    this.NumBon=localStorage.getItem("bonID")
    this.fs
      .collection("panne")
      .ref.doc(localStorage.getItem("panneID")).get().then((data) => {
        this.dataPanne.ref = data.data()["ref"],
          this.dataPanne.libelle = data.data()["libelle"],
          this.dataPanne.description = data.data()["description"],
          this.dataPanne.NumDossier = data.data()["NumDossier"],
          this.dataPanne.sdateArret =this.ss.dateString(new Date(data.data()["dateArret"].seconds*1000)),
          this.dataPanne.appareilID = data.data()["appareilID"],
          this.dataPanne.dateArret= new Date(data.data()["dateArret"].seconds*1000),
          //get enciente valeur de temptrav
          this.fs.collection("appareils").ref.doc(data.data()["appareilID"]).get().then((data)=>{
            this.enceintTarret=data.data()["tempArret"]
          })
      })



  }


Terminer(f){
let data=f.value
  this.fs.collection("bonTrav").ref.doc(localStorage.getItem("bonID")).set({
    dateArret:this.dataPanne.dateArret,
    ref:this.dataPanne.ref,
    libelle:this.dataPanne.libelle,
    appareilID:this.dataPanne.appareilID,
    damandeID:this.dataPanne.NumDossier,
    description:this.dataPanne.description,
    date_mise_service:new Date(this.form.value.presentDate),
    bonID:localStorage.getItem("bonID"),
    observation:data.observation,
    coutTotale:parseInt(data.coutTotale,10),
    coutDetaille:data.coutDetaille,

  }).then(()=>{
    //calcul temp arret
    this.tempArret=this.ss.getDifferenceInHours(new Date(this.dataPanne.dateArret),new Date(this.form.value.presentDate))
//update nouveau temp arret
    this.fs.collection("appareils").doc(localStorage.getItem("appareilID")).update({
      tempArret:Math.abs( parseFloat( this.tempArret) +parseFloat( this.enceintTarret))
    })

    this.fs.collection("panne").doc(localStorage.getItem("panneID")).delete();
    //remetter appareil en cours du travail
    this.fs.collection("appareils").doc(this.dataPanne.appareilID).update({
      etat:"en cours"
    })

    localStorage.removeItem("bonID");
    localStorage.removeItem("panneID");
    localStorage.removeItem("appareilID");
    this.route.navigate(["/notifications"]);



  })

}
}
