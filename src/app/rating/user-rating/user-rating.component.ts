import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtmService } from 'src/app/atm.service';
import { Rating } from 'src/app/rating';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.css']
})
export class UserRatingComponent implements OnInit {

 rating: Rating = new Rating();
  constructor(
    private ratmService: AtmService,
    private router: Router
    ) { }

  ngOnInit(): void{
    
 }

 saveRating(){
  this.ratmService.giveRating(this.rating).subscribe( data =>{
    console.log(data);
    this.goToRatingList();
  },
  error => console.log(error));
  
 }

 goToRatingList(){
     this.router.navigate(['/ratings']);
 }

  onSubmit(){
    console.log(this.rating);
    this.saveRating();
    alert('Rating added successfully!!!');
    this.router.navigate(['/atmEvents'])
  }

}
