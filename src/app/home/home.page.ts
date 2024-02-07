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

  obstacle_height: number = 0;
  obstacle_width: number = 52;
  obstacle_position: number = this.container_width;
  obstacle_gap: number = 200;

  obstacle_interval!: NodeJS.Timeout;


  constructor(
    private platform: Platform
  ) { }

  ngOnInit(): void {
    this.setContainerSize();
    this.bird_interval = setInterval(this.setGravity.bind(this), 25);
    this.obstacle_interval = setInterval(this.moveObstacle.bind(this), 25);
  }

  /* ========== Comenzar juego ========== */
  startGame() {
    this.gameStarted = true;
    this.gameOver = true;
    this.score = 0;
  }

  /* ========== Finalizar juego ========== */
  setGameOver() {
    this.gameStarted = false;
    this.gameOver = true;
    this.bird_position = 300;
  }

  /* ========== Verificar colisión choque del personaje con obstaculo ========== */
  checkCollision() {
    let top_obstacle_collision = this.bird_position >= 0 && this.bird_position < this.obstacle_height;

    let bottom_obstacle_collision = this.bird_position >= this.container_height - (this.container_height - this.obstacle_gap - this.obstacle_height) - this.bird_height;

    let floor_collision = (this.bird_position + 40) >= this.container_height;
    if (floor_collision) this.setGameOver()

    if (this.obstacle_position >= this.obstacle_width
      && this.obstacle_position <= this.obstacle_width + 80
      && (top_obstacle_collision || bottom_obstacle_collision)) {
      this.setGameOver()
    }
  }

  /* ========== Salto personaje ========== */
  jump() {
    if (this.gameStarted) {
      if (this.bird_position < this.bird_height) this.bird_position = 0;
      else this.bird_position -= 60;

    }
  }

  /* ========== Mover el obstaculo ========== */
  moveObstacle() {
    let speed: number = 6;

    if (this.container_width < 400) speed = 4;

    if (this.gameStarted && this.obstacle_position >= -this.obstacle_width) {
      this.obstacle_position -= speed;
    }
    else {
      this.resetObstaclePosition();
      if (this.gameStarted) this.score++;
    }

    this.checkCollision();
  }

  /* ========== Reiniciar la posición del obstaculo ========== */
  resetObstaclePosition() {
    this.obstacle_position = this.container_width;
    this.obstacle_height = Math.floor(Math.random() * (this.container_height - this.obstacle_gap))
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

  /* ========== Silenciar o escuchar música del juego ========== */
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
