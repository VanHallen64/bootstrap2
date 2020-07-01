// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { app, data } = context;
    
    // Throw an error if we didn't get a first name
    if(!data.firstName) {
      throw new Error('A patient must have a first name');
    }    
    
    // Throw an error if we didn't get a last name
    if(!data.lastName) {
      throw new Error('A patient must have a last name');
    }    
    
    // The actual firstName
    const firstName = data.firstName
      // First name can't be longer than 20 characters
      .substring(0, 20);
      
    // The actual last name
    const lastName = data.lastName
      // Last name can't be longer than 20 characters
      .substring(0, 20);
      
    if ( data.lowestSysPressure < 30 || data.lowestSysPressure > 300 ) {
        var error = new Error('Lowest systolic blood pressure must be between 30 and 300');
        throw error;
    }

    if ( data.highestSysPressure < 30 || data.highestSysPressure > 300 ) {
        let error = new Error('Highest systolic blood pressure must be between 30 and 300');
        throw error;
    }
    
    const patients = await app.service('patients').find({
      query: {
        email: data.email
      }
    });
    
    // Throw an error if this is a duplicate email
    if(patients.total > 0) {
        let error = new Error('Email is already in the system');
        throw error;
    } 
    
    // Get rid of any stray properties
    context.data = {
      email: data.email,
      lowestSysPressure: data.lowestSysPressure,
      highestSysPressure: data.highestSysPressure,
    };
      
    return context;
  };
}
