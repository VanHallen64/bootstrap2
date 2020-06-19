import { Application } from '../declarations';
import patients from './patients/patients.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(patients);
}
