import React from 'react';
import {observer} from 'mobx-react';

export const link = (target, name) => ({
  set: (val) => target[name] = val,
  get: () => target[name]
})

export const Checkbox = observer(props =>
  <input type='checkbox' checked={props.link.get()} onChange={a => props.link.set(a.target.checked)} />
)

export const Input = observer(props =>
  <input value={props.link.get()} onChange={a => props.link.set(a.target.value)} />
)