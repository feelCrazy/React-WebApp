/**
 * Created by ming on 2016/3/27.
 */
import React from 'react';
import AMU from 'amazeui-react';
import {Card,CardHeader,CardText}from 'material-ui'
import Lib from '../tool/Lib'
//import Player from '../Player'

var Player = require('../VideoPlayer');

const styles = {
    top: {
        marginTop: 100,
        //marginLeft:100,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    top1:{
        marginTop:50
    }

};


//分P选择
var Pagination = React.createClass({
    render: function () {
        var parts = this.props.parts;
        var nowPlay = this.props.now;
        var handler = this.props.handler;

        if (!parts || parts.length <= 1) {
            return <div></div>;
        }

        var renderList = [];
        for (var i = 0; i < parts.length; i++) {
            var cid = parts[i].cid.toString();
            if (cid != nowPlay.toString()) {
                renderList.push({title: parts[i].part, link: cid});
            }
        }

        var data = {
            pages: renderList
        };

        var handleSelect = function (link, e) {
            e.preventDefault();
            handler(link);
        };
        return <AMU.Pagination onSelect={handleSelect} theme="default" data={data}/>;
    }
});

//视频信息
var VideoInfo = React.createClass({
    render: function () {
        var data = this.props.data;
        return <AMU.Grid className='doc-g am-text-center video-info'>
            <AMU.Col md={8} mdOffset={2}>
                <AMU.Col sm={4}>
                    <AMU.Thumbnail caption={data.author} src={data.face}/>
                </AMU.Col>
                <AMU.Col sm={8}>
                    {/*<AMU.Panel header={data.title} amStyle='secondary'>
                        <p>播放:{data.play} || 弹幕:{data.video_review} ||时间:{data.created_at}</p>
                        <blockquote>{data.description}</blockquote>
                    </AMU.Panel>*/}
                    <Card>
                        <CardHeader  title={data.title}/>
                        <CardText>
                            <p>播放：{data.play} || 弹幕：{data.video_review} || 时间：{data.created_at}</p>
                            <br/>
                            {data.description}
                        </CardText>
                    </Card>
                </AMU.Col>
            </AMU.Col>
        </AMU.Grid>
    }
});


var VideoPart = React.createClass({
    getInitialState: function () {
        return {
            //加载状态
            load: false,
            //播放器加载
            playerLoad: false,
            error: false,
            //视频信息
            data: null,
            //当前part的cid
            cid: null,
            //当前videoUrl
            videoUrl: null,
            //当前弹幕url
            danmuUrl: null,
            //分P列表
            partList: [],
            width: null,
            height: null
        };
    },
    loadInfo: function () {
        $.ajax({
            method: 'get',
            url: Lib.BaseUrl + '/view/' + this.props.aid,
            context: this,
            success: function (data) {
                var videoList = [];
                for (var i in data.list) {
                    if (data.list.hasOwnProperty(i)) {
                        videoList.push(data.list[i]);
                    }
                }
                var video = videoList[0];
                this.setState({
                    cid: video.cid,
                    data: data,
                    load: true,
                    partList: videoList
                });
                this.loadVideo(video.cid, 1);
            },
            error: function () {
                this.setState({load: true, error: true});
            }
        });
    },
    loadVideo: function (cid, quality) {
        var height = 500;
        var width = 900;
        if (window.innerHeight) {
            height = window.innerHeight * 0.7;
        }
        var element = document.getElementById('video-container');
        if (element != null) {
            width = element.offsetWidth;
        }

        $.ajax({
            method: 'get',
            url: Lib.BaseUrl + '/video/' + cid + '/' + quality,
            context: this,
            success: function (data) {
                this.setState({
                    width: width,
                    height: height,
                    videoUrl: data.url,
                    danmuUrl: 'http://comment.bilibili.com/' + cid + '.xml',
                    playerLoad: true
                });
            },
            error: function () {
                this.setState({width: width, height: height, error: true, playerLoad: true});
            }
        });
    },
    //初始化
    componentDidMount: function () {
        this.loadInfo();
    },
    //菜单点击监听
    handleClick: function (nav, index, e) {
        if (nav && nav.subMenu) {
        } else {
            e.preventDefault();
            if (index[0] == 0) {
                this.loadVideo(this.state.cid, index[1] + 1);
            }
        }
    },
    partSelect: function (cid) {
        this.setState({playerLoad: false});
        this.loadVideo(cid, 1);
    },
    render: function () {
        var data = [{
            link: '##',
            title: '清晰度',
            subCols: 3,
            subMenu: [{link: '##', title: '低清'}, {link: '##', title: '高清'}, {link: '##', title: '原画'}]
        }];
        if (this.state.error) {
            return <Lib.ErrorWidght />
        }
        return (this.state.load) ?
            <div style={styles.top1}><Pagination parts={this.state.partList} now={this.state.cid} handler={this.partSelect}/>
                <AMU.Menu cols={2} data={data} theme='dropdown2' onSelect={this.handleClick}/>
                {this.state.playerLoad ?
                    <Player src={ this.state.videoUrl }
                            width={ this.state.width }
                            height={ this.state.height }
                            danmu={ this.state.danmuUrl }
                            poster={ this.state.data.pic }/> :
                    <Lib.LoadingWidght />}
                <VideoInfo data={this.state.data}/>
            </div> :
            <div style={styles.top}><Lib.LoadingWidght /></div>;
    }
});


export default React.createClass({
    render: function () {
        return <AMU.Grid>
            <AMU.Col md={8} mdOffset={2} id='video-container'>
                <VideoPart aid={ this.props.params.aid }/>
            </AMU.Col>
        </AMU.Grid>;
    }
});
