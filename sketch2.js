let red_right, red_right_gif, red_left, red_left_gif;
let map, minimap, hitmap;
let mission_bar, setting, mini_map;
let use, report, use_active, report_active, exit_button;
let mission1_bg, mission1_button;

var width, height;
var mapX, mapY;
var dirX, dirY;
var charDisplayX, charDisplayY;
var charMapX, charMapY;
let counter = 0, counter2 = 0, counter3 = 0;

let game = "start"; //start
let level;
let timer = 150;
let current_time;

let mission_completion = 0;
let mission_playing = false;
let angle1=45, angle2=45, angle3=45;
let mission1_complete=false, mission1_complete1=false, mission1_complete2=false, mission1_complete3=false;
let mission_1_correct, mission_1_incorrect, mission_1_bgm;

let mission2_complete = false, mission2_start = false, swipeable = false, mission2_card_accepted = false;
let mission2_card_in, mission2_card_out, mission2_card_insert
let too_fast = false, too_slow = false;

let mission3_complete = false;
let mission3_background;
let mission3_wire1 = false, mission3_wire2 = false, mission3_wire3 = false, mission3_wire4 = false;
let mission3_wire1_clicked = false, mission3_wire2_clicked = false, mission3_wire3_clicked = false, mission3_wire4_clicked = false;

let mission4_complete = false;
let mission4_background;
let mission4_X = 600, mission4_Y = 350, mission4_asteroid_destroyed = 0;
let asteroids = [];
let mission4_asteroid_1, mission4_asteroid_2;

let mission5_complete = false;
let mission5_background;
let mission5_X, mission5_Y; // 598, 349
let mission5_width, mission5_height;

let use_clicked = false;
let minimap_clicked = false;

let easy_high, medium_high, hard_high;

let oxygenDepleted = false, oxygen_deplete_time = 10000;

let current_mission_completion = 0;

let how_to_play_active = false;

function preload() {
  // load font
  font = loadFont("font/Impostograph-Regular.ttf");

  // Character
  red_right = loadImage("image/character/red/red_right.png");
  red_right_gif = loadImage("image/character/red/red_right.gif"); // 700 x 800 pixel
  red_left = loadImage("image/character/red/red_left.png");
  red_left_gif = loadImage("image/character/red/red_left.gif");

  // Map
  map = loadImage("image/map/map.png");
  minimap = loadImage("image/map/minimap.png");
  hitmap = loadImage("image/map/hitmap2.png");

  // Mission bar
  mission_bar = loadImage("image/button/mission_bar.png"); // 800 x 72 pixel
  setting = loadImage("image/button/setting.png"); // 69 x 69 pixel
  mini_map = loadImage("image/button/mini_map.png"); // 69 x 69 pixel

  //Buttons
  use = loadImage("image/button/use.png");
  report = loadImage("image/button/report.png");
  use_active = loadImage("image/button/use_active.png");
  report_active = loadImage("image/button/report_active.png");
  exit_button = loadImage("image/button/exit_button.png");

  //Mission
  mission1_bg = loadImage("image/mission/Calibrate_Distributor/Calibrate_Distributor.png");
  mission1_bg_1 = loadImage("image/mission/Calibrate_Distributor/Calibrate_Distributor_1.png");
  mission1_bg_2 = loadImage("image/mission/Calibrate_Distributor/Calibrate_Distributor_2.png");
  mission1_bg_3 = loadImage("image/mission/Calibrate_Distributor/Calibrate_Distributor_3.png");
  mission1_button = loadImage("image/mission/Calibrate_Distributor/button.png");

  mission2_card_in = loadImage("image/mission/Swipe_Card/card_in.png");
  mission2_card_out = loadImage("image/mission/Swipe_Card/card_out.png");
  mission2_card = loadImage("image/mission/Swipe_Card/card.png");
  mission2_insert = loadImage("image/mission/Swipe_Card/insert_card.png");
  mission2_too_fast = loadImage("image/mission/Swipe_Card/too_fast.png");
  mission2_too_slow = loadImage("image/mission/Swipe_Card/too_slow.png");
  mission2_accepted = loadImage("image/mission/Swipe_Card/accepted.png");

  mission3_background = loadImage("image/mission/Fix_Wiring/Fix_Wiring.png");

  mission4_background = loadImage("image/mission/Clear_Asteroids/background.png");
  mission4_asteroid_1 = loadImage("image/mission/Clear_Asteroids/asteriod_1.png");
  mission4_asteroid_2 = loadImage("image/mission/Clear_Asteroids/asteriod_2.png");

  mission5_background = loadImage("image/mission/Stabilize_Steering/The_Skeld_Stabilize_Steering.png");
  mission5_outer = loadImage("image/mission/Stabilize_Steering/The_Skeld_Stabilize_Steering_Outer.png");

  // Sounds
  task_complete = loadSound("sound/task_complete.mp3");

  mission_1_correct = loadSound("sound/Calibrate_Distributor/Calibrate_Distributor_correct_timing_sound.ogg");
  mission_1_incorrect = loadSound("sound/Calibrate_Distributor/Calibrate_Distributor_incorrect_timing_sound.ogg");
  mission_1_bgm = loadSound("sound/Calibrate_Distributor/Calibrate_Distributor_ring_spin_sound.ogg");

  mission2_swiping = loadSound("sound/Swipe_Card/Swipe_Card_swiping_card_sound.ogg");
  mission2_successful = loadSound("sound/Swipe_Card/Swipe_Card_successful_swipe_sound.ogg");
  mission2_failed = loadSound("sound/Swipe_Card/Swipe_Card_failed_swipe_sound.ogg");
  mission2_card_out_sound = loadSound("sound/Swipe_Card/Swipe_Card_wallet_out_sound.ogg");
  oxygen_depletion_sound = loadSound("sound/oxygen_depletion.mp3");

  mission4_shooting_sound = loadSound("sound/Clear_Asteroid/Clear_Asteroids_shooting_sound.ogg");
  mission4_destroyed_sound = loadSound("sound/Clear_Asteroid/Clear_Asteroids_asteroid_destroyed_sound.ogg");


  victory_gif = loadImage("image/victory.gif");
  failed_gif = loadImage("image/failed.gif");
  score_background = loadImage("image/score_background.png");
}

