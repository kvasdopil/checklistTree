import './styles.css'

import React from 'react';
import ReactDOM from 'react-dom';

import {observer} from 'mobx-react';

import Model from './model';

let _renders = 0;

const App = observer(props =>
  <div>
    <div>Renders count: { ++_renders }
      <button onClick={() => props.store.add() }>
        Add children
      </button>
    </div>
    <div className='children'>
      <List items={props.store.items} />
    </div>
  </div>
)

const List = observer(props =>
  <div className='children'>
    {props.items.map((item, i) =>
      <Item key={i} model={item} />
    )}
  </div>
)

const Item = observer(props => {
  const model = props.model;

  return <div className='checklist'>
    <div className='header'>
      <Checkbox link={link(model, 'checked')} />
      <span className="created">{model.created.toLocaleTimeString()}</span>
      <Input link={link(model, 'name')} />
      <button onClick={() => model.remove()}>
        Delete
      </button>
      <button onClick={() => model.add()}>
        Add children
      </button>
    </div>
    <List items={model.items} />
  </div>
})

const link = (target, name) => ({
  set: (val) => target[name] = val,
  get: () => target[name]
})

const Checkbox = observer(props =>
  <input type='checkbox' checked={props.link.get()} onChange={a => props.link.set(a.target.checked)} />
)

const Input = observer(props =>
  <input value={props.link.get()} onChange={a => props.link.set(a.target.value)} />
)

const store = new Model();

ReactDOM.render(<App store={store} />, document.getElementById('root'));
