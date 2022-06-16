import { Component, OnInit } from "@angular/core";
import { AngularFirestore} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import {  Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-alert",
  templateUrl: "alert.component.html",
})
export class AlertComponent implements OnInit {
  exercises: any[];
  availableExercisesSubs: Subscription;
  today=new Date();


  constructor(private fs: AngularFirestore, private ss: StoreService, private route:Router) {}
  ngOnInit(): void {
    console.log(this.today)
    this.availableExercisesSubs = this.ss.availableExercicesChanged.subscribe(ex => {
      this.exercises = ex.filter(m=>(Math.abs(this.ss.getDifferenceInHours(m.dateAlert,this.today)-m.tempArret)>=m.heuretrav))
      console.log(this.exercises)

    });
    this.ss.fetchAvailableExercices();

  }
  Terminer(id){
localStorage.setItem("appareilID",id)
this.route.navigate(["/terAlert"])
  }
}
