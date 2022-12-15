const people = [
    { name: "Alice", age: 21 },
    { name: "Max", age: 20 },
    { name: "Alice", age: 20 },
    { name: "Max", age: 20 },
    { name: "Max", age: 22 },
    { name: "John", age: 20 },
  ];
  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      const curGroup = acc[key] ?? [];
  
      return { ...acc, [key]: [...curGroup, obj] };
    }, {});
  }
  
  const groupedPeople = groupBy(people, "name");
//   console.log(groupedPeople);
let newData = []
  for(var i in groupedPeople){
    // console.log(groupedPeople[i])
    newData.push(groupedPeople[i])
    
  }
  console.log("1111", newData)
  