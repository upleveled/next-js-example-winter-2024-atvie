import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import postgres, { Sql } from 'postgres';
import { setEnvironmentVariables } from '../util/config';

setEnvironmentVariables();

declare module globalThis {
  let postgresSqlClient: Sql;
}

// Connect only once to the database
// https://github.com/vercel/next.js/discussions/26427#discussioncomment-898067
function connectOneTimeToDatabase() {
  if (!('postgresSqlClient' in globalThis)) {
    globalThis.postgresSqlClient = postgres({
      transform: {
        ...postgres.camel,
        undefined: null,
      },
    });
  }

  // Use Next.js Dynamic Rendering in all database queries:
  //
  // Wrap sql`` tagged template function to call `noStore()` from
  // next/cache before each database query. `noStore()` is a
  // Next.js Dynamic Function, which causes the page to use
  // Dynamic Rendering
  //
  // https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering
  return ((
    ...sqlParameters: Parameters<typeof globalThis.postgresSqlClient>
  ) => {
    noStore();
    return globalThis.postgresSqlClient(...sqlParameters);
  }) as typeof globalThis.postgresSqlClient;
}

export const sql = connectOneTimeToDatabase();
