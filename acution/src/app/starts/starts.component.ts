import {Component, OnChanges,Input, OnInit,EventEmitter, SimpleChanges, Output} from '@angular/core';




@Component({
  selector: 'app-starts',
  templateUrl: './starts.component.html',
  styleUrls: ['./starts.component.css']
})
export class StartsComponent implements OnInit ,OnChanges{


  @Input()
  rating:number = 0;

  stars: boolean[];

  @Input()
  readonly:boolean=true;

  constructor() { }

  @Output()
  ratingChange:EventEmitter<number>=new EventEmitter();
  ngOnInit() {

  }

  clickStar(index:number){
    if(!this.readonly){
      this.rating=index+1;
      this.ratingChange.emit(this.rating);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.stars=[]; //need init
    for(let i=1;i<=5;i++){
      this.stars.push(i > this.rating);
    }
  }

}
