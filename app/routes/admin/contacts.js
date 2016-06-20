import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('contact');
  },

  actions: {

    deleteContact(contact) {
      let confirmation = confirm('Are you sure you want to delete this contact?');

      if (confirmation) {
        contact.destroyRecord();
      }
    }
  }  
});
