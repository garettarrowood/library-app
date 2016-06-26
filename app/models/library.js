import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Ember from 'ember';
import Faker from 'faker';

export default Model.extend({
  name: attr('string'),
  address: attr('string'),
  phone: attr('string'),

  books: hasMany('book', {inverse: 'library', async: true}),

  isValid: Ember.computed.notEmpty('name'),

  randomize() {
    this.set('name', Faker.name.lastName() + ' ' + Faker.name.jobDescriptor() + ' Library');
    this.set('address', Faker.address.streetAddress(true));
    this.set('phone', Faker.phone.phoneNumber());

    return this;
  }
});
