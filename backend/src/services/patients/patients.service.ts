// Initializes the `patients` service on path `/patients`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Patients } from './patients.class';
import hooks from './patients.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'patients': Patients & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/patients', new Patients(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('patients');

  service.hooks(hooks);
}
