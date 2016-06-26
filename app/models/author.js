import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Faker from 'faker';

export default Model.extend({
  name: attr('string'),

  books: hasMany('book', {inverse: 'author', async: true}),

  randomize() {
    this.set('name', Faker.name.findName());
    return this;
  }

});