function setup() {
  //create canvas with window with and height
  width = 1200;
  height = 700;
  createCanvas(width, height);

  //resize images
  map.resize(6909, 4000);
  minimap.resize(1100, 600);
  hitmap.resize(6909, 4000);
  red_right.resize(82.5,104.28);
  red_right_gif.resize(122.1,130.68);
  red_left.resize(82.5,104.28);
  red_left_gif.resize(122.1,130.68);

  mission_bar.resize(600,50);
  setting.resize(70,70);
  mini_map.resize(70,70);

  use.resize(100, 100);
  report.resize(100, 100);
  use_active.resize(100, 100);
  report_active.resize(100, 100);
  exit_button.resize(60, 60)

  mission1_bg.resize(600, 600);
  mission1_bg_1.resize(600, 600);
  mission1_bg_2.resize(600, 600);
  mission1_bg_3.resize(600, 600);
  mission1_button.resize(38.5, 90.5);

  mission1_speed1 = random(4, 6);
  mission1_speed2 = random(4, 6);
  mission1_speed3 = random(4, 6);

  mission2_card_in.resize(600, 600);
  mission2_card_out.resize(600, 600);
  mission2_insert.resize(600, 201.7);
  mission2_too_fast.resize(600, 201.7);
  mission2_too_slow.resize(600, 201.7);
  mission2_accepted.resize(600, 201.7);

  mission3_background.resize(600, 600);

  mission5_background.resize(600, 600);
  mission5_outer.resize(600, 600);


  victory_gif.resize(1200, 700);
  failed_gif.resize(1200, 700);
  score_background.resize(1200, 700)

  // Set up variables
  mapX = 200; //200
  mapY = 1550; //1500 + 50
  charDisplayX = width/2;
  //console.log(windowWidth, windowHeight)
  charDisplayY = height/2 - 25;
  charMapX = 3860; //3860
  charMapY = 765; //815 - 50
  dirX = "right";
  dirY = "up";

  mission5_X = random(450, 750);
  mission5_Y = random(200, 500);
  while(mission5_X>550 && mission5_X<650 && mission5_Y>300 && mission5_Y<400) {
    mission5_X = random(450, 750);
    mission5_Y = random(200, 500);
  }

  setInterval(timeIt, 1000);
}

function draw() {
  noFill();
  if (game == "start"){
    start_screen();
  }
  else if (game == "playing") {
    map_display();
    character_move();

    imageMode(CORNER);
    play_game();
    textSize(50);
    fill(255);
    text(timer, width-170, 65)
    imageMode(CENTER)

    oxygenDepletion();
    if (oxygen_deplete_time == 0 || timer == 0) {
      clear();
      game = "failed";
    }
  }
  else if (game == "end") {
    check_score()
    display_score();
  }
  else if (game == "failed") {
    imageMode(CORNER);
    image(failed_gif, 0, 0);
  }

}

function oxygenDepletion() {
  if (current_mission_completion+1 == mission_completion) {
    oxygenDepleted = false;
    oxygen_deplete_time = 10000;
  }

  if (level == 'easy') {
    if (timer == 200 || timer == 100) { //200
      oxygenDepleted = true;
      current_mission_completion = mission_completion;
      oxygen_deplete_time = 50;
    }
  }

  if (level == 'medium') {
    if (timer == 170 || timer == 90) {
      oxygenDepleted = true;
      current_mission_completion = mission_completion;
      oxygen_deplete_time = 40;
    }
  }

  if (level == 'hard') {
    if (timer == 140 || timer == 50) {
      oxygenDepleted = true;
      current_mission_completion = mission_completion;
      oxygen_deplete_time = 30;
    }
  }

  if (oxygenDepleted) {

    if (timer % 2 == 0) {
      fill(255, 0, 0, 100)
      noStroke();
      rect(0, 0, width, height)
      if (!oxygen_depletion_sound.isPlaying() ) {
        oxygen_depletion_sound.play();
      }
    }
  }
}

