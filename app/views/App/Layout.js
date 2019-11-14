/**
 *@Author: hy-zhangb
 *Date: 2019/1/4 11:40
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-11-14 18:30:59
 *Email: lovewinders@163.com
 *File Path: jointable - Layout
 *@File Name: Layout
 *@Description: Description
 */
'use strict';
import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter, Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// import { FETCH_USER_INFO_DATA } from 'app/constant/user';

// component

// containers

// views
import Canvas from 'app/views/Canvas';

// css
import './style.scss';

// Layout
// @withRouter
class WrapLayout extends Component {
    static propTypes = {
        // dispatch: PropTypes.func,
        // userInfo: PropTypes.object
    };
    render() {

        return (
            <Switch>
                <Route
                    // exact={true}
                    // strict={true}
                    path='/'
                    component={Canvas}
                />
            </Switch>
        );

    }
}

export default WrapLayout;