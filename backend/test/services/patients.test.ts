import app from '../../src/app';

describe('\'patients\' service', () => {
  it('registered the service', () => {
    const service = app.service('patients');
    expect(service).toBeTruthy();
  });
});