function timeIt() {
  if (timer > 0) {
    timer--;
    if (oxygen_deplete_time > 0) {
      oxygen_deplete_time--;
    }
  }
}

function play_game() {
  displayMissionBar();
  displaySetting();
  displayUse();
  displayReport();
  mission1_play();
  mission2_play();
  mission3_play();
  mission4_play();
  mission5_play();
  displayTasks();
  displayMinimap();
  displayVictory();
}

function mousePressed() {
  if (game == "start" && !how_to_play_active) {
    if (mouseX>135 && mouseX<405 && mouseY>370 && mouseY<450) {
      game = "playing";
      level = 'easy';
      timer = 300;
    }
    if (mouseX>450 && mouseX<720 && mouseY>370 && mouseY<450) {
      game = "playing";
      level = 'medium';
      timer = 220;
    }
    if (mouseX>765 && mouseX<1035 && mouseY>370 && mouseY<450) {
      game = "playing";
      level = 'hard';
      timer = 150;
    }
  }
}

function how_to_play() {
  if (mouseIsPressed && game == "start") {
    if (mouseX>410 && mouseX<760 && mouseY>570 && mouseY<650) {
      how_to_play_active = true;
    }
  }
  if (how_to_play_active) {
    fill(0);
    stroke(255);
    strokeWeight(3);
    rect(200, 100, 800, 500, 9);
    textFont(font)
    text("HOW TO PLAY", 250, 200);
    textSize(40);
    text("Players have access to a personal map to help them nagivate the ship.", 250, 300);
    text("Complete tasks to fill gauge.", 250, 350);
    text("Complete any task to react to Imposter's Sabotage.", 250, 400);
    image(exit_button, 100, 100);

    if (mouseIsPressed && dist(130, 130, mouseX, mouseY)<30 ) {
      how_to_play_active = false;
      clear();
    }
  }
}

function start_screen() {
  textFont(font)
  fill(255);
  textSize(200)
  text("Among Us", 370, 200);
  noFill();
  stroke(255);
  strokeWeight(3);
  rect(135, 370, 270, 80, 9) //easy
  rect(450, 370, 270, 80, 9) //medium
  rect(765, 370, 270, 80, 9) //medium
  rect(410, 570, 350, 80, 9) //how to play


  fill(255)
  textSize(100)
  strokeWeight(1);
  text("EASY", 220, 450);
  text("MEDIUM", 500, 450);
  text("HARD", 845, 450);
  text("HOW TO PLAY", 440, 650);
  textFont('sans-serif')

  how_to_play();
}

function display_score() {
  clear()
  textFont(font)
  fill(255);
  textSize(200)
  text("High Score", 370, 200);

  fill(255)
  textSize(100)
  strokeWeight(1);
  text("EASY", 220, 400);
  text("MEDIUM", 500, 400);
  text("HARD", 845, 400);


  noFill();
  stroke(255);
  strokeWeight(3);
  rect(135, 420, 270, 80, 9) //easy
  rect(450, 420, 270, 80, 9) //medium
  rect(765, 420, 270, 80, 9) //medium

  textSize(90)
  strokeWeight(1);
  textFont('sans-serif')
  text(easy_high, 220, 500);
  text(medium_high, 530, 500);
  text(hard_high, 845, 500);
}

function check_score() {
  easy_high = getItem('easy_high');
  medium_high = getItem('medium_high');
  hard_high = getItem('hard_high');
  if (easy_high === null) {
    easy_high = 0;
  }
  if (medium_high === null) {
    medium_high = 0;
  }
  if (hard_high === null) {
    hard_high = 0;
  }
  if (level == "easy" && current_time > easy_high) {
    storeItem('easy_high', current_time)
    easy_high = current_time;
    console.log("stored easy")
  }
  if (level == "medium" && current_time > medium_high) {
    storeItem('medium_high', current_time)
    medium_high = current_time;
    console.log("stored medium")
  }
  if (level == "hard" && current_time > hard_high) {
    storeItem('hard_high', current_time)
    hard_high = current_time;
    console.log("stored high")
  }
}

function displayVictory() {
  if (mission_completion == 5) {
    //image(victory_gif, 0, 0);
    mission_completion = 0;
    current_time = timer;
    check_score();
    game = "end";
  }
}

function mission1_play() {
  if (charMapX>3100 && charMapX<3200 && charMapY>2200 && charMapY<2300 && !mission1_complete) {
    if (mouseIsPressed && mouseX > 1100 && mouseY > 600) {
      use_clicked = true;
    }
    if (!use_clicked) {
      image(use_active, width-120, height-120);
    }
    else {
      mission1();
    }
  }
}

