import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatOptionSelectionChange,
  MatSort,
  MatTableDataSource,
} from '@angular/material';
import { MatCheckboxChange } from '@angular/material/checkbox';
import * as _ from 'lodash';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ClimateService } from 'src/app/services/climate.service';
import { PercentageDialogComponent } from './percentage-dialog.component';
import { expandableRowAnimation } from './row-animation';

export interface Climate {
  id?: number;
  author?: string;
  bookName: string;
  date: string;
  originalDate: string;
  rangeEndDate?: string;
  dayExist?: boolean;
  monthExist?: boolean;
  pageNumber: string;
  place: string;
  publishedBy?: string;
  weatherTags?: string;
  text: string;
  yearExist?: boolean;
}

@Component({
  selector: 'app-climates',
  templateUrl: './climates.component.html',
  styleUrls: ['./climates.component.css'],
  animations: [expandableRowAnimation],
})
export class ClimatesComponent implements OnInit, OnDestroy {
  title = 'DISAR';

  public endSubscriptions$: Subject<boolean> = new Subject();

  expandedId: number;

  columnsToDisplay: string[] = [
    'index',
    'text',
    'weatherTags',
    'place',
    'date',
    'originalDate',
    'bookName',
    'year',
    'month',
    'day',
  ];

  dataSource: MatTableDataSource<Climate>;

  searchText = '';

