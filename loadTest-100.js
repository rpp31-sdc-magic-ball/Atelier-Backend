import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 }, // below normal load
    { duration: '1m', target: 0 },
  ],
};

export default function () {
  const BASE_URL = 'http://127.0.0.1:3055'; // make sure this is not production

  const responses = http.batch([
    ['GET', `${BASE_URL}/qa/questions?product_id=1&count=100`, null, { tags: { name: 'sdc-questions' } }],
  ]);

  sleep(1);
}