function mission2_play() {
  if (charMapX>4800 && charMapX<4900 && charMapY>2250 && charMapY<2350 && !mission2_complete) {
    if (mouseIsPressed && mouseX > 1100 && mouseY > 600) {
      use_clicked = true;
    }
    if (!use_clicked) {
      image(use_active, width-120, height-120);
    }
    else {
      mission2();
    }
  }
}

function mission3_play() {
  if (charMapX>2850 && charMapX<2950 && charMapY>2200 && charMapY<2300 && !mission3_complete) {
    if (mouseIsPressed && mouseX > 1100 && mouseY > 600) {
      use_clicked = true;
    }
    if (!use_clicked) {
      image(use_active, width-120, height-120);
    }
    else {
      mission3();
    }
  }
}

function mission4_play() {
  if (charMapX>5240 && charMapX<5440 && charMapY>750 && charMapY<900 && !mission4_complete) {
    if (mouseIsPressed && mouseX > 1100 && mouseY > 600) {
      use_clicked = true;
    }
    if (!use_clicked) {
      image(use_active, width-120, height-120);
    }
    else {
      mission4();
    }
  }
}

function mission5_play() {
  if (charMapX>6550 && charMapX<6700 && charMapY>1670 && charMapY<1770 && !mission5_complete) {
    if (mouseIsPressed && mouseX > 1100 && mouseY > 600) {
      use_clicked = true;
    }
    if (!use_clicked) {
      image(use_active, width-120, height-120);
    }
    else {
      mission5();
    }
  }
}

function mission5() { //Stabilize Steering
  if (mission5_complete == false) {
    image(mission5_background, 300, 50);

    //aiming
    noFill();
    strokeWeight(5);
    stroke(255);
    circle(mission5_X, mission5_Y, 95); //95
    circle(mission5_X, mission5_Y, 28);
    rect(mission5_X-0.6, mission5_Y-66, 1.5, 132);
    rect(mission5_X-66, mission5_Y-0.6, 132, 1.5);

    rect(330, mission5_Y-0.6, 550, 1.5); //598, 349
    rect(mission5_X-0.6, 70, 1.5, 550);

    image(mission5_outer, 300, 50);

    if (mouseIsPressed && dist(mission5_X, mission5_Y, mouseX, mouseY) < 35) {
      mission5_X = mouseX;
      mission5_Y = mouseY;
    }

    if ( dist(598, 349, mouseX, mouseY) < 3 ) {
      mission5_complete = true;
      use_clicked = false;
      mission_completion += 1;
      task_complete.play();
    }
  }
}

function mission4() { // Clear Asteroids
  if (mission4_complete == false) {
    // background
    tint(255, 220);
    image(mission4_background, 300, 50)
    noTint();

    // line
    stroke(31, 81, 55);
    strokeWeight(6);
    line(293, 43, 907, 43);
    line(907, 43, 907, 657);
    line(907, 657, 293, 657);
    line(293, 657, 290, 43);

    //console.log(counter)
    // mouse
    stroke(35, 109, 71);
    strokeWeight(12);
    if (!mouseIsPressed) {
      counter = 0;
    }

    if (mouseIsPressed) {
      counter++;
      if (mouseX>305 && mouseX<895 && mouseY>55 && mouseY<645 && counter == 1) {
        mission4_shooting_sound.play();
        mission4_X = mouseX;
        mission4_Y = mouseY;
        noStroke();
        fill(23, 73, 47);
        // middle +
        rect(mission4_X-15, mission4_Y, 30, 10);
        rect(mission4_X-5, mission4_Y-10, 10, 30);
        // square
        rect(mission4_X-37-5, mission4_Y-37, 74, 10);
        rect(mission4_X+37-5, mission4_Y-37, 10, 74);
        rect(mission4_X-37-5, mission4_Y+37, 84, 10);
        rect(mission4_X-37-5, mission4_Y-37, 10, 74);
        // middle
        rect(mission4_X-52.5, mission4_Y, 30, 10);
        rect(mission4_X+22.5, mission4_Y, 30, 10);
        rect(mission4_X-5, mission4_Y-47.5, 10, 30);
        rect(mission4_X-5, mission4_Y+27.5, 10, 30);
      }
    }
    line(305, 645, mission4_X-5, mission4_Y+5);
    line(895, 645, mission4_X+5, mission4_Y+5);

    noStroke();
    fill(23, 73, 47);
    // middle +
    rect(mission4_X-15, mission4_Y, 30, 10);
    rect(mission4_X-5, mission4_Y-10, 10, 30);
    // square
    rect(mission4_X-37-5, mission4_Y-37, 74, 10);
    rect(mission4_X+37-5, mission4_Y-37, 10, 74);
    rect(mission4_X-37-5, mission4_Y+37, 84, 10);
    rect(mission4_X-37-5, mission4_Y-37, 10, 74);
    // middle
    rect(mission4_X-52.5, mission4_Y, 30, 10);
    rect(mission4_X+22.5, mission4_Y, 30, 10);
    rect(mission4_X-5, mission4_Y-47.5, 10, 30);
    rect(mission4_X-5, mission4_Y+27.5, 10, 30);

    //display Score
    stroke(0);
    strokeWeight(8);
    textSize(50);
    fill(255);
    text("Destroyed: "+mission4_asteroid_destroyed, 320, 630);

    // create asteroids
    if (frameCount % 120 == 0) {
  		let temp_asteroid = new Asteroid();
  		  asteroids.push(temp_asteroid);
  	}
  	for (let i = 0; i < asteroids.length; i++) {
  		asteroids[i].move();

      // off screen
  		if (asteroids[i].x < 290 || asteroids[i].y < 80 || asteroids[i].y > 590) {
  			asteroids.splice(i, 1);
  		}
  	}
    for (let i = 0; i < asteroids.length; i++) {
      // hit
      if ( (dist(asteroids[i].x+60, asteroids[i].y+50, mouseX, mouseY)) < 60 && mouseIsPressed && counter < 5) {
        asteroids.splice(i, 1);
        mission4_asteroid_destroyed++;
        mission4_destroyed_sound.play();
      }
    }
    if (mission4_asteroid_destroyed >= 20) {
      mission4_complete = true;
      use_clicked = false;
      mission_completion += 1;
      task_complete.play();
    }

  }
}

