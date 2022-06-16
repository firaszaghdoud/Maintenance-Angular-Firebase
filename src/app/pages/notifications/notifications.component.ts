import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-notifications",
  templateUrl: "notifications.component.html"
})
export class NotificationsComponent implements OnInit {
  dataArray
NumBon
date=new Date();


  constructor(private fs:AngularFirestore, private route:Router, private ss:StoreService) {}

  ngOnInit() :void {
    //get demande du travail data
    this.fs
    .collection("panne")
      .snapshotChanges().subscribe((data)=>{
        this.dataArray=data.map(element=>{
          return{
            id:element.payload.doc.id,
            appareilID:element.payload.doc.data()['appareilID'],
            dateArret:this.ss.dateString(new Date(element.payload.doc.data()['dateArret'].seconds*1000)),
            description:element.payload.doc.data()['description'],
            libelle:element.payload.doc.data()['libelle'],
            ref:element.payload.doc.data()['ref'],

          }
        })
      })
      this.NumBon = this.ss.getRandomIntInclusive(0, 100000)
    }
    consPanne(id){
      localStorage.setItem("panneID",id);
      this.route.navigate(["/consPanne"]);

    }
    bonTrav(id,appareilID){
      localStorage.setItem("panneID",id);
      localStorage.setItem("bonID",this.NumBon);
      localStorage.setItem("appareilID",appareilID)
      this.route.navigate(["/bonTrav"]);



    }
}

