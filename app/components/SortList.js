/**
 * Created by ming on 2016/3/14.
 */
import React from 'react';
import {Toolbar,ToolbarTitle} from 'material-ui'
import AMUI from 'amazeui-react'
import Lib from '../tool/Lib';

const styles = {
    error: {
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    loading: {
        marginTop: 100,
        //marginLeft:100,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    loadMore: {
        width: '100%',
        paddingLeft: '40%'
    },
    main:{
        marginTop:50
    }
};
const SortList = React.createClass({

    getInitialState() {
        return {
            list: [],
            error: false,
            page: 1,
            isLoad: false
        };
    },

    refreshList(page){
        let oldList = this.state.list;
        $.ajax({
            method: 'get',
            url: Lib.BaseUrl + '/sort/' + this.props.mid + '?count=10&page=' + page,
            context: this,
            success(data){
                if (data.code == 0) {
                    let list = [];
                    for (let key in data.list) {
                        if (data.list.hasOwnProperty(key)) {
                            let video = data.list[key];
                            list.push({
                                title: video.title,
                                link: '#/play/' + video.aid,
                                desc: video.description,
                                img: video.pic
                            });
                        }
                        if (this.isMounted()) {
                            list = oldList.concat(list);
                            this.setState({
                                list: list,
                                isLoad: true,
                                page: page
                            });
                        }
                    }
                } else {
                    this.setState({
                        error: true
                    });

                }
            },
            error: function () {
                this.setState({
                    error: true
                });
            }
        });
    },

    componentDidMount() {
        this.refreshList(1);

    },
    pageAdd(){
        this.refreshList(this.state.page + 1);

    },

    render(){
        let data = {
            main: this.state.list
        };
        let handler = function () {
            this.pageAdd();
        }.bind(this);

        if (this.state.error) {
            return <div style={styles.error}><Lib.ErrorWidght/></div>
        }
        return (this.state.isLoad) ? (<div style={styles.main}>
            {/* <AppBar title={Lib.Sorts[this.state.mid]} key='title'/>*/}


            <Toolbar >
                <ToolbarTitle text={ Lib.Sorts[this.props.mid] }/>
            </Toolbar>

            <AMUI.ListNews data={data} thumbPosition='left' key='list'/>
            <div style={styles.loadMore}>
                <Lib.LoadingButton
                    block clickHandler={handler}
                    loadingText='正在加载...'
                    key='load-btn'
                >加载更多</Lib.LoadingButton>
            </div>

        </div>) : <div style={styles.loading}><Lib.LoadingWidght/></div>
    }
});

export default React.createClass({
    render() {
        return <SortList mid={this.props.params.mid}/>;
    }
});
