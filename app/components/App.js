/**
 * Created by ming on 2016/3/11.
 */
import React from 'react';
import {AppBar,LeftNav,MenuItem,IconButton,TextField} from 'material-ui';
//import NavBefore from 'material-ui/lib/svg-icons/image/navigate-before'
import {Link} from 'react-router';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';

import '../styles/styles.css';

const styles = {
    header: {
        //fixedHeader:'fixed'
        position: 'fixed',
        top: 0,
        zIndex: 1101,
        width: '100%',
        maxHeight: 54
    },
    menu: {
        backgroundColor: '#00bcd4',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: 24,
        fontWeight: 300,
        marginBottom: 5,
        paddingLeft: 24,
        paddingTop: 10,
        height: 54
    },
    search: {
        width: '30%'
    },
    searchIcon: {
        color:'#ffffff',
        fill:'#ffffff'
    }


};

const App = React.createClass({

    getInitialState() {
        return {
            open: false
        };
    },
    handleToggle(){
        this.setState({
            open: !this.state.open
        });

    },
    handleClose(){
        this.setState({
            open: false
        });

    },


    render() {
        return (
            <div>

                <AppBar
                    zDepth={0}
                    style={styles.header}
                    title="React-B站"
                    onLeftIconButtonTouchTap={this.handleToggle}
                >
                    <TextField
                        style={styles.search}
                        hintText="搜索"/>
                    <IconButton  iconStyle={styles.searchIcon}><SearchIcon /></IconButton>
                    <LeftNav
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={open=>this.setState({open})}
                    >
                        <div style={styles.menu}>React-B站</div>
                        <MenuItem
                            onTouchTap={this.handleClose}
                            linkButton={true}
                            containerElement={<Link to="/" />}>
                            首页
                        </MenuItem>
                        <MenuItem
                            onTouchTap={this.handleClose}
                            linkButton={true}
                            containerElement={<Link to="/sort" />}>
                            分类
                        </MenuItem>
                        <MenuItem
                            onTouchTap={this.handleClose}
                            linkButton={true}
                            containerElement={<Link to="/rank" />}>
                            排行
                        </MenuItem>

                    </LeftNav>
                </AppBar>


                {this.props.children}


            </div>
        );
    }
});

export default App;
