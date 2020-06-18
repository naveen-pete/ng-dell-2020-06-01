import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NewTrainingComponent } from './new-training.component';
import { TrainingService } from "../training.service";
import { UIService } from '../../shared/ui.service';
import { Exercise } from '../exercise.model';
import { availableExercises } from "../training-test-data";
import { MaterialModule } from 'src/app/material.module';


describe('NewTrainingComponent', () => {
  let fixture: ComponentFixture<NewTrainingComponent>;
  let component: NewTrainingComponent;
  let el: DebugElement;

  let trainingServiceSpy: any;
  let uiServiceSpy: any;
  let trainingService: TrainingService;
  let uiService: UIService;

  beforeEach(async(() => {
    trainingServiceSpy = jasmine.createSpyObj(
      'TrainingService',
      {
        fetchAvailableExercises: () => {
          console.log('TrainingService.fetchAvailableExercises() spy method invoked.');
        },
        startExercise: (id: string) => {
          console.log('TrainingService.startExercise() spy method invoked.');
        }
      },
      {
        availableExercisesChanged: new Subject<Exercise[]>()
      }
    );

    uiServiceSpy = jasmine.createSpyObj('UIService', null, {
      loadingStateChanged: new Subject<boolean>()
    });

    TestBed.configureTestingModule({
      declarations: [
        NewTrainingComponent
      ],
      imports: [
        FormsModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: TrainingService, useValue: trainingServiceSpy },
        { provide: UIService, useValue: uiServiceSpy }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NewTrainingComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        trainingService = TestBed.inject(TrainingService);
        uiService = TestBed.inject(UIService);
      });

  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should check if spinner component is displayed when loading flag is true', () => {
    fixture.detectChanges();

    uiService.loadingStateChanged.next(true);

    fixture.detectChanges();

    const spinner = el.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();
    expect(trainingService.fetchAvailableExercises).toHaveBeenCalled();
  });

  it('should check if drop-down list is displayed when loading flag is false', () => {
    fixture.detectChanges();

    uiService.loadingStateChanged.next(false);

    fixture.detectChanges();

    const select = el.query(By.css('mat-select'));
    const options = el.queryAll(By.css('mat-option'));
    expect(select).toBeTruthy();
    expect(options.length).toBe(0);
    expect(trainingService.fetchAvailableExercises).toHaveBeenCalled();
  });

  it('should check if drop-down list is displayed and contains available exercises', () => {
    fixture.detectChanges();

    uiService.loadingStateChanged.next(false);
    trainingService.availableExercisesChanged.next(availableExercises);

    fixture.detectChanges();

    const select = el.query(By.css('.mat-select-trigger'));
    select.triggerEventHandler('click', null);

    fixture.detectChanges();

    const options = el.queryAll(By.css('mat-option'));
    expect(options.length).toBe(2);

  });

  it('should check if the selected exercise has started', () => {
    fixture.detectChanges();

    uiService.loadingStateChanged.next(false);
    trainingService.availableExercisesChanged.next(availableExercises);

    fixture.detectChanges();

    const select = el.query(By.css('.mat-select-trigger'));
    select.triggerEventHandler('click', null);

    fixture.detectChanges();

    const options = el.queryAll(By.css('.mat-option'));
    options[1].triggerEventHandler('click', null);

    const form = el.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    fixture.detectChanges();

    expect(trainingService.startExercise).toHaveBeenCalled();
    // expect(trainingService.startExercise).toHaveBeenCalledWith('2');
  });

});
