var N = 2000;
let abc = " abcčdefghijklmnoprsštuvzžxy'";
let letters = [
  [".....", ".....", ".....", ".....", "....."],
  ["..#..", ".#.#.", ".###.", "#...#", "#...#"],
  ["####.", "#...#", "####.", "#...#", "####."],
  [".###.", "#...#", "#....", "#...#", ".###.",],
  [".###.", "#...#", "#....", "#...#", ".###.",],
  ["###..", "#..#.", "#...#", "#..#.", "###..",],
  ["#####", "#....", "#####", "#....", "#####",],
  ["#####", "#....", "#####", "#....", "#....",],
  [".###.", "#....", "#..##", "#...#", ".###]",],
  ["#...#", "#...#", "#####", "#...#", "#...#",],
  ["#....", "#....", "#....", "#....", "#....",],
  ["....#", "....#", "....#", "#...#", ".###.",],
  ["#...#", "#..#.", "###..", "#..#.", "#...#",],
  ["#....", "#....", "#....", "#....", "#####",],
  ["#...#", "##.##", "#.#.#", "#...#", "#...#",],
  ["#...#", "##..#", "#.#.#", "#..##", "#...#",],
  [".###.", "#...#", "#...#", "#...#", ".###.",],
  ["####.", "#...#", "####.", "#....", "#....",],
  ["####.", "#...#", "####.", "#..#.", "#...#",],
  [".###.", "#....", ".###.", "....#", ".###.",],
  [".###.", "#....", ".###.", "....#", ".###.",],
  ["#####", "..#..", "..#..", "..#..", "..#..",],
  ["#...#", "#...#", "#...#", "#...#", ".###.",],
  ["#...#", "#...#", ".#.#.", ".#.#.", "..#..",],
  ["#####", "...#.", "..#..", ".#...", "#####",],
  ["#####", "...#.", "..#..", ".#...", "#####",],
  ["#...#", ".#.#.", "..#..", ".#.#.", "#...#",],
  ["#...#", ".#.#.", "..#..", "..#..", "..#..",],
  [".#...", ".#...", ".....", ".....", ".....",],
]

the_text = "vve're no strangers to love You knovv the rules and so do I A full commitment's vvhat I'm thinking of You vvouldn't get this from any other guy I just vvanna tell you hovv I'm feeling Gotta make you understand Never gonna give you up Never gonna let you dovvn Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you vve've knovvn each other for so long Your heart's been aching but You're too shy to say it Inside vve both knovv vvhat's been going on vve knovv the game and vve're gonna play it And if you ask me hovv I'm feeling Don't tell me you're too blind to see Never gonna give you up Never gonna let you dovvn Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you Never gonna give you up Never gonna let you dovvn Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you  Ooh give you up Ooh give you up Never gonna give never gonna give Give you up Never gonna give never gonna give Give you up vve've knovvn each other for so long Your heart's been aching but You're too shy to say it Inside vve both knovv vvhat's been going on vve knovv the game and vve're gonna play it I just vvanna tell you hovv I'm feeling Gotta make you understand Never gonna give you up Never gonna let you dovvn Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you Never gonna give you up Never gonna let you dovvn Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you Never gonna give you up Never gonna let you dovvn Never gonna run around and desert you never gonna make you cry never gonna say goodbye never gonna tell a lie and hurt you";
the_text = the_text.toLowerCase().split(" ");

var letter_shape = {}
for (let i = 0; i < abc.length; i++) {
  letter_shape[abc[i]] = letters[i];  
}

function build_rotation_matrices(rotate) {
  let xy = rotate[0];
  let xz = rotate[1];
  let yz = rotate[2];
  let xycos = Math.cos(xy);
  let xysin = Math.sin(xy);
  let xzcos = Math.cos(xz);
  let xzsin = Math.sin(xz);
  let yzcos = Math.cos(yz);
  let yzsin = Math.sin(yz);

  let m0 = [[xycos, xysin, 0], [-xysin, xycos, 0], [0, 0, 1]];
  let m1 = [[xzcos, 0, xzsin], [0, 1, 0], [-xzsin, 0, xzcos]];
  let m2 = [[1, 0, 0], [0, yzcos, yzsin], [0, -yzsin, yzcos]];

  return [m0, m1, m2];
}

