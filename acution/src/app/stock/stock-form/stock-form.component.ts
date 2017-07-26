import { Component, OnInit } from '@angular/core';
import {Stock, StockService} from "../stock.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Validators, FormGroup, FormBuilder, FormControl, FormArray} from "_@angular_forms@4.3.1@@angular/forms";


@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formModel: FormGroup;
  stock: Stock;

  categories =["IT","互联网","金融"];
  constructor(private routerInfo:ActivatedRoute,private stockService:StockService,
   private router:Router) {

  }

  ngOnInit() {
    let stockId = this.routerInfo.snapshot.params['id'];
    //this.stock = new Stock(1, '第1只股票', 1.99, 1.5, 'desc', ['IT', '互联网']);
    this.stock=this.stockService.getStock(stockId);

    let fb=new FormBuilder();
    this.formModel=fb.group({
      name:[this.stock.name,[Validators.required,Validators.minLength(3)]],
      price:[this.stock.price,Validators.required],
      desc:[this.stock.desc],
      categories:fb.array([
        new FormControl(this.stock.cateqories.indexOf(this.categories[0]) != -1),
        new FormControl(this.stock.cateqories.indexOf(this.categories[1]) != -1),
        new FormControl(this.stock.cateqories.indexOf(this.categories[2]) != -1)
      ],this.categoriesSelectValidator)
    });

  }

  categoriesSelectValidator(control:FormArray){
    var valid=false;
    control.controls.forEach(control =>{
      if(control.value){
        valid=true;
      }
    });
    if(valid){
      return null;
    }else{
      return {categoriesLength:true};
    }
  }

  cancel(){
    this.router.navigateByUrl('/stock');
  }

  save(){
    var chineseCategories = [];
    var index=0;
    for(var i=0;i<3;i++){
      if(this.formModel.value.categories[i]){
        chineseCategories[index++]=this.categories[i];
      }
    };
    this.formModel.value.rating=this.stock.rating;
    this.formModel.value.categories= chineseCategories;
    console.log(this.formModel.value);
    this.router.navigateByUrl('/stock');
  }
}
