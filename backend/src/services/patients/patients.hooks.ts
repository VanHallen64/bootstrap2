
import validatePatient from '../../hooks/validate-patient';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [validatePatient()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
