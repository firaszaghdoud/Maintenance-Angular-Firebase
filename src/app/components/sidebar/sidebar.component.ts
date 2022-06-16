import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Accueil",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/appareils",
    title: "Les Appareils",
    icon: "icon-settings-gear-63",
    class: ""
  },
  {
    path: "/rapport",
    title: "Bon Travail",
    icon: "icon-notes",
    class: ""
  },
  {
    path: "/notifications",
    title: "Notifications",
    icon: "icon-bell-55",
    class: ""
  },

  {
    path: "/profile",
    title: "Profile",
    icon: "icon-single-02",
    class: ""
  },

  {
    path: "/alert",
    title: "Alert",
    icon: "icon-alert-circle-exc",
    class: ""
  },
];
export const ROUTES_S_D: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Accueil",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/appareils",
    title: "Les Appareils",
    icon: "icon-settings-gear-63",
    class: ""
  },
  {
    path: "/profile",
    title: "Profile",
    icon: "icon-single-02",
    class: ""
  },
];
export const ROUTES_BM: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Accueil",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/appareils",
    title: "Les Appareils",
    icon: "icon-settings-gear-63",
    class: ""
  },
  {
    path: "/rapport",
    title: "Bon Travail",
    icon: "icon-notes",
    class: ""
  },
  {
    path: "/notifications",
    title: "Notifications",
    icon: "icon-bell-55",
    class: ""
  },

  {
    path: "/profile",
    title: "Profile",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/alert",
    title: "Alert",
    icon: "icon-alert-circle-exc",
    class: ""
  }


];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  agent=""
  constructor(private fs:AngularFirestore) {}

  ngOnInit() {

    this.fs.collection("users").ref.doc(localStorage.getItem("userConnect")).get().then((data)=>{
      this.agent=data.data()["agent"]
      if(data.data()["agent"]=="Administrateur"){
        this.menuItems = ROUTES.filter(menuItem => menuItem);
      }else if (data.data()["agent"]=="Service_demandeur") {
        this.menuItems = ROUTES_S_D.filter(menuItem => menuItem);
      }else if(data.data()["agent"]=="BM"){
        this.menuItems = ROUTES_BM.filter(menuItem => menuItem);

      }
    })

  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
