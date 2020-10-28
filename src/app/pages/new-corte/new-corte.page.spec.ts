import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewCortePage } from './new-corte.page';

describe('NewCortePage', () => {
  let component: NewCortePage;
  let fixture: ComponentFixture<NewCortePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCortePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCortePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