class Asteroid {
  constructor() {
    this.x = 830;
    this.y = random(200, 500);
    this.speedX = random(6, 8);
    this.speedY = random(-2, 2);
    this.image = int(random(2) )+1;
  }

  move() {
    if (this.x < 830) {
      if (this.image == 1) {
        image(mission4_asteroid_1, this.x, this.y);
      }
      if (this.image == 2) {
        image(mission4_asteroid_2, this.x, this.y);
      }
    }
    this.x -= this.speedX;
    this.y -= this.speedY;
  }

}

function mission3() { // fix wiring
  if (mission3_complete == false) {
    image(mission3_background, 300, 50)

    if (!mission3_wire1) {
      // check if wire1 is clicked
      if (mouseX>340 && mouseX<380 && mouseY>155 && mouseY<190) {
        if (mouseIsPressed) {
          mission3_wire1_clicked = true
        }
      }
      // check if wire1 is released and correct
      if (mission3_wire1_clicked && !mouseIsPressed) {
        if (mouseX>790 && mouseX<830 && mouseY>400 && mouseY<435) {
          mission3_wire1 = true;
        }
        else {
          mission3_wire1_clicked = false
        }
      }
      // check if wire1 is clicked and draw line
      if (mission3_wire1_clicked && mouseIsPressed) {
        if (mouseX<900 && mouseX>300 && mouseY>50 && mouseY<650) {
          stroke(250, 236, 81);
          strokeWeight(25);
          line(360, 173, mouseX, mouseY)
        }
        else {
          mission3_wire1_clicked = false
        }
      }
    }
    else {
      // draw wire1 if completed
      stroke(250, 236, 81);
      strokeWeight(25);
      line(360, 173, 810, 420);
    }

    if (!mission3_wire2) {
      // check if wire2 is clicked
      if (mouseX>340 && mouseX<380 && mouseY>280 && mouseY<315) {
        if (mouseIsPressed) {
          mission3_wire2_clicked = true
        }
      }
      // check if wire2 is released and correct
      if (mission3_wire2_clicked && !mouseIsPressed) {
        if (mouseX>790 && mouseX<830 && mouseY>280 && mouseY<315) {
          mission3_wire2 = true;
        }
        else {
          mission3_wire2_clicked = false
        }
      }
      // check if wire2 is clicked and draw line
      if (mission3_wire2_clicked && mouseIsPressed) {
        if (mouseX<900 && mouseX>300 && mouseY>50 && mouseY<650) {
          stroke(38, 39, 241);
          strokeWeight(25);
          line(360, 297, mouseX, mouseY)
        }
        else {
          mission3_wire2_clicked = false
        }
      }
    }
    else {
      // draw wire2 if completed
      stroke(38, 39, 241);
      strokeWeight(25);
      line(360, 297, 810, 297);
    }

    if (!mission3_wire3) {
      // check if wire3 is clicked
      if (mouseX>340 && mouseX<380 && mouseY>400 && mouseY<435) {
        if (mouseIsPressed) {
          mission3_wire3_clicked = true
        }
      }
      // check if wire3 is released and correct
      if (mission3_wire3_clicked && !mouseIsPressed) {
        if (mouseX>790 && mouseX<830 && mouseY>155 && mouseY<190) {
          mission3_wire3 = true;
        }
        else {
          mission3_wire3_clicked = false
        }
      }
      // check if wire3 is clicked and draw line
      if (mission3_wire3_clicked && mouseIsPressed) {
        if (mouseX<900 && mouseX>300 && mouseY>50 && mouseY<650) {
          stroke(231, 52, 35);
          strokeWeight(25);
          line(360, 418, mouseX, mouseY)
        }
        else {
          mission3_wire3_clicked = false
        }
      }
    }
    else {
      // draw wire3 if completed
      stroke(231, 52, 35);
      strokeWeight(25);
      line(360, 418, 810, 173);
    }

    if (!mission3_wire4) {
      // check if wire4 is clicked
      if (mouseX>340 && mouseX<380 && mouseY>525 && mouseY<560) {
        if (mouseIsPressed) {
          mission3_wire4_clicked = true
        }
      }
      // check if wire4 is released and correct
      if (mission3_wire4_clicked && !mouseIsPressed) {
        if (mouseX>790 && mouseX<830 && mouseY>525 && mouseY<560) {
          mission3_wire4 = true;
        }
        else {
          mission3_wire4_clicked = false
        }
      }
      // check if wire4 is clicked and draw line
      if (mission3_wire4_clicked && mouseIsPressed) {
        if (mouseX<900 && mouseX>300 && mouseY>50 && mouseY<650) {
          stroke(237, 50, 245);
          strokeWeight(25);
          line(360, 543, mouseX, mouseY)
        }
        else {
          mission3_wire4_clicked = false
        }
      }
    }
    else {
      // draw wire4 if completed
      stroke(237, 50, 245);
      strokeWeight(25);
      line(360, 543, 810, 543);
    }

    if (mission3_wire1 && mission3_wire2 && mission3_wire3 && mission3_wire4) {
      counter += 1/60;
      if (counter > 2) {
        counter = 0;
        mission3_complete = true;
        mission_completion += 1;
        use_clicked = false;
        task_complete.play();
      }
    }
    // 340 380 155 190 left1
    // 340 380 280 315 left2
    // 340 380 400 435 left3
    // 340 380 525 560 left4

    // 790 830 155 190 right1
    // 790 830 280 315 right2
    // 790 830 400 435 right3
    // 790 830 525 560 right4

  }
}

