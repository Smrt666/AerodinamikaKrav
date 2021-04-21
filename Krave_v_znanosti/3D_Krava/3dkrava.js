function matrix_add(left, right) {
        let height = left.length;
        let width;
        if (height > 0) {
                width = left[0].length;
        } else {
                return undefined;
        }
        let r = Array(height);
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
        let height = left.length;
        let width;
        if (height > 0) {
                width = left[0].length;
        } else {
                return undefined;
        }
        let r = Array(height);
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

function matrix_mul(left, right) {
        let lh = left.length;
        let lw
        // Praznih matrik ne moremo pomnožiti
        if (lh > 0) {
                lw = left[0].length;
        } else {
                return undefined;
        }
        let rh = right.length;
        let rw;
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
        let r = Array(h);
        for (let y = 0; y < h; y++) {
                r[y] = Array(w);
        }

        // izračunamo rezultat
        for (let yleft = 0; yleft < lh; yleft++) {
                for (let xright = 0; xright < rw; xright++) {
                        let sum = 0
                        for (let yright = 0; yright < rh; yright++) {
                                xleft = yright;
                                sum += left[yleft][xleft] * right[yright][xright];
                        }
                        r[yleft][xright] = sum;
                }

        }
        return r;
}


// [x, y, z] -> [aspect_ratio * Fov_scaling_factor * x / z, Fov_scaling_factor * y / z, q * (z - r_near)]
// To je slika točke med -1 in 1


function R2(point) {
        let s = 0;
        for (let i = 2; i < point.length; i++) {
                s += point[i] * point[i];
        }
        if (s == 0) {
                return 1;
        }
        return Math.sqrt(s);
}

function move_to_center(point) {
        let x = point[0];
        let y = point[1];
        let z = R2(point);
        let p = [aspect_ratio * Fov_scaling_factor * x / z, Fov_scaling_factor * y / z, q * (z - r_near)];
        return [(p[0] + 1) * width / 2, (p[1] + 1) * height / 2]
}

function visible(point) {
        let s = true;
        for (let i = 2; i < point.length; i++) {
                s = s && (point[i] >= 0);
        }

        return s;
}


function project_objects(objects, move, rotate) {
        let proj_objects = [];
        for (let i = 0; i < objects.length; i++) {
                let object = objects[i];
                let projected_points = [];
                let to_draw = true;
                for (let j = 0; j < object.length; j++) {
                        let tmp = matrix_sub(matrix_mul([object[j]], rotate), [move])[0];
                        // najprej zavrtmo okrog 0, potem pa premaknemo glede na kamero
                        if (r_near < R2(tmp) < r_far) { // && visible(tmp)
                                let projected = move_to_center(tmp);
                                projected_points.push(projected);
                        } else {
                                to_draw = false;
                        }
                }
                if (to_draw) {
                        proj_objects.push(projected_points);
                }
        }
        return proj_objects;
}

function draw_rectangle(surface, p) {
        ctx.beginPath();
        surface.moveTo(p[0], p[0]);
        for (let i = 0; i < p.length; i++) {
                surface.lineTo(p[i][0], p[i][1]);
        }
        surface.lineTo(p[0][0], p[0][1]);
        surface.stroke();
}

function draw(objects, ctx, move, rotate) {
        let td = project_objects(objects, move, rotate);
        ctx.clearRect(0, 0, can.width, can.height);
        td.forEach(element => {
                draw_rectangle(ctx, element);
        });
}