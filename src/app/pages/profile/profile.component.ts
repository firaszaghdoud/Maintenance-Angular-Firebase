import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { element } from "protractor";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  isUser;
  type_agent
  successupdate;
  Uid;
  dataProfile = {
    Nom: "",
    Prenom: "",
    Username: "",
    Email: "",
    Password: "",
    uid: "",
  };
  constructor(private fs: AngularFirestore, private as: AuthService, private route:Router) {
    this.as.user.subscribe((user) => {
      if (user.uid == "KiXNSEj1Gfaea5HqUf4sxzy75Tq1") {
        this.isUser = true;
      } else {
        this.isUser = false;
      }
    });

    this.as.user.subscribe((user) => {
      this.Uid = user.uid;
    });
  }

  ngOnInit(): void {
    this.fs.collection("users").ref.doc(localStorage.getItem("userConnect")).get().then((data)=>{
      this.type_agent=data.data()["agent"]
    })

    this.fs
      .collection("users")
      .ref.doc(localStorage.getItem("userConnect"))
      .get()
      .then((data) => {
        this.dataProfile.Nom = data.data()["Nom"];
        this.dataProfile.Prenom = data.data()["Prenom"];
        this.dataProfile.Username = data.data()["Username"];
        this.dataProfile.Email = data.data()["Email"];
        this.dataProfile.Password = data.data()["Password"];
        this.dataProfile.uid = localStorage.getItem("userConnect");
      });
    /*this.fs.collection("users").snapshotChanges().subscribe((data)=>{
      this.dataProfile= data.map(element=>{
        element
        if (element.payload.doc.id===this.Uid){
          return{
            Nom:element.payload.doc.data()['Nom'],
            Prenom:element.payload.doc.data()['Prenom'],
            Username:element.payload.doc.data()['Username'],
            Email:element.payload.doc.data()['Email'],
            Password:element.payload.doc.data()['Password']
          }
        }

      })
    })*/
  }

  update(f) {
    this.fs
      .collection("users")
      .doc(this.dataProfile.uid)
      .update({
        Nom: this.dataProfile.Nom,
        Prenom: this.dataProfile.Prenom,
        Username: this.dataProfile.Username,
        Email: this.dataProfile.Email,
        Password: this.dataProfile.Password,
      })
      .then(() => {
        this.successupdate = "la mise à jour de données est terminer";
        setTimeout (()=>{window.location.reload()},2000)
      });
  }
}
