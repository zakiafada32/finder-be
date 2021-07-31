import { handler } from '../services/SpaceTable/Create';

const event = {
  body: {
    location: 'Indonesia',
  },
};

handler(event as any, {} as any);