function rotation_matrix(rotate) {
  let m = build_rotation_matrices(rotate);
  return matrix_mul(m[0], matrix_mul(m[1], m[2]));
}

function antirotation_matrix(rotate) {
  let m = build_rotation_matrices(rotate);
  return matrix_mul(m[2], matrix_mul(m[1], m[0]));
}

function cube(x, y, z, a, b, c) {
  let r0 = [[x, y, z], [x+a, y, z], [x+a, y+b, z], [x, y+b, z]];
  let r1 = [[x, y, z+c], [x+a, y, z+c], [x+a, y+b, z+c], [x, y+b, z+c]];
  let r2 = [[x, y, z], [x, y, z+c], [x+a, y, z+c], [x+a, y, z]];
  let r3 = [[x, y+b, z], [x, y+b, z+c], [x+a, y+b, z+c], [x+a, y+b, z]];
  return [r0, r1, r2, r3];    
}

function generate_cow(l) {
  let trup = cube(-1*l, -0.5*l, -0.5*l, 2*l, l, l);
  
  let vrat = cube(-0.95*l, 0.5*l, -0.25*l, l/2, l/4, l/2);

  let glava = cube(-1.2*l, 0.75*l, -0.35*l, l*0.8, 0.5*l, 0.7*l);

  let noga1 = cube(-0.9*l, -1.5*l, -0.45*l, l/4, 1*l, l/4);
  let noga2 = cube(-0.9*l, -1.5*l, 0.2*l, l/4, 1*l, l/4);
  let noga3 = cube(0.7*l, -1.5*l, -0.45*l, l/4, 1*l, l/4);
  let noga4 = cube(0.7*l, -1.5*l, 0.2*l, l/4, 1*l, l/4);

  let krawa = [trup[0], trup[1], trup[2], trup[3],
               vrat[0], vrat[1], vrat[2], vrat[3], 
               glava[0], glava[1], glava[2], glava[3],
               noga1[0], noga1[1], noga1[2], noga1[3],
               noga2[0], noga2[1], noga2[2], noga2[3],
               noga3[0], noga3[1], noga3[2], noga3[3],
               noga4[0], noga4[1], noga4[2], noga4[3],
              ];
  return krawa;
}

function make_matrix(arr) {
  let r = Array(arr.size);
  for (let i = 0; i < arr.length; i++) {
    r[i] = [arr[i]];
  }
  return r;
}

function rand(a, b) {
  return Math.random() * (b - a) + a;
}

class Dead {
  constructor(){}
  draw(ctx){}
  update(a, b){}
}

class Krawa {
  constructor(x, y, z, l) {
    this.move = [x, y, z];
    this.rotate = [0, 0, 0];
    this.l = l;
    this.krawa = generate_cow(l);
    this.transformed = generate_cow(l);

    this.random_rotate_speed = [rand(0.003, 0.0001), rand(0.003, 0.0001), rand(0.003, 0.0001)];
    this.random_rotate_amplitude = [rand(0.1, 0.2), rand(0.1, 0.2), rand(0.1, 0.2)];
  }

  update(global_rotate, global_move) {
    this.rotate[0] = this.random_rotate_amplitude[0] * Math.sin(this.random_rotate_speed[0] * time);
    this.rotate[1] = this.random_rotate_amplitude[1] * Math.sin(this.random_rotate_speed[1] * time);
    this.rotate[2] = this.random_rotate_amplitude[2] * Math.sin(this.random_rotate_speed[2] * time);

    // console.log(this.krawa);
    if (global_move == undefined) {
      global_move = [[0], [0], [4]];
    }

    if (global_rotate == undefined) {
      for (let i = 0; i < this.krawa.length; i++) {
        for (let j = 0; j < 4; j++) {
          // console.log(this.krawa[i][j], this.rotate, this.move, global_move);
          // console.log(rotation_matrix(this.rotate), make_matrix(this.krawa[i][j]));
          this.transformed[i][j] = final_transform(matrix_add(matrix_add(matrix_mul(rotation_matrix(this.rotate), make_matrix(this.krawa[i][j])), make_matrix(this.move)), global_move));
        }
      }
    } else {
      // console.log("hmmm?!?!");
      for (let i = 0; i < this.krawa.length; i++) {
        for (let j = 0; j < 4; j++) {
          this.transformed[i][j] = final_transform(matrix_add(matrix_mul(global_rotate, matrix_add(matrix_mul(rotation_matrix(this.rotate), make_matrix(this.krawa[i][j])), [[this.move[0]], [this.move[1]], [this.move[2]]])), global_move));
        }
      }
    }
  }

