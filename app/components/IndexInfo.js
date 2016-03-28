/**
 * Created by ming on 2016/3/17.
 */

/**
 * Created by ming on 2016/3/20.
 */
import React from 'react';
import AMUI from 'amazeui-react';
import {Toolbar,ToolbarTitle,Paper} from 'material-ui';
import Lib from '../tool/Lib';
import {Link} from 'react-router';
const styles = {
    top: {
        marginTop: 60
    },
    toolBar: {
        maxHeight: 50
    }

};

const IndexPage = React.createClass({
    render () {
        var data = this.props.data;
        var banners = data.banners;
        var bannerInsert = [];
        for (var i = 0; i < banners.length; i++) {
            bannerInsert.push({img: banners[i].img, desc: banners[i].title, aid: banners[i].aid});
        }
        var recommands = data.recommends;
        var videosInsert = [];
        for (var j = 0; j < recommands.length; j++) {
            videosInsert.push({
                img: recommands[j].pic,
                link: '/play/' + recommands[j].aid,
                title: recommands[j].title,
                desc: '点击:' + recommands[j].play + '||弹幕:' + recommands[j].video_review
            });
        }
        return <AMUI.Grid>
            <AMUI.Col md={8} mdOffset={2}>
                <AMUI.Slider>
                    {bannerInsert.map(function (item, i) {
                        let link = '/play/' + item.aid; //跳转链接
                        return (
                            <AMUI.Slider.Item key={i}>
                                <div>
                                    <Link to={link}>
                                        <img src={item.img}/>
                                        <div className="am-slider-desc">
                                            {item.desc}
                                        </div>
                                    </Link>
                                </div>
                            </AMUI.Slider.Item>
                        );
                    })}
                </AMUI.Slider>
                <Toolbar style={styles.toolBar}>
                    <ToolbarTitle text="热门推荐"/>

                </Toolbar>

                <Paper zDepth={2}>
                    <AMUI.Gallery theme='imgbordered' data={videosInsert}/>
                </Paper>

            </AMUI.Col>
        </AMUI.Grid>
    }
});


export default React.createClass({
    loadingStartData () {
        $.ajax({
            method: 'get',
            url: Lib.BaseUrl + '/indexinfo',
            context: this,
            success (data) {
                if (data.code == 0) {
                    this.setState({load: true, data: data.result})
                } else {
                    this.setState({error: true, load: true});
                }
            },
            error() {
                this.setState({error: true, load: true});
            }
        });
    },
    getInitialState () {
        return {
            data: null,
            load: false,
            error: false
        }
    },
    render() {
        if (!this.state.load) {
            this.loadingStartData();
            return <Lib.StartWidght />;
        }

        if (this.state.error) {
            return <Lib.BadErrorWidght />;
        }
        return (
            <div>

                <section style={styles.top}>
                    {this.props.children ||
                    <div className="am-animation-slide-bottom"><IndexPage data={ this.state.data }/></div>}
                </section>
            </div>
        )
    }
});
