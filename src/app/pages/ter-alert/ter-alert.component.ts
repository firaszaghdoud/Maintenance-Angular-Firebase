import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-ter-alert',
  templateUrl: './ter-alert.component.html',
  styleUrls: ['./ter-alert.component.css']
})
export class TerAlertComponent implements OnInit {
  form : FormGroup;
  dataAlert={
    ref:'',
    libelle:'',
    dateAlert:new Date(),
    sdateAlert:''
  }

  constructor(private fs: AngularFirestore, private ss: StoreService, fb:FormBuilder, private route:Router) {
    this.form = fb.group({
      presentDate: [new Date()]
   });
  }

  ngOnInit(): void {
    this.fs
    .collection("appareils")
    .ref.doc(localStorage.getItem("appareilID")).get().then((data) => {
      this.dataAlert.ref = data.data()["ref"],
        this.dataAlert.libelle = data.data()["libelle"],
        this.dataAlert.sdateAlert = this.ss.dateString(new Date(data.data()["dateAlert"].seconds*1000)),
        this.dataAlert.dateAlert = new Date(data.data()["dateAlert"].seconds*1000)


    })
  }

  Terminer(f){
let data=f.value
this.fs.collection("Alert").ref.doc(localStorage.getItem("appareilID")).set({
  ref:this.dataAlert.ref,
  appareilID:localStorage.getItem("appareilID"),
  libelle:this.dataAlert.libelle,
  enceint_entretien:this.dataAlert.dateAlert,
  nouveau_entretien:new Date(this.form.value.presentDate),
  description:data.description,
  coutTotale:parseInt(data.coutTotale,10),
  coutDetaille:data.coutDetaille,

})

this.fs.collection("appareils").ref.doc(localStorage.getItem("appareilID")).update({
  dateAlert:new Date(this.form.value.presentDate)
}).then(()=>{
  localStorage.removeItem("appareilID");
  this.route.navigate(["/alert"]);
})
  }

  retour(){
    localStorage.removeItem("appareilID");
    this.route.navigate(["/alert"]);
  }
}
