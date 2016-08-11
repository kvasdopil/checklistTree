import './styles.css'

import React from 'react';
import ReactDOM from 'react-dom';

import {observer} from 'mobx-react';

import Model from './model';
import {link, Checkbox, Input} from './link';

let _renders = 0;

@observer
class App extends React.Component {
  componentWillMount() {

    try {
      this.props.store.load(
        JSON.parse(localStorage.getItem('checklist') || "{}")
      );
    } catch(e) {}

    window.onunload = () => {
      localStorage.setItem('checklist', JSON.stringify(
        this.props.store.save()
      ));
    }
  }

  render() {
    const {store} = this.props;

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

const store = new Model();

ReactDOM.render(<App store={store} />, document.getElementById('root'));