  draw(ctx) {
    let old = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    this.transformed.forEach(element => {
      draw_rectangle(ctx, element);
    });
    ctx.strokeStyle = old;
  }
}

class LaKrawaAlles {
  constructor(can) {
    this.height = can.height;
    this.width = can.width;
    this.ctx = can.getContext("2d");
    this.start_time = Date.now();
    this.running_time = 0;

    
    // this.objects = [new Krawa(0, 0, 0, 1)];
    this.objects = [new Krawatext(-5, 0, 0, the_text[0], "red", 0.1)];
    this.word_count = 1;

    this.mala_krawica = new Krawa(9, 4, 1, 0.2);
  }
  
  clear_screen() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  
  update() {
    this.running_time = Date.now() - this.start_time;
    time = this.running_time;
    if (this.running_time / N > this.objects.length) {
      let len = the_text[this.word_count].length * 2 + 2;

      this.objects.push(new Krawatext(- 6, -6/len, 0, the_text[this.word_count], "red", 1.2 / len));
      this.word_count++;
      // console.log(the_text[this.word_count]);
    }
    for (let i = 0; i < this.objects.length; i++) {
      let r = this.objects[i].update();
      if (r == false) {
        this.objects[i] = new Dead();
      }
    }
    this.mala_krawica.update();
  }

  draw() {
    this.clear_screen();
    this.objects.forEach(element => {
      element.draw(this.ctx);
    });
    this.mala_krawica.draw(ctx);
  }
}

class Krawatext {
  constructor(x, y, z, text, color, size){
    this.x = x;
    this.y = y;
    this.z = z;
    this.text = text;
    this.color = color;
    this.size = size;

    this.old_time = Date.now();
    this.start_time = Date.now();
    this.move = [0, 0, 4];
    this.rotate = [1.7, 0.9, 0.2];

    this.krawvice = [];
    for (let i = 0; i < text.length; i++) {
      for (let j = 0; j < 5; j++) {
        for (let k = 0; k < 5; k++) {
          if (letter_shape[text[i]][j][k] == "#") {
            let tmpy = 4 * j * size;
            let tmpx = (3 * k + i * 20) * size;
            let xm = tmpx;
            let ym = tmpy;
            let tmp = new Krawa(x + xm, y + 4*4*size - ym, z, size);
            // console.log(tmp, new Krawa(x + xm, y + ym, z, size));
            this.krawvice.push(tmp);
            // console.log(tmp);
          }
        }
      }
    }
    this.random_rotate_speed = [rand(0.003, 0.0001), rand(0.003, 0.0001), rand(0.003, 0.0001)];
    this.random_rotate_amplitude = [rand(0.01, 0.02), rand(0.1, 0.02), rand(0.01, 0.02)];
    // console.log("created", text);
  }

  update(global_rotate, global_move) {
    this.rotate[0] = this.random_rotate_amplitude[0] * Math.sin(this.random_rotate_speed[0] * time);
    this.rotate[1] = this.random_rotate_amplitude[1] * Math.sin(this.random_rotate_speed[1] * time);
    this.rotate[2] = this.random_rotate_amplitude[2] * Math.sin(this.random_rotate_speed[2] * time);

    let dt = Date.now() - this.old_time;
    this.move[2] += dt * 0.0001;
    this.move[1] += dt * 0.0002;

    if (Date.now() - this.start_time > N) {
      // console.log("must die", this.text);
      return false;
    }
    
    if (global_move == undefined) {
      global_move = [[0], [0], [0]];
    }
    let rotmat;
    if (global_rotate == undefined) {
      rotmat = rotation_matrix(this.rotate);
    } else {
      rotmat = matrix_mul(global_rotate, rotation_matrix(this.rotate));
    }

    this.krawvice.forEach(krawvica => {
      krawvica.update(rotmat, matrix_add(global_move, make_matrix(this.move)));
    });

    this.old_time = Date.now();
  }

  draw(ctx) {
    this.krawvice.forEach(krawvica => {
      krawvica.draw(ctx);
    });
  }
}