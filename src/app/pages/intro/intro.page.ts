import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { StorageService } from 'src/app/providers/storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private router: Router, private store: StorageService) { }

  ngOnInit() {
  }

  nextSlide() {
    this.slides.slideNext();
  }

  async finishTutorial() {
    await this.store.setValue('shownIntro', true);
    this.router.navigateByUrl('/tabs/tab1');
  }

}
