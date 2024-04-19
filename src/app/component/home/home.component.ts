import { Component } from '@angular/core';
import { Gun } from '../../models/classic';
import { CommonModule } from '@angular/common';
import { GunService } from '../../models/gun.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  displayCount = 4

  randomGuns: Gun[] = [];
  
  constructor(private gunService: GunService) {
  // lay du lieu tu gun tu gunService
    this.gunService.getSanPham().subscribe(data => {
      this.randomGuns = this.shuffle(data as Gun[]).slice(0, this.displayCount);
    });

  }

  // Hàm xáo trộn mảng
  shuffle(array: Gun[]): Gun[] {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
