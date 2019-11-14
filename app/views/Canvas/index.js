/**
 * @Author: zhangb
 * @Date: 2019-11-14 17:52:04
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-11-14 18:27:10
 * @Description: 
 */
import React, {Component} from 'react';

//containers

//component
import Nest from 'app/components/Nest';

//css
import './style.scss';

//BezierLine
class NestCanvas extends Component {
    constructor(props) {

        super(props);

    }

    render() {

        return (
            <div className='hv-nest-canvas' style={{overflow: 'hidden'}}>
                <Nest />
            </div>
        );

    }
}

export default NestCanvas;