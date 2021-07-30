import { handler } from '../services/finder-table/create';

const event = {
  body: {
    location: 'Indonesia',
  },
};

handler(event as any, {} as any);
