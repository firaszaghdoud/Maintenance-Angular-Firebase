import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";


@Component({
  selector: "app-rapport",
  templateUrl: "rapport.component.html",
  styleUrls: ['./rapport.component.css']

})
export class RapportComponent implements OnInit {
  dataArray
  constructor(private fs:AngularFirestore,private route:Router) {}

  ngOnInit() {
    this.fs
      .collection("bonTrav")
      .snapshotChanges()
      .subscribe((data) => {
        this.dataArray = data.map((element) => {
          return {
            id: element.payload.doc.id,
            appareilID: element.payload.doc.data()["appareilID"],
            libelle: element.payload.doc.data()["libelle"],
            ref: element.payload.doc.data()["ref"],
            observation: element.payload.doc.data()["observation"],
            description: element.payload.doc.data()["description"],
            date_mise_service: element.payload.doc.data()["date_mise_service"],
            dateArret: element.payload.doc.data()["dateArret"],
            demandeID: element.payload.doc.data()["damandeID"],
            coutTotale: element.payload.doc.data()["coutTotale"],
            coutDetaille: element.payload.doc.data()["coutDetaille"]
          };
        });
      });

  }
consult(id){
  localStorage.setItem("bonTravID",id);
  this.route.navigate(["/cons_bonTrav"]);
}
  demande(id){
    localStorage.setItem("demandeID",id);
    this.route.navigate(["/demande"]);
  }
}
