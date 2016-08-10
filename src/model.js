import {observable, computed, toJS} from 'mobx';

let cid = 0;

export default class Model
{
  @observable cid = ++cid;
  @observable name = "";
  @observable created = new Date();
  @observable _checked = false;
  @observable items = [];

  owner = null; /* circular reference prevents simple serializing */

  constructor(owner) {
    this.owner = owner;
  }

  @computed
  get isSubitemsChecked() {
    if(this.items.length)
      return this.items.every(item => item.isSubitemsChecked);

    return this._checked;
  }

  /*  use two getters since computed property cannot have setter */
  get checked() {
    return this.isSubitemsChecked;
  }

  set checked(checked) {
    this._checked = checked;
    this.items.map(item => item.checked = checked)
  }

  remove() {
    this.owner.items.replace(
      this.owner.items.filter(i => i != this)
    );
  }

  add() {
    this.items.push(new Model(this));
  }
}