import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Faker from 'faker';
import Ember from 'ember';

export default Model.extend({
  title: attr('string'),
  releaseDate: attr('date'),

  library: belongsTo('library', { inverse: 'books', async: true }),
  author: belongsTo('author', { inverse: 'books', async: true }),

  isNotValidTitle: Ember.computed.empty('title'),

  randomize(author, library) {
    this.set('title', this._bookTitle());
    this.set('author', author);
    this.set('releaseDate', Faker.date.past(100, new Date()));
    this.set('library', library);

    return this;
  },

  _bookTitle() {
    return `${Faker.commerce.productName()} Ed. ${parseInt(this._getRandomArbitrary(1, 50))}`;
  },

  _getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
});
