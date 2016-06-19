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
      const email = this.get('emailAddress');
      const message = this.get('message');
      const newContact = this.store.createRecord('contact', { email: email, message: message });

      newContact.save().then((response) => {
        this.set('responseMessage', `Thank you for sending us a message! Reciept # is: ${response.get('id')}`);
        this.set('message', '');
        this.set('emailAddress', '');
      });
    }
  }
});
