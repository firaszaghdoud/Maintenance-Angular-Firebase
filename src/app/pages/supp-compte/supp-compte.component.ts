import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';

@Component({
  selector: 'app-supp-compte',
  templateUrl: './supp-compte.component.html',
  styleUrls: ['./supp-compte.component.css']
})
export class SuppCompteComponent implements OnInit {
dataProfile
  type_agent: any;
  constructor(private fs:AngularFirestore ,private fa:AngularFireAuth) { }

  ngOnInit(): void {
    this.fs.collection("users").ref.doc(localStorage.getItem("userConnect")).get().then((data)=>{
      this.type_agent=data.data()["agent"]
    })


    this.fs
    .collection("users")
    .snapshotChanges()
    .subscribe((data) => {
      this.dataProfile = data.map((element) => {
        return {
          id: element.payload.doc.id,
          email: element.payload.doc.data()["Email"],
          nom: element.payload.doc.data()["Nom"],
          prenom: element.payload.doc.data()["Prenom"],
          username: element.payload.doc.data()["Username"],
          agent: element.payload.doc.data()["agent"]

        };
      });
    });
  }

  async delete(id){
    this.fs.collection("users").doc(id).delete();
     (await this.fa.currentUser).delete
  }


}
