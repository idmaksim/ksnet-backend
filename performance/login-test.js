import http from 'k6/http';
import { check } from 'k6';


export const options = {
  scenarios: {
    highLoad: {
      executor: 'constant-arrival-rate',
      rate: 300,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 50,
      maxVUs: 100,
    },
  },
};

const payload = {
  email: "string@gmail.com",
  password: "string",
};

const url = 'http://localhost:3000/api/auth/sign-in';

export default function () {
  const res = http.post(url, JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'status is 201': (r) => r.status === 201,
    'response format is correct': (r) => {
      const body = r.body;
      return (
        body?.includes('accessToken') &&
        body?.includes('refreshToken')
      );
    },
  });
}
