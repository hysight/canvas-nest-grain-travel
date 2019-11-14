/**
 * @Author: zhangb
 * @Date: 2019-10-12 10:43:16
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-10-15 14:41:53
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
    const splitPoints = React.useMemo(() => {
        const splits = 20;
        let sps = [];
        let i = 0;
        while(i * splits < winW) {
            sps.push(i * splits);
            i++;
        }
        return sps;
    }, [winW]);
    // 生成随机文本
    const createText = () => {
        const str = ["0", "1", " "];
        return Array.from({length: Math.floor(Math.random() * 20)}, () => str[Math.floor(Math.random() * str.length)]).join("");
    };
    // 生成随机点
    const createPoint = () => {
        const p = splitPoints[Math.floor(Math.random() * splitPoints.length)];
        const colors = ['#094efa', '#1758dc'];
        const str = createText();
        return ({
            x: p,
            y: - 20 * str.length,
            oy: 2 + Math.random() * 5,
            opacity: 1,
            oa: Math.random() * 0.015,
            color: colors[Math.floor(Math.random()* colors.length)],
            text: str,
        });
    };
    // 初始化100个
    const initPoints = () => {
        poinsts = Array.from({length: 100}, () => createPoint());
    }
    // 绘制主体
    const drawCanvas = () => {
        const ctx = canvas.current.getContext('2d');
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
        poinsts.forEach((p, i) => {
            p.opacity -= p.oa;
            p.y += p.oy;
            
            const str = "14px Verdana";
            const color = ctx.createLinearGradient(p.x, p.y, p.x + ctx.measureText(str).width, p.y);
            color.addColorStop(0, `rgba(${colorRgb(p.color)}, ${p.opacity})`);
            color.addColorStop(1, `rgba(${colorRgb(p.color)}, ${p.opacity - 0.4})`);

            // ctx.fillStyle = `rgba(${colorRgb(p.color)}, ${p.opacity})`;
            // ctx.fillStyle = color;
            // ctx.fillText(p.text, p.x, p.y);
            // for(let k = 0; k < p.text.length; k++) {
            //     const txt = p.text[k];
            //     // debugger;
            //     ctx.fillText(txt, p.x, p.y + k * 20);
            // }
            let j = 0;
            while(j < p.text.length) {
                const txt = p.text[j];
                const nop = (p.opacity - j * 0.4 / (p.text.length - 1));
                ctx.font= str;
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = `rgba(${colorRgb(p.color)}, ${nop})`;
                ctx.fillText(txt, p.x, p.y + j * 20);
                j++;
            }
            if(p.y > canvas.current.height || p.opacity < 0) {
                const np = createPoint();
                p.x = np.x;
                p.y = np.y;
                p.oy = np.oy;
                p.opacity = np.opacity;
                p.oa = np.oa;
                p.color = np.color;
                p.text = np.text;
            }
        });
        requestAnimationFrame(drawCanvas);
    };
    React.useEffect(() => {
        initPoints();
        drawCanvas();
    }, []);
    return (
        <canvas className="canvas" ref={canvas} width={winW} height={winH} />
    );
}