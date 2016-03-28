/**
 * Created by ming on 2016/3/10.
 */
import React from 'react';
import {render} from  'react-dom';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App';
import SortList from './components/SortList';
import Sort from './components/Sort'
import Rank from './components/Rank';
//import Video from './components/Video';
import Video1 from './components/Video1'
import IndexInfo from './components/IndexInfo'

injectTapEventPlugin();

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={IndexInfo}/>
            <Route path="/rank" component={Rank}/>
            <Route path="/sort" component={Sort}/>
            <Route path="/sortList/:mid" component={SortList}/>
            <Route path="/play/:aid" component={Video1}/>
        </Route>
    </Router>,
    document.getElementById('root'));