import './styles.css'

import React from 'react';
import ReactDOM from 'react-dom';

import {observer} from 'mobx-react';

import Model from './model';

let _renders = 0;

@observer
class App extends React.Component {
  render() {
    var store = this.props.store;

    return <div>
      <div>Renders count: { ++_renders }
        <button onClick={() => store.add() }>
          Add children
        </button>
      </div>
      <div className='children'>
        <List items={store.items} />
      </div>
    </div>
  }
}

@observer
class List extends React.Component
{
  render()
  {
    return <div className='children'>
      {this.props.items.map((item, i) =>
        <Item key={i} model={item} />
      )}
    </div>
  }
}

@observer
class Item extends React.Component {
  render() {
    const model = this.props.model;

    return <div className='checklist'>
      <div className='header'>
        <input type='checkbox' checked={model.checked} onChange={a => model.checked = a.target.checked} />
        <span className="created">{model.created.toLocaleTimeString()}</span>
        <input value={model.name} onChange={a => model.name = a.target.value} />
        <button onClick={() => model.remove()}>
          Delete
        </button>
        <button onClick={() => model.add()}>
          Add children
        </button>
      </div>
      <List items={model.items} />
    </div>
  }
}

const store = new Model();

ReactDOM.render(<App store={store} />, document.getElementById('root'));
