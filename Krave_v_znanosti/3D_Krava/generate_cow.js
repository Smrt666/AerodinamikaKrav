function generate_cow() {
  var l = 1
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
  return krawa;
}