// import React from 'react'
// import { Card, Fetch, Button, Icon, Carousel, Input, Select, Checkbox, Radio, Form } from 'fego'
import { Fetch } from 'fego';
// import { Fetch} from 'fego'
Fetch.get('/test/table').then((data) => {
  console.log(data);
}).catch((error) => {
  console.error(error);
});
