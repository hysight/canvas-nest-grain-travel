/**
 * @Author: zhangb
 * @Date: 2019-10-12 10:43:16
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-10-12 14:43:15
 * @Description: 
 */
import React from "react";
import { colorRgb } from "../Nest/util";

import "./style.scss"

let poinsts = [];

export default function() {
    const winW = document.body.clientWidth;
    const winH = document.body.clientHeight;
    let canvas = React.useRef();
    // 生成随机点
    const createPoint = () => {
        const splits = 50;
        poinsts.push({
            x: Math.random() * winW,
            y: 0,
            oy: Math.random(),
            opacity: 1,
            oa: Math.random() * 0.01,
            color: '#ffffff',
            isStar: Boolean(Math.round(Math.random()))
        });
    };
    const drawStar = (x, y, color, opacity, r1 = 6, r2 = 4) => {
        const ctx = canvas.current.getContext('2d');
        const rw1x = x;
        const rw1y = y - r1;

        const rw2x = x - r1 * Math.cos((90 + 1 * 72) * Math.PI / 180);
        const rw2y = y - r1 * Math.sin((90 + 1 * 72) * Math.PI / 180);

        const rw3x = x - r1 * Math.cos((90 + 2 * 72) * Math.PI / 180);
        const rw3y = y - r1 * Math.sin((90 + 2 * 72) * Math.PI / 180);

        const rw4x = x - r1 * Math.cos((90 + 3 * 72) * Math.PI / 180);
        const rw4y = y - r1 * Math.sin((90 + 3 * 72) * Math.PI / 180);

        const rw5x = x - r1 * Math.cos((90 + 4 * 72) * Math.PI / 180);
        const rw5y = y - r1 * Math.sin((90 + 4 * 72) * Math.PI / 180);

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(${colorRgb(color)}, ${opacity})`;
        ctx.moveTo(rw1x, rw1y);
        ctx.lineTo(rw3x, rw3y);
        ctx.lineTo(rw5x, rw5y);
        ctx.lineTo(rw2x, rw2y);
        ctx.lineTo(rw4x, rw4y);
        ctx.closePath();
        ctx.stroke();

    }
    const drawMoon = (x, y, color, opacity, r = 6) => {
        const ctx = canvas.current.getContext('2d');
        const jiaodu = Math.random() * 360;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(${colorRgb(color)}, ${opacity})`;
        ctx.arc(x, y, r, 90 * Math.PI / 180, 180 * Math.PI / 180, false);
        ctx.closePath();
        ctx.stroke();
    };
    // 绘制主题
    const drawCanvas = () => {
        const ctx = canvas.current.getContext('2d');
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
        if(poinsts.length < 100) createPoint();
        poinsts.forEach((p, i) => {
            p.opacity -= p.oa;
            p.y += p.oy;
            ctx.fillStyle = `rgba(${colorRgb(p.color)}, ${p.opacity})`;
            // ctx.fillStyle = `rgba(${colorRgb(p.color)}, 0)`;
            // ctx.fillStyle = p.color;
            // ctx.fillRect(p.x - 0.5, p.y - 0.5, 1, 1);
            p.isStar ? drawStar(p.x, p.y, p.color, p.opacity) : drawMoon(p.x, p.y, p.color, p.opacity);
            if(p.y > canvas.current.height || p.opacity < 0) {
                poinsts.splice(i, 1);
            }
        });
        requestAnimationFrame(drawCanvas);
    };
    React.useEffect(() => {
        drawCanvas();
    })
    return (
        <canvas id="canvas" ref={canvas} width={winW} height={winH} backgroundImage={'./images/bg.png'} />
    );
}