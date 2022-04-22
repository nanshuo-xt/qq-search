function query(data){
  let result = JSON.parse(JSON.stringify(data));

  var obj = {
      where: (fn) => {
          result = result.filter(fn)
          return obj
      },
      orderBy: (type) => {
          result = result.sort((a,b) => {
              return a[type] - b[type]
          })
          return obj
      },
      groupBy: (type) => {
          var groups = {}
          result.forEach(item=>{
              if(groups[item[type]]){
                  groups[item[type]].push(item)
              }else{
                  groups[item[type]] = [item]
              }
          })
  
          result = Object.values(groups)
          
          return obj
      },
      execute: () => {
          return result
      }
      
  }

  return obj
  
}

var data = [
{ name: 'foo', age: 16, city: 'shanghai' },
{ name: 'bar', age: 24, city: 'hangzhou' },
{ name: 'fiz', age: 22, city: 'shanghai' },
{ name: 'baz', age: 19, city: 'hangzhou' }
];

query(data)
  .where(item => item.age > 18)
.orderBy('age')
.groupBy('city')
.execute();