function mission2() { // Swipe Card
  if (mission2_complete == false) {

    if (mouseIsPressed) {
      if (!mission2_start) {
        mission2_card_out_sound.play();
        mission2_swiping.stop()
      }
      mission2_start = true;
    }
    if (mission2_start && !mission2_card_accepted) {
      image(mission2_card_out, 300, 50);
      console.log(counter)
      if (swipeable && mouseIsPressed) {
        if (counter == 0) {
          mission2_swiping.play()
        }
        counter += 1/60;
        if (mouseX-227/2 < 1000) {
          image(mission2_card, mouseX-227/2, 190);
        }
        if (counter>1.8 && counter<2.5 && mouseX > 900) {  //if (counter>1.8 && counter<2.5 && mouseX > 900)
          mission2_card_accepted = true;
          mission2_successful.play();
        }
        else if (counter>2.5 && mouseX > 900 && !too_slow && !mission2_card_accepted) {
          too_slow = true;
          if (!mission2_failed.isPLaying) {
            mission2_failed.play();
          }
        }
        else if (counter<1.8 && mouseX > 900 && !too_fast && !mission2_card_accepted){
          too_fast = true;
          if (!mission2_failed.isPLaying) {
            mission2_failed.play();
          }
        }
      }
      else if (mouseIsPressed && mouseX < 400) {
        swipeable = true;
      }
      else {
        swipeable = false;
        counter = 0;
        image(mission2_card, 180, 190);
      }

      if (swipeable && (mouseX-227/2 < 1000) ) {
        image(mission2_card, mouseX-227/2, 190);
      }
      if (too_fast) {
        counter2 += 1/60;
        image(mission2_too_fast, 300, 50);
        if (counter2 > 1.5) {
          counter2 = 0;
          too_fast = false;
        }
      }
      else if (too_slow) {
        counter2 += 1/60;
        image(mission2_too_slow, 300, 50);
        if (counter2 > 1.5) {
          counter2 = 0;
          too_slow = false;
        }
      }
      else{
        image(mission2_insert, 300, 50);
      }

    }
    else image(mission2_card_in, 300, 50);

    if (mission2_card_accepted) {
      counter3 += 1/60;
      image(mission2_accepted, 300, 50);
      if (counter3 > 2) {
        counter3 = 0;
        mission2_complete = true;
        mission_completion += 1;
        use_clicked = false;
        task_complete.play();
      }
    }
  }
}

