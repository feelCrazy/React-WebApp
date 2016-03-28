/**
 * Created by ming on 2016/3/13.
 */

import React from 'react';
import {Divider,Card,CardMedia,CardTitle,Paper,Toolbar,ToolbarTitle}from 'material-ui'
//import {Link} from 'react-router';
import AMUI from 'amazeui-react';
import Lib from '../tool/Lib';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        ////justifyContent: 'flex-start',
        //alignItems: 'flex-end',
        padding: 10
        //flex:1
    },
    cardAll: {
        width: 180,
        height: 200,
        //flex:1
        padding: 5

    },
    root1: {
        flexWrap: 'wrap',
        justifyContent: ' flex-start',
        //flex:1
    },
    titleSize: {
        fontSize: 16,
        overflowY: 'auto',
        //whitespace: nowrap
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    top: {
        marginTop: 50
    },
    loading: {
        //flexDirection:'c'
        marginTop: 100,
        //marginLeft:100,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    }


};

const Rank = React.createClass({
    getInitialState() {
        return {
            list: [],
            error: false,
            isLoad: false
        };
    },
    refreshApp(){
        $.ajax({
            method: 'get',
            url: Lib.BaseUrl + '/topinfo',
            context: this,
            success(data){
                var renderResult = [];
                for (let i = 0; i < Lib.IndexList.length; i++) {
                    let sortName = Lib.IndexList[i];
                    if (data.hasOwnProperty(sortName)) {
                        let list = data[sortName];
                        let renderList = [];
                        for (let j = 0; j < list.length - 1; j++) {
                            renderList.push({
                                img: list[j].pic,
                                link: '#/play/' + list[j].aid,
                                title: list[j].title,
                                desc: list[j].create
                            });
                        }

                        renderResult.push(<div key={sortName} style={styles.root1}><Divider/>

                            {                         /*{renderList.map((tile)=>(
                             <Card
                             style={styles.cardAll}
                             >
                             <CardMedia>
                             <img src={tile.img}/>
                             </CardMedia>
                             <CardTitle
                             titleStyle={styles.titleSize}
                             title={tile.title}
                             subtitle={<span>{tile.desc}</span>}
                             />
                             </Card>
                             ))}
                             */}

                            {/* <AMUI.Titlebar theme='cols' title={ sortName }/>*/}
                            <Toolbar >
                                <ToolbarTitle text={sortName} style={styles.ti}/>
                            </Toolbar>
                            <AMUI.Gallery theme='bordered' data={ renderList }/>


                        </div>)
                    }
                }

                const loadClear = function () {
                    if (this.isMounted()) {
                        this.setState({
                            list: renderResult,
                            isLoad: true
                        });

                    }

                }.bind(this);

                if (!window.load) {
                    setTimeout(function () {
                        loadClear();
                    }).bind(this, 500);
                } else {
                    loadClear();
                }
            },
            error(){
                this.setState({
                    error: true
                });
            }
        })

    },

    componentDidMount() {
        this.refreshApp();
    },


    render() {
        if (this.state.error) {
            return <div style={styles.top}><p>加载失败！！</p></div>
        }

        return (this.state.isLoad) ?
            <div style={styles.top}>{this.state.list}</div> :
            <div style={styles.loading} className="cont">
                <Lib.LoadingWidght/>
            </div>
    }
});

export default Rank;