  dataFromService: Climate[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public climates$: Observable<
    Climate[]
  > = this.climateService.getClimates().pipe(takeUntil(this.endSubscriptions$));

  yearCheck: boolean = undefined;
  monthCheck: boolean = undefined;
  dayCheck: boolean = undefined;

  public yearFilter$: Observable<Climate[]>;
  public monthFilter$: Observable<Climate[]>;
  public dayFilter$: Observable<Climate[]>;

  hicriMonthMap: Map<string, string> = new Map<string, string>();

  weatherTagsMap: Map<string, string> = new Map<string, string>();

  public fillHicriMonthMap(): void {
    this.hicriMonthMap.set('M', 'MUHARREM');
    this.hicriMonthMap.set('S', 'SAFER');
    this.hicriMonthMap.set('RA', 'RABIULEVVEL');
    this.hicriMonthMap.set('R', 'RABIULAHIR');
    this.hicriMonthMap.set('CA', 'CEMAZIYELEVVEL');
    this.hicriMonthMap.set('C', 'CEMAZIYELAHIR');
    this.hicriMonthMap.set('B', 'RECEP');
    this.hicriMonthMap.set('Ş', 'ŞABAN');
    this.hicriMonthMap.set('N', 'RAMAZAN');
    this.hicriMonthMap.set('L', 'SEVVAL');
    this.hicriMonthMap.set('ZA', 'ZILKADE');
    this.hicriMonthMap.set('Z', 'ZILHICCE');
  }

  public fillWeatherTagMap(): void {
    this.weatherTagsMap.set('rüzgar', 'wi wi-windy');
    this.weatherTagsMap.set('yağmur', 'wi wi-rain');
    this.weatherTagsMap.set('yangın', 'wi wi-fire');
    this.weatherTagsMap.set('güneş', 'wi wi-day-sunny');
    this.weatherTagsMap.set('veba', 'wi wi-alien'); //todo icon bul
    this.weatherTagsMap.set('kar', 'wi wi-snow');
    this.weatherTagsMap.set('Şiddetli rüzgar', 'wi wi-strong-wind');
    this.weatherTagsMap.set('hafif rüzgar', 'wi wi-rain-wind');
    this.weatherTagsMap.set('sis', 'wi wi-day-fog');
    this.weatherTagsMap.set('şiddetli soğuk', 'wi wi-snowflake-cold');
    this.weatherTagsMap.set('yoğun kar', 'wi wi-day-snow-thunderstorm');
    this.weatherTagsMap.set('fırtına', 'wi wi-hurricane');
    this.weatherTagsMap.set('sel', 'wi wi-flood');
  }

  /*
   MUHARREM('1', 'M'),
   SAFER('2', 'S'),
   RABIULEVVEL('3', 'RA'),
   RABIULAHIR('4', 'R'),
   CEMAZIYELEVVEL('5', 'CA'),
   CEMAZIYELAHIR('6', 'C'),
   RECEP('7', 'B'),
   SABAN('8', 'Ş'),
   RAMAZAN('9', 'N'),
   SEVVAL('10', 'L'),
   ZILKADE('11', 'ZA'),
   ZILHICCE('12', 'Z');
   */

  constructor(
    private climateService: ClimateService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._openPercentageDialog(85);

    this.climates$.subscribe((data) => {
      this.dataSource = new MatTableDataSource<Climate>(data);
      this.dataFromService = data;
      this.dataSource.sort = this.sort;

      this.yearFilter$ = of(this.dataFromService);
      this.monthFilter$ = of(this.dataFromService);
      this.dayFilter$ = of(this.dataFromService);

      this.fillHicriMonthMap();
      this.fillWeatherTagMap();
    });
  }

  setWeatherFilter(event: MatOptionSelectionChange, value: string): void {
    if (event.source.selected) {
      this.dataSource.data = this.dataFromService.filter((climate: Climate) =>
        climate.weatherTags.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  getFullHicriMonthName(originalDate: string): string {
    const shortHicriMonth: string = originalDate.split('-')[1];
    return this.hicriMonthMap.has(shortHicriMonth)
      ? this.hicriMonthMap.get(shortHicriMonth)
      : null;
  }

  getWeatherTagClass(tag: string): string {
    if (!tag) {
      return '';
    }
    const iconName = this.weatherTagsMap.get(tag);
    return iconName ? iconName : 'fa fa-window-close fa-x';
  }

  toggleExpandableId(id: number): void {
    this.expandedId = this.expandedId === id ? null : id;
  }

  dateClicked($event: MatCheckboxChange) {
    if (this.yearCheck !== undefined) {
      this.yearFilter$ = of(this.dataFromService).pipe(
        map((item) =>
          item.filter((climate) => climate.yearExist === this.yearCheck)
        )
      );
    }

    if (this.monthCheck !== undefined) {
      this.monthFilter$ = of(this.dataFromService).pipe(
        map((item) =>
          item.filter((climate) => climate.monthExist === this.monthCheck)
        )
      );
    }

    if (this.dayCheck !== undefined) {
      this.dayFilter$ = of(this.dataFromService).pipe(
        map((item) =>
          item.filter((climate) => climate.dayExist === this.dayCheck)
        )
      );
    }

    combineLatest(
      this.yearFilter$,
      this.monthFilter$,
      this.dayFilter$,
      (year, month, day) => {
        return _.intersectionWith(year, month, day, _.isEqual);
      }
    ).subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  filterOff() {
    this.dataSource.data = this.dataFromService;
    this.yearCheck = undefined;
    this.dayCheck = undefined;
    this.monthCheck = undefined;

    this.yearFilter$ = of(this.dataFromService);
    this.monthFilter$ = of(this.dataFromService);
    this.dayFilter$ = of(this.dataFromService);

    this.searchText = '';
    this.applyFilter(this.searchText);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showSameDates() {
    const valueArr = this.dataFromService.map((item) => {
      return item.date;
    });

    const duplicate = valueArr.reduce((acc, currentValue, index, array) => {
      if (
        array.indexOf(currentValue) !== index ||
        (array.indexOf(currentValue) === index &&
          array.indexOf(currentValue, array.indexOf(currentValue) + 1) !== -1)
      ) {
        acc.push(this.dataFromService[index]);
      }
      return acc;
    }, []);
    this.dataSource.data = duplicate;
  }

  ngOnDestroy(): void {
    this.endSubscriptions$.next(true);
    this.endSubscriptions$.complete();
  }

  private _openPercentageDialog(data: number): void {
    const dialogRef = this._dialog.open(PercentageDialogComponent, {
      width: '500px',
      height: '350px',
      data,
    });
  }
}

/*
author: 'Federico Gravina'
bookName: 'İstanbul’ un Anlatımı'
date: '1788-05-08'
dayExist: true
id: 1
monthExist: true
pageNumber: '26'
place: 'İstanbul'
publishedBy: 'YKY'
publishedDate: '2008'
text: '... ‘Veba hastalığının aşırı salgın halde değilse de başkentte sürdüğünü ... ‘'
yearExist: true

 */
