Node Wrapper For Stackby Api

# Installation

```bash npm i stackby-node-dev --save ```

# Usage

```bash

const Stackby = require('stackby-node-dev');

const stackby = new Stackby({ apiKey: 'xxx', stack: 'sttcTFaReuoGZ2BoBT', table: 'Table 1' });

        OR

const stackby = new Stackby({ apiKey: 'xxx'}).stack('sttcTFaReuoGZ2BoBT').table('Table 1');

stackby.list().then(resp => {
  console.log(resp)
})

```