function mission1() { // CalibrateDistributor
  if (mission1_complete == false) {

    if (!mission_1_bgm.isPlaying() ) {
      mission_1_bgm.play();
    }
    if (angle1 > 360) angle1 -= 360;
    if (angle2 > 360) angle2 -= 360;
    if (angle3 > 360) angle3 -= 360;

    if(mission1_complete1 == false) {
      if (angle1 > 260 && angle1 < 300) {
        image(mission1_bg_1, 300, 50);
        if (mouseIsPressed && !mission_1_correct.isPlaying() && !mission_1_incorrect.isPlaying() ) {
          mission1_complete1 = true;
          mission_1_correct.play();
        }
      }
      else {
        if (mouseIsPressed && !mission_1_incorrect.isPlaying()) {
          mission_1_incorrect.play();
        }

        image(mission1_bg, 300, 50);
      }

      push();
      translate(430,170);
      rotate(radians(angle1)); // 270, 290
      angle1 += mission1_speed1;
      image(mission1_button, 0, 0)
      pop();

      push();
      translate(430,350);
      rotate(radians(angle2) );
      image(mission1_button, 0, 0);
      pop();

      push();
      translate(430,530);
      rotate(radians(angle3) );
      image(mission1_button, 0, 0);
      pop();
    }

    else if(mission1_complete2 == false) {
      if (angle2 > 260 && angle2 < 300) {
        image(mission1_bg_2, 300, 50);
        if (mouseIsPressed && !mission_1_correct.isPlaying() && !mission_1_incorrect.isPlaying() ) {
          mission1_complete2 = true;
          mission_1_correct.play();
        }
      }
      else {
        if (mouseIsPressed && !mission_1_incorrect.isPlaying() && !mission_1_correct.isPlaying() ) {
          mission_1_incorrect.play();
        }
        image(mission1_bg_1, 300, 50);
      }

      push();
      translate(430,170);
      rotate(radians(angle1)); // 270, 290
      image(mission1_button, 0, 0)
      pop();

      push();
      translate(430,350);
      rotate(radians(angle2) );
      angle2 += mission1_speed1;
      image(mission1_button, 0, 0);
      pop();

      push();
      translate(430,530);
      rotate(radians(angle3) );
      image(mission1_button, 0, 0);
      pop();
    }

    else if(mission1_complete3 == false) {
      if (angle3 > 260 && angle3 < 300) {
        image(mission1_bg_3, 300, 50);
        if (mouseIsPressed && !mission_1_correct.isPlaying() && !mission_1_incorrect.isPlaying() ) {
          mission1_complete3 = true;
          mission_1_correct.play();
        }
      }
      else {
        if (mouseIsPressed && !mission_1_incorrect.isPlaying() && !mission_1_correct.isPlaying() ) {
          mission_1_incorrect.play();
        }
        image(mission1_bg_2, 300, 50);
      }

      push();
      translate(430,170);
      rotate(radians(angle1)); // 270, 290
      image(mission1_button, 0, 0)
      pop();

      push();
      translate(430,350);
      rotate(radians(angle2) );
      image(mission1_button, 0, 0);
      pop();

      push();
      translate(430,530);
      rotate(radians(angle3) );
      angle3 += mission1_speed1;
      image(mission1_button, 0, 0);
      pop();
    }

    if (mission1_complete3) {
      mission_1_bgm.stop();
      counter += 1/60;

      image(mission1_bg_3, 300, 50);

      push();
      translate(430,170);
      rotate(radians(angle1)); // 270, 290
      image(mission1_button, 0, 0)
      pop();

      push();
      translate(430,350);
      rotate(radians(angle2) );
      image(mission1_button, 0, 0);
      pop();

      push();
      translate(430,530);
      rotate(radians(angle3) );
      image(mission1_button, 0, 0);
      pop();

      if (counter > 2) {
        counter = 0;
        task_complete.play();
        mission_completion += 1;
        use_clicked = false;
        mission_playing = false;
        mission1_complete = true;
      }
    }
  }
}

function map_display() {
  if (!mission_playing) {
    // Move map position
    if (keyIsDown(68) && hitmap.get(charMapX+5, charMapY+70)[0] == 0) { // right
      mapX -= 3.9;
      charMapX+= 3.9;
      if (keyIsDown(87) && hitmap.get(charMapX+5, charMapY+70-5)[0] == 0) { //up
        mapY += 3.9;
        charMapY -= 3.9;
      }
      else if (keyIsDown(83) && hitmap.get(charMapX+5, charMapY+70+5)[0] == 0) { //down
        mapY -= 3.9;
        charMapY += 3.9;
      }
      else{
        mapX -= 1.3; //5.2
        charMapX += 1.3;
      }
    }
    else if (keyIsDown(65) && hitmap.get(charMapX-5, charMapY+70)[0] == 0) { // left
      mapX += 3.9;
      charMapX -= 3.9;
      if (keyIsDown(87) && hitmap.get(charMapX-5, charMapY+70-5)[0] == 0) { //up
        mapY += 3.9;
        charMapY -= 3.9;
      }
      else if (keyIsDown(83) && hitmap.get(charMapX-5, charMapY+70+5)[0] == 0) { //down
        mapY -= 3.9;
        charMapY += 3.9;
      }
      else{
        mapX += 1.3;
        charMapX -= 1.3;
      }
    }
    else if (keyIsDown(87) && hitmap.get(charMapX, charMapY+70-5)[0] == 0) { // up
      mapY += 5.2;
      charMapY -= 5.2;
    }
    else if (keyIsDown(83) && hitmap.get(charMapX, charMapY+70+5)[0] == 0) { // down
      mapY -= 5.2;
      charMapY += 5.2;
    }
  }
  // Display map
  image(map, mapX, mapY);
}

