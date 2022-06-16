import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  messageError
  password
  email
  dataArray
  constructor(private fs:AngularFirestore, private sa: AuthService,private route:Router) {}

  ngOnInit(): void {

  }


  login(f) {
    let data = f.value;
    this.fs.collection("users",ref=>ref.where("Username","==",data.username)).snapshotChanges()
    .subscribe((data) => {
      this.dataArray = data.map((element) => {
        if(f.value.password==element.payload.doc.data()["Password"]){
        this.email=element.payload.doc.data()["Email"];
        this.password=element.payload.doc.data()["Password"];
        }
        else{this.messageError="Incorrect nom d'utilisateur ou mot de passe"}
      });



      console.log(this.dataArray.Email)
    this.sa
      .signin(this.email, this.password)
      .then((user) => {
        localStorage.setItem("userConnect",user.user.uid)
        this.route.navigate(['/dashboard'])

      })
      .catch(() => {
        this.messageError="Incorrect nom d'utilisateur ou mot de passe"
      });

    });
  }
}
