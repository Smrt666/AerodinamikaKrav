function matrix_add(left, right) {
        height = left.length;
        if (height > 0) {
                width = left[0].length;
        } else {
                return undefined;
        }
        r = Array(height);
        for (let y = 0; y < height; y++) {
                r[y] = Array(width);
        }

        for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                        r[y][x] = left[y][x] + right[y][x];
                }

        }
        return r;
}

function matrix_sub(left, right) {
        height = left.length;
        if (height > 0) {
                width = left[0].length;
        } else {
                return undefined;
        }
        r = Array(height);
        for (let y = 0; y < height; y++) {
                r[y] = Array(width);
        }

        for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                        r[y][x] = left[y][x] - right[y][x];
                }

        }
        return r;
}

function matrix_str(matrix) {
        r = "";
        for (let y = 0; y < matrix.length; y++) {
                line = matrix[y];
                for (let x = 0; x < line.length; x++) {
                        number = line[x];
                        r += number.toString() + " ";
                }
                r += "\n";
        }
        return r;
}

function matrix_mul(left, right) {
        lh = left.length;
        // Praznih matrik ne moremo pomnožiti
        if (lh > 0) {
                lw = left[0].length;
        } else {
                return undefined;
        }
        rh = right.length;
        if (rh > 0) {
                rw = right[0].length;
        } else {
                return undefined;
        }
        // Velikosti se morajo ujemati
        if (lw == rh) {
                h = lh;
                w = rw;
        } else { return undefined; }

        // Zgradimo prazno matriko, kamor bomo shranili rezultat
        r = Array(h);
        for (let y = 0; y < h; y++) {
                r[y] = Array(w);
        }

        // izračunamo rezultat
        for (let yleft = 0; yleft < lh; yleft++) {
                for (let xright = 0; xright < rw; xright++) {
                        sum = 0
                        for (let yright = 0; yright < rh; yright++) {
                                xleft = yright;
                                sum += left[yleft][xleft] * right[yright][xright];
                        }
                        r[yleft][xright] = sum;
                }

        }
        return r;
}

function dist(p) {
        s = 0
        p.forEach(element => {
                s += element[0] * element[0];
        });
        if (s == 0) {
                s = 1;
        }
        return 1; // 300/Math.sqrt(s);
}

function draw_rectangle(surface, p) {
        p0 = p[0];
        d0 = dist(p0);
        p1 = p[1];
        d1 = dist(p1);
        p2 = p[2];
        d2 = dist(p2);
        p3 = p[3];
        d3 = dist(p3);
        surface.moveTo(p0[0]*d0 + 350, p0[2]*d0 + 300);
        surface.lineTo(p1[0]*d1 + 350, p1[2]*d1 + 300);
        surface.lineTo(p2[0]*d2 + 350, p2[2]*d2 + 300);
        surface.lineTo(p3[0]*d3 + 350, p3[2]*d3 + 300);
        surface.lineTo(p0[0]*d0 + 350, p0[2]*d0 + 300);
        surface.stroke();

        // console.log("Rectangle")
        // console.log(p0[0]*d0, p0[1]*d0);
        // console.log(p1[0]*d1, p1[1]*d1);
        // console.log(p2[0]*d2, p2[1]*d2);
        // console.log(p3[0]*d3, p3[1]*d3);
}

function draw(krawa, surface, move, rotate) {
        // console.log(matrix_str(move));
        // console.log(rotate);
        surface.beginPath();
        for (let i = 0; i < krawa.length; i++) {
                const pravokotnik = krawa[i];
                // console.log(matrix_str(pravokotnik));

                let pre = [0, 0, 0, 0];
                for (let j = 0; j < pre.length; j++) {
                        let s = [[pravokotnik[j][0]], [pravokotnik[j][1]], [pravokotnik[j][2]]];
                        // console.log(matrix_str(s), "\n-\n", matrix_str(move))
                        let dif = matrix_sub(s, move);
                        // console.log("dif:\n", matrix_str(dif));
                        pre[j] = matrix_mul(rotate, dif);
                }

                draw_rectangle(surface, pre);
                // console.log(matrix_str(pre));
        }
}