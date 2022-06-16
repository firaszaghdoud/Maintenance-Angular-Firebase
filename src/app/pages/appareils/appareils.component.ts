import { Component, NgModule, OnInit,AfterViewInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { element, ElementFinder } from "protractor";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { StoreService } from "src/app/services/store.service";
import { FormBuilder, FormGroup } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from "@angular/fire/storage";
import { event } from "jquery";
import { url } from "inspector";


@Component({
  selector: "app-appareils",
  templateUrl: "appareils.component.html",
  styleUrls: ["./appareils.component.css"],
})
export class AppareilsComponent implements OnInit, AfterViewInit {
task:AngularFireUploadTask
ref:AngularFireStorageReference
persentage
  successmessage;
  updatemessage;
  dataArray;
  appareilID: "";
file
  dataAppareilUP = {
    ref: "",
    libelle: "",
    heuretrav: "",
    etat: "",
  };
  dossierNum
  form1 : FormGroup;
  type_user

  constructor(
    private fs: AngularFirestore,
    private fss: AngularFirestore,
    private route: Router,
    private ss:StoreService,private fb1:FormBuilder,
    private fst:AngularFireStorage
  ) {
    this.form1 = fb1.group({
      presentDate1: [new Date()]
   });
  }
  ngAfterViewInit(): void {
    }

  ngOnInit(): void {
    //type user
    this.fs.collection("users").ref.doc(localStorage.getItem("userConnect")).get().then((data)=>{
      this.type_user=data.data()["agent"]
    })
    //get appareil data
    this.fs
      .collection("appareils")
      .snapshotChanges()
      .subscribe((data) => {
        this.dataArray = data.map((element) => {
          return {
            id: element.payload.doc.id,
            ref: element.payload.doc.data()["ref"],
            libelle: element.payload.doc.data()["libelle"],
            heuretrav: element.payload.doc.data()["heuretrav"],
            etat: element.payload.doc.data()["etat"],
          };
        });
      });

    //modifier appareil
    /*if (this.appareilID!==''){
    this.fss
    .collection("appareils")
    .ref.doc(this.appareilID)
    .get()
    .then((data) => {
      console.log(data.data());
      this.dataAppareil.ref = data.data()["Ref"];
      this.dataAppareil.libelle = data.data()["Libelle"];
      this.dataAppareil.etat = data.data()["Etat"];
      this.dataAppareil.heuretrav = data.data()["Heuretrav"];

    }).catch(()=>{
      console.log('errors')
    })
  }*/
  }

  addappreil(f) {
    let data = f.value;
    this.fs
      .collection("appareils")
      .add({
        ref: data.ref,
        libelle: data.libelle,
        heuretrav: data.heuretrav,
        etat: data.etat,
        date_mise_premier_service:new Date(f.value.date),
        file:this.file,
        tempArret:0,
        dateAlert:new Date(f.value.date)


      })
      .then(() => {
        this.successmessage = "Appareil Ajouter";
        window.setTimeout('location.reload()', 1000)
      });
  }
  delete(id) {
    this.fs.collection("appareils").doc(id).delete();
  }

  getID(id) {
    this.appareilID = id;
    this.fss
      .collection("appareils")
      .ref.doc(this.appareilID)
      .get()
      .then((data) => {
        this.dataAppareilUP.ref = data.data()["ref"],
          this.dataAppareilUP.libelle = data.data()["libelle"],
          this.dataAppareilUP.etat = data.data()["etat"],
          this.dataAppareilUP.heuretrav = data.data()["heuretrav"]
      });
  }

  appareilUpdate(f2) {
    if (this.appareilID !== "") {
      this.fss
        .collection("appareils")
        .doc(this.appareilID)
        .update({
          ref: this.dataAppareilUP.ref,
          libelle: this.dataAppareilUP.libelle,
          etat: this.dataAppareilUP.etat,
          heuretrav: this.dataAppareilUP.heuretrav,
          tempArret:0
        })
        .then(() => {
          this.updatemessage = "la mise à jour de données est terminer";
          window.location.reload();

        });
    }
  }

  getPanneID(id) {
      this.dossierNum= this.ss.getRandomIntInclusive(0,100000)
      localStorage.setItem("NumDossier",this.dossierNum);
      localStorage.setItem("panneID",id);
      this.route.navigate(["/panne"]);

  }

  uploadfile(event){
    const id = Math.random().toString(36).substring(2)
   this.ref= this.fst.ref(id)
   this.task=this.ref.put(event.target.files[0])
   this.persentage=this.task.percentageChanges()
   this.task.then((data)=>{
    data.ref.getDownloadURL().then(url=>{


       this.file=url
      })

  })
  }

  consult(id){
    localStorage.setItem("appareilID",id);
    this.route.navigate(["/consApp"]);
  }
}
