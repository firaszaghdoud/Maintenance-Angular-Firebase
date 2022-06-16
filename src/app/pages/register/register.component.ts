import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  constructor(private sa:AuthService,private fs:AngularFirestore,private route:Router) { }

  ngOnInit(): void {
  }


register(f){
  let data=f.value
  this.sa.signup(data.email,data.password).then((user)=> {
    this.fs.collection("users").doc(user.user.uid).set({
     UID:user.user.uid,
      Nom:data.nom,
      Prenom:data.prenom,
      Username:data.username,
      Email:data.email,
      Password:data.password,
      agent:data.agent



    }).then(()=>{
      this.route.navigate(['/suppCompte'])
    })
  })
}
}
