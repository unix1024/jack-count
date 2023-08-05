'use babel';

import JackCountView from './jack-count-view';
import { CompositeDisposable } from 'atom';

export default {

  jackCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.jackCountView = new JackCountView(state.jackCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jackCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jack-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jackCountView.destroy();
  },

  serialize() {
    return {
      jackCountViewState: this.jackCountView.serialize()
    };
  },

  toggle() {
    console.log('JackCount was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
