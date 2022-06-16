import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-panne',
  templateUrl: './panne.component.html',

})
export class PanneComponent implements OnInit {

successmessage
NDossier
dataPanne={
  ref:'',
  libelle:'',
  etat:''

}
form : FormGroup;


  constructor(private fs:AngularFirestore,private route:Router,fb:FormBuilder) {
    this.form = fb.group({
      presentDate: [new Date()]
   });
   }

  ngOnInit(): void {
    this.NDossier=localStorage.getItem('NumDossier')
    this.fs
    .collection("appareils")
    .ref.doc(localStorage.getItem("panneID")).get().then((data)=>{
      this.dataPanne.ref=data.data()["ref"],
      this.dataPanne.libelle=data.data()["libelle"],
      this.dataPanne.etat=data.data()["etat"]
    })



  }

    addpanne(f) {
      let data = f.value;
      //Creation demande de service
      this.fs
      .collection("demande_serv")
      .doc(this.NDossier).set({
        ref: this.dataPanne.ref,
        libelle: this.dataPanne.libelle,
        description: data.description,
        NumDossier: this.NDossier,
        dateArret:new Date(this.form.value.presentDate),
        appareilID:localStorage.getItem("panneID")

      })
      //creation panne
      this.fs
        .collection("panne")
        .doc(this.NDossier).set({
          ref: this.dataPanne.ref,
          libelle: this.dataPanne.libelle,
          description: data.description,
          NumDossier: this.NDossier,
          dateArret:new Date(this.form.value.presentDate),
          appareilID:localStorage.getItem("panneID")

        })
        .then(() => {
          //Changement etat appareil
          this.fs.collection("appareils").doc(localStorage.getItem("panneID")).update({
            etat:'arret'
          })
          localStorage.removeItem("NumDossier");
          localStorage.removeItem("panneID")
          this.successmessage = "Demande De Travail";
          this.route.navigate(["/appareils"]);



        });
    }

}
