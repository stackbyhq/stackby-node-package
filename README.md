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

# Create

stackby.create([{
            "field": {
              "Name":"New Record",
              "Phone":"9999999999",
              "link":["rw1562824087136c5b34e"]
            }
          }]).then(resp => {
  console.log(resp)
})


# Update

stackby.update([{
		   "id": "rw1588158082070fb8b57",
				"field": {
					"Name":"Update Row",
					"Note": "Test the big test",
					"Phone":"9022114477"
				}
		}]).then(resp => {
  console.log(resp)
})

# Retrive Single 

stackby.retrieve(['rw158108273052769fbf5']).then(resp => {
  console.log(resp)
})


# Delete

stackby.delete(['rw15628240845663015']).then(resp => {
  console.log(resp)
})


```