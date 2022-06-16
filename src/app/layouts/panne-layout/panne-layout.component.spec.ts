import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PanneLayoutComponent } from "./panne-layout.component";

describe("PanneLayoutComponent", () => {
  let component: PanneLayoutComponent;
  let fixture: ComponentFixture<PanneLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PanneLayoutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanneLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
