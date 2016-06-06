import Ember from 'ember';

export default Ember.Controller.extend({

  emailAddress: '',
  message: '',

  isValid: Ember.computed('emailAddress', 'message', function() {
    return this.get('message') !== "" && !!this.get('emailAddress').match(/^.+@.+\..+$/);
  }),
  isDisabled: Ember.computed.not('isValid'),

  actions: {

    sendMessage() {
      this.set('responseMessage', "Thank you for sending us a message!");
      this.set('message', '');
      this.set('emailAddress', '');
    }

  }
});
