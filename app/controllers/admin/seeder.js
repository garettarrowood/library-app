import Ember from 'ember';
import Faker from 'faker';

export default Ember.Controller.extend({

  libraries: [],
  books: [],
  authors: [],

  actions: {

    generateLibraries() {
      const counter = parseInt(this.get('librariesCounter'));

      for (let i = 0; i < counter; i++) {
        this.store.createRecord('library').randomize().save().then(() => {
          if (i === counter-1) {
            this.set('librariesCounter', 0);
            this.set('libDone', true);
          }
        });
      }
    },

    deleteLibraries() {
      this.get('libraries').forEach((library) => {
        library.destroyRecord();
      });

      this.set('libDelDone', true);
    },

    generateBooksAndAuthors() {
      const counter = parseInt(this.get('authorCounter'));

      for (let i = 0; i < counter; i++) {
        let newAuthor = this.store.createRecord('author');
        newAuthor.randomize()
          .save().then(() => {
             if (i === counter-1) {
               this.set('authorCounter', 0);
               this.set('authDone', true);
             }
          }
        );

        this._generateSomeBooks(newAuthor);
      }
    },

    deleteBooksAndAuthors() {
      this.get('authors').forEach((author) => {
        Ember.RSVP.all(author.get('books').invoke("destroyRecord")).then(function(){
          author.destroyRecord();
        });
      });

      this.set('authDelDone', true);
    }
  },

  _generateSomeBooks(author) {
    const bookCounter = Faker.random.number(10);

    for (let j = 0; j < bookCounter; j++) {
      const library = this._selectRandomLibrary();
      this.store.createRecord('book')
        .randomize(author, library)
        .save();
      author.save();
      library.save();
    }
  },

  _selectRandomLibrary() {
    const libraries = this.get('libraries');
    const librariesCounter = libraries.get('length');

    // Create a new array from IDs
    const libraryIds = libraries.map((lib) => {return lib.get('id');});
    const randomNumber = Faker.random.number(librariesCounter-1);

    const randomLibrary = libraries.findBy('id', libraryIds[randomNumber]);
    return randomLibrary;
  }
});
