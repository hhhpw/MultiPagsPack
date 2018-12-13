// import Mock from 'mockjs';
const Mock = require('mockjs');
const Random = Mock.Random;

Mock.mock('/mock/test', 'get', function(opts) {
    return opts.type;
})

Mock.mock('/api/mock/A', 'get', {
    'counter|0-9': 1,
    'name': 'leo',
    'desc': {
        'age': 15,
        'sex': 'male',
        'favorite': 'female',
    }
})


Mock.mock('/mock/B', 'post', function(opts) {
    console.log('opts', opts);
    return {
        'desc': {
            'age': 15,
            'sex': 'male',
            'favorite': 'female',
        }
    }
})



Mock.mock('/mock/C', 'get', {
    name: {
        first: '@FIRST',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
})

Mock.mock('/mock/D', 'get', Random.image('200x100', '#4A7BF7', 'Hello'))