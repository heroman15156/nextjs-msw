import { setupWorker } from 'msw/browser';
import { handlers } from '@/__mocks__/handlers';

const worker = setupWorker(...handlers);
export default worker;
