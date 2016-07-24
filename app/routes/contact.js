import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('contact');
  },

  actions: {

    sendMessage(newContact) {
      newContact.save().then(() => this.controller.set('responseMessage', true));
    },

    willTransition() {
      this.controller.get('model').rollbackAttributes();
    }
  }
});