function character_move() {
  // Character Moving
  if (keyIsDown(68) ) { // right
    dirX = "right";
    image(red_right_gif,charDisplayX,charDisplayY);
  }
  else if (keyIsDown(65) ) { // left
    dirX = "left";
    image(red_left_gif,charDisplayX,charDisplayY);
  }
  else if (keyIsDown(87) ) { // up
    dirY = "up";
    if (dirX == "right") {
      image(red_right_gif,charDisplayX,charDisplayY);
    }
    else if (dirX == "left") {
      image(red_right_gif,charDisplayX,charDisplayY);
    }
  }
  else if (keyIsDown(83) ) { // down
    dirY = "down";
    if (dirX == "right") {
      image(red_right_gif,charDisplayX,charDisplayY);
    }
    else if (dirX == "left") {
      image(red_left_gif,charDisplayX,charDisplayY);
    }
  }

  // Character resting state
  else if (dirX == "right") {
    image(red_right,charDisplayX-2,charDisplayY+20);
  }
  else if (dirX == "left") {
    image(red_left,charDisplayX+2,charDisplayY+20);
  }
}

function displayMissionBar() {
  image(mission_bar, 10, 10);

  noStroke();
  fill(67, 216, 68);

  if (mission_completion == 1) {
    rect(24, 23, 110, 24); //length 572 286

  }
  else if (mission_completion == 2) {
    rect(24, 23, 110, 24);
    rect(139.6, 23, 110, 24);
  }
  else if (mission_completion == 3) {
    rect(24, 23, 110, 24);
    rect(139.6, 23, 110, 24);
    rect(255.2, 23, 110, 24);
  }
  else if (mission_completion == 4) {
    rect(24, 23, 110, 24);
    rect(139.6, 23, 110, 24);
    rect(255.2, 23, 110, 24);
    rect(370.8, 23, 110, 24);
  }
  else if (mission_completion == 5) {
    rect(24, 23, 110, 24);
    rect(139.6, 23, 110, 24);
    rect(255.2, 23, 110, 24);
    rect(370.8, 23, 110, 24);
    rect(486.4, 23, 110, 24);
  }


}

function displayTasks() {
  noStroke();
  fill(255, 255, 255, 100)

  // white box
  if (!oxygenDepleted) {
    rect(12, 70, 300, 140);
  }
  else {
    rect(12, 70, 300, 165);
  }

  //task white box
  rect(312, 70, 35, 100);

  stroke(0);
  strokeWeight(3);
  textSize(20);

  fill(255)
  if (mission1_complete) {
    fill(13, 196, 9)
  }
  text('Electrical: Calibrate Distributor', 25, 98)

  fill(255)
  if (mission2_complete) {
    fill(13, 196, 9)
  }
  text('Admin: Swipe Card', 25, 123)

  fill(255)
  if (mission3_complete) { //Fix Wiring
    fill(13, 196, 9)
  }
  text('Electrical: Fix Wiring', 25, 148)

  fill(255)
  if (mission4_complete) { // Clear Asteroids
    fill(13, 196, 9);
  }
  text('Weapons: Clear Asteroids', 25, 173);

  fill(255)
  if (mission5_complete) { // Clear Asteroids
    fill(13, 196, 9);
  }
  text('Navigation: Stablize Steering', 25, 198);


  // Oxygen Depletion
  if (oxygenDepleted) {
    if (oxygen_deplete_time % 2 == 0) {
      fill(255, 0, 0);
    }
    else {
      fill(200, 185, 65);
    }
    text('Oxygen Depleted in '+ oxygen_deplete_time, 25, 223)
  }


  push(); // tasks sideway
    translate(335, 140);
    rotate(radians(-90));
    fill(255)
    text('Tasks', 0, 0);
  pop();
}

function displaySetting() {
  image(setting, width-80, 10);
}

function displayMinimap() {
  image(mini_map, width-80, 100);

  if (mouseIsPressed && dist(1155, 135, mouseX, mouseY)<35 && !minimap_clicked ) {
    minimap_clicked = true;
  }
  if (minimap_clicked) {
    image(minimap, 50, 50);
    image(exit_button, 70, 70);

    if (mouseIsPressed && dist(100, 100, mouseX, mouseY)<30 ) {
      minimap_clicked = false;
    }
  }
}

function displayUse() {
  image(use, width-120, height-120);
}

function displayReport() {
  image(report, width-125, height-240);
}
