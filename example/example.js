void function () {
  'use strict';

  horse(document.querySelector('#hy'), {
    suggestions: ['banana', 'apple', 'orange']
  });

  horse(document.querySelector('#kv'), {
    suggestions: [
      { value: 'banana', text: 'Bananas from Amazon Rainforest' },
      { value: 'apple', text: 'Red apples from New Zealand' },
      { value: 'orange', text: 'Oranges from Moscow' },
      { value: 'lemon', text: 'Juicy lemons from the rich Amalfitan Coast' }
    ]
  });

  horse(document.querySelector('#event'), {
    suggestions: [
      { value: 'banana', text: 'Bananas from Amazon Rainforest' },
      { value: 'apple', text: 'Red apples from New Zealand' },
      { value: 'orange', text: 'Oranges from Moscow' },
      { value: 'lemon', text: 'Juicy lemons from the rich Amalfitan Coast' }
    ],
    onselect: function(li, suggestion) {
      alert("you select " + suggestion['text']);
    }
  });

  horse(document.querySelector('#il'), {
    suggestions: [
      { value: 'banana', text: 'Bananas from Amazon Rainforest' },
      { value: 'banana-boat', text: 'Banana Boat' },
      { value: 'apple', text: 'Red apples from New Zealand' },
      { value: 'apple-cider', text: 'Red apple cider beer' },
      { value: 'orange', text: 'Oranges from Moscow' },
      { value: 'orange-vodka', text: 'Classic vodka and oranges cocktali' },
      { value: 'lemon', text: 'Juicy lemons from Amalfitan Coast' }
    ],
    limit: 2
  });

  horse(document.querySelector('#locale'), {
    suggestions: [
      { value: 'javascript', text: 'js全栈开发者' },
      { value: 'python', text: '珍爱生命，我用python' },
      { value: 'php', text: 'PHP是世界上最好的语言，没有之一' },
      { value: 'java', text: '我的最爱是java' }
    ]
});
}();
