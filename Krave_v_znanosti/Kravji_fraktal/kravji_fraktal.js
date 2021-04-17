function krawa(ctx, p0, d, angle, n, head_angle, osnovna_natancnost) {
        let k = 0.5;
        let a2 = Math.atan(k);

        ctx.beginPath();
        let dd = d * Math.cos(angle);
        let dm = d * Math.sin(angle);
        
        let dd2 = d * Math.sqrt(1 + 1/(k*k)) / 2 * Math.cos(angle + a2);
        let dm2 = d * Math.sqrt(1 + 1/(k*k)) / 2 * Math.sin(angle + a2);

        let dd3 = d * k * Math.cos(angle + Math.PI/2);
        let dm3 = d * k * Math.sin(angle + Math.PI/2);

        ctx.moveTo(p0[0], p0[1]);

        let p1 = [p0[0] + dd, p0[1] + dm];
        ctx.lineTo(p1[0], p1[1]);
        let p2 = [p0[0] + dd2, p0[1] + dm2];
        ctx.lineTo(p2[0], p2[1]);
        let p3 = [p0[0] + dd3, p0[1] + dm3];
        ctx.lineTo(p3[0], p3[1]);

        ctx.lineTo(p0[0], p0[1]);
        ctx.lineWidth = n - (osnovna_natancnost - 5)
        if (n == osnovna_natancnost || n == osnovna_natancnost - 1) {
                ctx.lineWidth = 6;
        }
        ctx.stroke();

        if (n > 0) {
                // Zadnja noga
                krawa(ctx, p2, d / 2, angle + Math.PI / 2, n - 1, head_angle, osnovna_natancnost);

                // Sprednja noga
                let dx = Math.cos(angle) * d/4;
                let dy = Math.sin(angle) * d/4;
                let p3 = [p0[0] + dd3 + dx, p0[1] + dm3 + dy];
                krawa(ctx, p3, d / 2, angle + Math.PI / 2, n - 1, head_angle, osnovna_natancnost);

                // Glava
                dx = Math.cos(angle - head_angle) * d / 4;
                dy = Math.sin(angle - head_angle) * d / 4;
                let pg = [p0[0] + dx, p0[1] + dy]
                krawa(ctx, pg, d / 2, angle + Math.PI - head_angle, n - 1, head_angle, osnovna_natancnost);
        }


}

function draw(angle, head_angle, natancnost) {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        // var head_angle = 0.1
        krawa(ctx, [300, 300], 200, angle, natancnost, head_angle, natancnost);
}