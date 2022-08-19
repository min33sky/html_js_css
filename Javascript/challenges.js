// BEGINNER CHALLENGES (unless otherwise stated, use the names array in all challenge points)
const names = ['Derek', 'Joe', 'Anna', 'Coen', 'Chris', 'Macey', 'Ella'];

// 1. Add a name to the beginning of the names array
names.unshift('John');

// 2. Add a name to the end of the names array
names.push('Paul');

// 3. Remove the name you added to the beginning of the names array
names.shift();

// 4. Remove the name you added to the end of the names array (return the name to an original)
names.pop();

// 5. Create a new array called "lowercasedNames" with each name lowercased
const lowercased = names.map((name) => name.toLowerCase());

// 6. Sort the names array alphabetically
names.sort();
names.sort((a, b) => a.localeCompare(b));

// 7. Find the index of "Chris"
names.indexOf('Chris');

// 8. Create a new array called "afterChris" with all names after "Chris" in the names array
const afterChris = names.slice(names.indexOf('Chris') + 1);

// 9. Alter the original array to only contain the names before "Chris"
const beforeChris = names.splice(names.indexOf('Chris'));

// 10. Return "true" if the names array contains "Chris" and "false" if it does not (hint: it should be false now
names.includes('Chris');

console.log(names);

// INTERMEDIATE CHALLENGES (unless otherwise stated, use the peeps array in all challenge points)
const peeps = [
  {
    id: 1,
    name: 'Chris',
    age: 24,
    favoriteNumbers: [1, 4, 8, 12, 32],
  },
  {
    id: 2,
    name: 'Terrance',
    age: 37,
    favoriteNumbers: [2, 8, 9],
  },
  {
    id: 3,
    name: 'Megan',
    age: 22,
    favoriteNumbers: [23, 14],
  },
  {
    id: 4,
    name: 'Juan',
    age: 18,
    favoriteNumbers: [23, 14, 2],
  },
  {
    id: 5,
    name: 'Tina',
    age: 42,
    favoriteNumbers: [12, 9, 1, 4, 18],
  },
  {
    id: 6,
    name: 'Lin',
    age: 24,
    favoriteNumbers: [3, 9],
  },
];

// 1. Add a boolean property "isAwesome" for each peep and set it to "true" if the person has at least 3 favorite numbers (or false if not).
peeps.forEach((peep) => (peep.isAwesome = peep.favoriteNumbers.length >= 3));

// 2. Return a new array called "youngPeeps" with peeps 25 or younger.
const youngPeeps = peeps.filter((peep) => peep.age <= 25);
console.table(youngPeeps);

// 3. Sort the favoriteNumbers property from least to greatest for each peep in the peeps array
peeps.forEach((peep) => peep.favoriteNumbers.sort((a, b) => a - b));
console.table(peeps);

// 4. Return "true" if every person has an age below 50 and "false" if not.
const r4 = peeps.every((peep) => peep.age < 50);
console.log(r4);

// 5. Create a function called "findPeep" that returns the peep for an ID passed in and returns "not found" if the peep does not exist. Call it for an id that exists and one that does not.
function findPeep(id) {
  const peep = peeps.find((peep) => peep.id === id);
  if (peep) {
    return peep;
  }
  return 'not found';
}

// 6. Create a new array called "reversedPeeps" with the peeps array order reversed
const reversedPeeps = [...peeps].reverse();
console.table(reversedPeeps);

// 7. Add an additional property on each peep object called favoriteNumbersSum with a single number value which equals the total of all their favorite numbers.
peeps.forEach(
  (peep) =>
    (peep.favoriteNumbersSum = peep.favoriteNumbers.reduce((a, b) => a + b))
);

// 8. Create a new array called "numberOnePeeps" with all people that include a favorite number of "1". Include only their names and ids in the new array.
const numberOnePeeps = peeps
  .filter((peep) => peep.favoriteNumbers.includes(1))
  .map((item) => ({
    id: item.id,
    name: item.name,
  }));
console.table(numberOnePeeps);

// 9. Combine all peeps from the numberOnePeeps (#8 above) which are also in the youngPeeps (#2 above) array into a new array called "freshPeeps". Include peeps with unique ids only from the youngPeeps array.
const freshPeeps = numberOnePeeps.filter((peep) =>
  youngPeeps.some((youngPeep) => youngPeep.id === peep.id)
);
console.table(freshPeeps);

// 10. Return a single value representing the total of all favoriteNumbers for anyone with the isAwesome property set to "true" (HINT: should be 159).
const totalOfAllFavoriteNumbers = peeps
  .filter((peep) => peep.isAwesome)
  .reduce((a, b) => a + b.favoriteNumbersSum, 0);

console.log(totalOfAllFavoriteNumbers);

console.table(peeps);
