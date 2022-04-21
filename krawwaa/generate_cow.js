let abc = " abcčdefghijklmnoprsštuvzž";
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
]

var letter_shape = {}
for (let i = 0; i < abc.length; i++) {
  letter_shape[abc[i]] = letters[i];  
}

function generate_cow(l, x0, y0, z0) {
  // var l = 1
  var trebuh = [[0, 0, 0], [l, 0, 0], [l, l * 2, 0], [0, l * 2, 0]];
  // var prsi = [[0, 0, 0], [l, 0, 0], [l, 0, l], [0, 0, l]];           // gre tut brez
  // var zadej = [[0, l*2, 0], [l, l*2, 0], [l, l*2, l], [0, l*2, l]];  // gre tut brez
  var hrbet = [[0, 0, l], [l, 0, l], [l, l * 2, l], [0, l * 2, l]];
  var desni_bok = [[0, 0, 0], [0, l * 2, 0], [0, l * 2, l], [0, 0, l]];
  var levi_bok = [[l, 0, 0], [l, l * 2, 0], [l, l * 2, l], [l, 0, l]];

  var vrat_spredej = [[l * 0.25, 0, l], [l * 0.25, 0, l * 1.5], [l * 0.75, 0, l * 1.5], [l * 0.75, 0, l]];
  var vrat_zadej = [[l * 0.25, l * 0.5, l], [l * 0.25, l * 0.5, l * 1.5], [l * 0.75, l * 0.5, l * 1.5], [l * 0.75, l * 0.5, l]];
  var vrat_desno = [[l * 0.25, 0, l], [l * 0.25, 0, l * 1.5], [l * 0.25, l * 0.5, l * 1.5], [l * 0.25, l * 0.5, l]];
  var vrat_levo = [[l * 0.75, 0, l], [l * 0.75, 0, l * 1.5], [l * 0.75, l * 0.5, l * 1.5], [l * 0.75, l * 0.5, l]];

  var glava_zadej = [[l * 0.2, l * 0.5, l * 2], [l * 0.2, l * 0.5, l * 1.5], [l * 0.8, l * 0.5, l * 1.5], [l * 0.8, l * 0.5, l * 2]];
  var glava_desno = [[l * 0.2, l * 0.5, l * 2], [l * 0.2, l * 0.5, l * 1.5], [l * 0.2, -l * 0.5, l * 1.5], [l * 0.2, -l * 0.5, l * 2]];
  var glava_levo = [[l * 0.8, l * 0.5, l * 2], [l * 0.8, l * 0.5, l * 1.5], [l * 0.8, -l * 0.5, l * 1.5], [l * 0.8, -l * 0.5, l * 2]];
  var obraz = [[l * 0.8, -l * 0.5, l * 2], [l * 0.8, -l * 0.5, l * 1.5], [l * 0.2, -l * 0.5, l * 1.5], [l * 0.2, -l * 0.5, l * 2]]

  function noga(z, d) {
    let z0 = z[0];
    let z1 = z[1];
    let z2 = z[2];
    let gor = [[z0, z1, z2], [z0, z1 + d / 4, z2], [z0 + d / 4, z1 + d / 4, z2], [z0 + d / 4, z1, z2]];
    let dol = [[z0, z1, z2 - d], [z0, z1 + d / 4, z2 - d], [z0 + d / 4, z1 + d / 4, z2 - d], [z0 + d / 4, z1, z2 - d]];
    let stran1 = [[z0, z1, z2], [z0, z1 + d / 4, z2], [z0, z1 + d / 4, z2 - d], [z0, z1, z2 - d]];
    z0 += d / 4;
    let stran2 = [[z0, z1, z2], [z0, z1 + d / 4, z2], [z0, z1 + d / 4, z2 - d], [z0, z1, z2 - d]];
    return [gor, dol, stran1, stran2];
  }


  var krawa = [obraz, trebuh, hrbet, desni_bok, levi_bok, vrat_spredej, vrat_zadej, vrat_desno, vrat_levo, glava_zadej, glava_desno, glava_levo];
  noga([0, 0, 0], l).forEach(element => {
    krawa.push(element);
  });
  noga([l * 0.75, 0, 0], l).forEach(element => {
    krawa.push(element);
  });
  noga([0, l * 1.75, 0], l).forEach(element => {
    krawa.push(element);
  });
  noga([l * 0.75, l * 1.75, 0], l).forEach(element => {
    krawa.push(element);
  });
  for (let i = 0; i < krawa.length; i++) {
    for (let j = 0; j < krawa[i].length; j++) {
      krawa[i][j][0] += x0;
      krawa[i][j][1] += y0;
      krawa[i][j][2] += z0;
    }
  }
  return krawa;
}

class Krawatext{
  constructor(x, y, z, text, color, size){
    this.x = x;
    this.y = y;
    this.z = z;
    this.text = text;
    this.color = color;
    this.size = size;

    this.angles = [1.7, 0.9, 0.2];

    this.krawvice = [];
    let xmax = 0;
    for (let i = 0; i < text.length; i++) {
      for (let j = 0; j < 5; j++) {
        for (let k = 0; k < 5; k++) {
          if (letter_shape[text[i]][j][k] == "#") {
            let tmpy = 4 * j * size;
            let tmpx = (3 * k + i * 20) * size;
            let xm = tmpx; // * Math.cos(this.angles[1]) + tmpy * Math.sin(this.angles[2]);
            let ym = tmpy; // * Math.cos(this.angles[2]) - tmpx * Math.sin(this.angles[1]);
            xmax = Math.max(xmax, xm);
            this.krawvice.push(generate_cow(size, x, y + xm, z - ym));
          }
        }
      }
    }
    console.log(this.krawvice);
    this.move = [x, y, z + 4];
    this.rotate = [0, 0, 0];
    this.rotate[0] = [[Math.cos(this.angles[0]), -Math.sin(this.angles[0]), 0], [Math.sin(this.angles[0]), Math.cos(this.angles[0]), 0], [0, 0, 1]];
    this.rotate[1] = [[Math.cos(this.angles[1]), 0, -Math.sin(this.angles[1])], [Math.sin(this.angles[1]), 1, 0], [0, 0, Math.cos(this.angles[1])]];
    this.rotate[2] = [[1, 0, 0], [0, Math.cos(this.angles[2]), -Math.sin(this.angles[2])], [0, Math.sin(this.angles[2]), Math.cos(this.angles[2])]];
    this.master_rotate = matrix_mul(matrix_mul(this.rotate[2], this.rotate[1]), this.rotate[0]);
  }

  krawa_update() {
    this.rotate[0] = [[Math.cos(this.angles[0]), -Math.sin(this.angles[0]), 0], [Math.sin(this.angles[0]), Math.cos(this.angles[0]), 0], [0, 0, 1]];
    this.rotate[1] = [[Math.cos(this.angles[1]), 0, -Math.sin(this.angles[1])], [0, 1, 0], [Math.sin(this.angles[1]), 0, Math.cos(this.angles[1])]];
    this.rotate[2] = [[1, 0, 0], [0, Math.cos(this.angles[2]), -Math.sin(this.angles[2])], [0, Math.sin(this.angles[2]), Math.cos(this.angles[2])]];
    this.master_rotate = matrix_mul(matrix_mul(this.rotate[2], this.rotate[1]), this.rotate[0]);
  }

  krawa_drawate(ctx) {
    let stara = ctx.strokeStyle;
    ctx.strokeStyle = this.color;
    this.krawvice.forEach(krawwica => {
      draw(krawwica, ctx, this.move, this.master_rotate);
    });
    ctx.strokeStyle = stara;
  }
}