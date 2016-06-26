import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('book');
  },

  actions: {

    editBookTitle(book) {
      book.set('isEditingTitle', true);
    },

    cancelBookTitleEdit(book) {
      book.set('isEditingTitle', false);
      book.rollbackAttributes();
    },

    saveBookTitle(book) {
      if (book.get('isNotValidTitle')) {
        return;
      }

      book.set('isEditingTitle', false);
      book.save();
    }
  }
});
