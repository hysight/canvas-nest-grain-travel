/**
 * @Author: zhangb
 * @Date: 2019-10-10 10:04:41
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-10-11 17:44:15
 * @Description: 
 */
import React from 'react';
import { colorRgb } from "./util"

// let context;
let points;
let mPoint = {
    isStart: false,
    x: 0,
    y: 0,
    xa: 2 * Math.random() - 1,
    ya: 2 * Math.random() - 1,
    max: 100,
    color: '#ffffff',
};
let timer;

export default function() {
    const winW = document.body.clientWidth;
    const winH = document.body.clientHeight;
    let canvas = React.useRef();

    const initPoints = () => {
        const ps = 99;
        const colors = ['#fd0404', '#e70dea', '#0d3dea', '#e7ea0d', '#0dea14'];
        return Array.from({length: ps}, () => ({
            x: Math.random() * canvas.current.width,
            y: Math.random() * canvas.current.height,
            xa: 2 * Math.random() - 1,
            ya: 2 * Math.random() - 1,
            max: 100,
            color: colors[Math.floor(Math.random()* colors.length)],
            isRotate: false,
        }));
    }
    const drawCanvas = () => {
        const context = canvas.current.getContext('2d');
        context.clearRect(0, 0, canvas.current.width, canvas.current.height);
        const totalPoints = points.concat(mPoint.isStart ? [mPoint] : []);
        totalPoints.forEach((p, i) => {
            // context.strokeStyle = "red";
            // context.lineWidth = 1;
            // context.strokeRect(0, 0, canvas.current.width - 300 - 0, canvas.current.height - 300 - 0)
            p.x += !p.isRotate && !p.isStart && (p.x < 0 && Math.abs(p.xa) || p.x > canvas.current.width && -Math.abs(p.xa) || p.xa) || 0;
            p.y += !p.isRotate && !p.isStart && (p.y < 0 && Math.abs(p.ya) || p.y > canvas.current.height && -Math.abs(p.ya) || p.ya) || 0;
            
            p.xa *= p.x > canvas.current.width || p.x < 0 ? -1 : 1;
            p.ya *= p.y > canvas.current.height || p.y < 0 ? -1 : 1;
            context.fillStyle = p.color;
            context.fillRect(p.x - 0.5, p.y - 0.5, 1, 1);
            // kaishi
            for(let j = i + 1; j < totalPoints.length; j++) {
                const p2 = totalPoints[j];
                const _x = p2.x - p.x;
                const _y = p2.y - p.y;
                // const r = _x / Math.cos(Math.atan2(_y, _x) * 180 / Math.PI);
                // const r = Math.abs(_x / Math.cos(Math.atan2(_y, _x)));
                const r = _x / Math.cos(Math.atan2(_y, _x));
                p.isRotate = false;
                if(r < p.max) {
                    // const ss = 0.03;
                    if(p2.isStart && r < p.max / 2) {
                        // p.x -= p.x + ss > canvas.current.width || p.x - ss < 0 ? -ss * r : ss * r;
                        // p.y -= p.y + ss > canvas.current.height || p.y - ss < 0 ? -ss * r : ss * r;
                        const angle = Math.atan2(_y, _x);
                        const rotate = (angle * 180 / Math.PI + 0.5) > 360 ? 0 : (angle * 180 / Math.PI + 0.5);
                        const nAngle = rotate * Math.PI / 180;
                        const nP2x = p2.x - r * Math.cos(nAngle);
                        const nP2y = p2.y - r * Math.sin(nAngle);
                        p.isRotate = true;
                        p.x = nP2x;
                        p.y = nP2y;
                    }

                    const ratio = r / p.max ;
                    const color = context.createLinearGradient(p.x, p.y, p2.x, p2.y);
                    color.addColorStop(0, `rgba(${colorRgb(p.color)}, ${1 - ratio})`);
                    color.addColorStop(1, `rgba(${colorRgb(p2.color)}, ${1 - ratio})`);
                    context.beginPath();
                    context.lineWidth = 1;
                    context.strokeStyle = color;
                    context.moveTo(p.x, p.y);
                    context.lineTo(p2.x, p2.y);
                    context.stroke();
                }
            }
        });
        requestAnimationFrame(drawCanvas);
    }
    const mouseMove = (e) => {
        const ox = e.clientX;
        const oy = e.clientY;
        mPoint = Object.assign({}, {...mPoint}, {
            isStart: true,
            x: ox,
            y: oy,
        })
        console.log(ox, oy);
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            mPoint.isStart = false;
        }, 10000);
    };
    const init = () => {
        points = initPoints();
        drawCanvas();
    };
    React.useEffect(() => {
        init();
        return () => {
            clearTimeout(timer);
        }
    }, []);
    return (
        <canvas width={winW} height={winH} ref={canvas} onMouseMove={mouseMove} />
    )
}