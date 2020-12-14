# prismic-once
Utils class with static methods to use Prismic API with cache.

## Dependencies
[prismic-javascript](https://github.com/prismicio/prismic-javascript)

React.js example:
```
import React, { useState } from 'react';

import PrismicOnce from './PrismicOnce';

function Hello() {
  PrismicOnce.init('https://myapp.cdn.prismic.io/api/v2');
  const [prismicGlobal, setPrismic] = useState(null);
  if (!prismicGlobal) {
    PrismicOnce.getSingle('global').then((result) => {
      setPrismic(result.data);
    });
    return 'waiting for Prismic content...';
  }
  return (
    <h1>prismicGlobal.hello</h1>
  );
}

export default Hello;
```
