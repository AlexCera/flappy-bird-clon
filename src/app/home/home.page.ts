import { Component, OnInit } from '@angular/core';;
import { IonicModule, Platform } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ComponentsModule],
})
export class HomePage implements OnInit {

  container_height !: number; // alto del contenedor
  container_width !: number; //ancho del contenedor

  gameStarted: boolean = false; // ¿juego iniciado?
  gameOver: boolean = false; // ¿perdio?

  score: number = 0; // puntuación final

  musicActive: boolean = false;
  song = new Audio('/assets/music/ionic-bird-track.MP3');

  constructor(
    private platform: Platform
  ) { }

  ngOnInit(): void {
    this.setContainerSize();
  }

  /* ========== Tamaño del contenedor del juego ========== */
  setContainerSize() {
    this.container_height = this.platform.height();
    this.container_width = this.platform.width() < 576 ? this.platform.width() : 576;
  }


  playMusic() {
    this.musicActive = !this.musicActive;

    if (this.musicActive) {
      this.song.play();
      this.song.loop;
    }
    else {
      this.song.pause();
    }
  }
}
