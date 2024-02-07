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

  musicActive: boolean = false; // ¿música activa?
  song = new Audio('/assets/music/ionic-bird-track.MP3'); // ruta de la canción del juego

  bird_height: number = 38;
  bird_width: number = 43;
  bird_position: number = 300;

  bird_interval!: NodeJS.Timeout;

  constructor(
    private platform: Platform
  ) { }

  ngOnInit(): void {
    this.setContainerSize();
    this.bird_interval = setInterval(this.setGravity.bind(this), 25);
  }


  /* ========== Comenzar juego ========== */
  startGame() {
    this.gameStarted = true;
    this.gameOver = true;
    this.score = 0;
  }

  /* ========== Tamaño del contenedor del juego ========== */
  setContainerSize() {
    this.container_height = this.platform.height();
    this.container_width = this.platform.width() < 576 ? this.platform.width() : 576;
  }

  /* ========== Agregar gravedad al juego ========== */
  setGravity() {
    let gravity = 5.0;
    if (this.gameStarted) this.bird_position += gravity;
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
