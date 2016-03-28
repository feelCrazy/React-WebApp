/**
 * Created by ming on 2016/3/14.
 */
import React from 'react';
import  {ListItem,List} from 'material-ui';
import {Link} from 'react-router';
import Lib from '../tool/Lib';
const Sort = React.createClass({

        render()
        {
            var list = [];

            for (let key in Lib.Sorts) {
                if (Lib.Sorts.hasOwnProperty(key)) {
                    let link = '/sortList/' + key; //跳转链接
                    /*{{pathname:'/so',query:{mid:key}}}*/
                    list.push(<ListItem linkButton={true} key={key}
                                        containerElement={<Link to={link} />}
                                        primaryText={Lib.Sorts[key]}/>)
                }
            }

            return (
                <div>
                    <List>{list}</List>
                </div>
            );
        }
    })
    ;

export default Sort;
