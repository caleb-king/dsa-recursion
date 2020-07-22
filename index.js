// 1. Counting Sheep

function countingSheep(numberOfSheep) {
  if (numberOfSheep === 0) {
    return 'All sheep jumped over the fence';
  }
  return `${numberOfSheep}: Another sheep jumps over the fence\n${countingSheep(
    numberOfSheep - 1
  )}`;
}

// 2. Power Calculator

function powerCalculator(base, exponent) {
  if (exponent < 0) {
    return 'exponent should be >= 0';
  }
  if (exponent === 0) {
    return 1;
  }
  if (exponent === 1) {
    return base;
  }
  return base * powerCalculator(base, exponent - 1);
}

// 3. Reverse String

function reverseString(inputString) {
  if (inputString.length === 1) {
    return inputString;
  }
  const lastCharacter = inputString[inputString.length - 1];
  const stringWithLastCharRemoved = inputString.slice(
    0,
    inputString.length - 1
  );
  return lastCharacter + reverseString(stringWithLastCharRemoved);
}

// 4. nth Triangular Number

function nthTriangularNumber(n) {
  if (n <= 0) {
    return 'n should be >= 0';
  }
  if (n === 1) {
    return 1;
  }
  return n + nthTriangularNumber(n - 1);
}

// 5. String Splitter

function stringSplitter(inputString, separator, inputArr) {
  const currentArr = !inputArr ? [] : inputArr;
  const index = inputString.indexOf(separator);
  if (index === -1) {
    currentArr.push(inputString);
    return currentArr;
  }
  const stringBefore = inputString.slice(0, index);
  const stringAfter = inputString.slice(index + 1, inputString.length);
  currentArr.push(stringBefore);
  return stringSplitter(stringAfter, separator, currentArr);
}

// 6. Fibonacci

function fibonacci(n, inputSequence, currentNum) {
  const currentSequence = !inputSequence ? [] : inputSequence;
  if (n <= 0) {
    return 'n should be >= 0';
  }
  if (n === 1) {
    if (currentSequence.length === 0) {
      return 1;
    }
    currentSequence.push(currentNum);
    return currentSequence.join(', ');
  }
  if (currentSequence.length === 0) {
    currentSequence.push(1);
    return fibonacci(n - 1, currentSequence, 1);
  }

  // add the previous number to the sequence
  currentSequence.push(currentNum);

  // calculate the next number in the sequence
  const precedingNumIndex1 = currentSequence.length - 1;
  const precedingNumIndex2 = currentSequence.length - 2;
  const nextNum =
    currentSequence[precedingNumIndex1] + currentSequence[precedingNumIndex2];

  return fibonacci(n - 1, currentSequence, nextNum);
}

// 7. Factorial
// Write a recursive function that finds the factorial of a given number. The factorial of a number can be found by multiplying that number by each number between itself and 1. For example, the factorial of 5 is 5 * 4 * 3 * 2 * 1 = 120.

function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

// 8. Find a way out of the maze

const mySmallMaze = [
  [' ', ' ', ' '],
  [' ', '*', ' '],
  [' ', ' ', 'e'],
];

const myBigMaze = [
  [' ', ' ', ' ', '*', ' ', ' ', ' '],
  ['*', '*', ' ', '*', ' ', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', '*', '*', '*', '*', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', 'e'],
];

function convertNumericalMoveToLetter(numericalMove) {
  if (numericalMove === 0) return 'U';
  if (numericalMove === 1) return 'R';
  if (numericalMove === 2) return 'D';
  if (numericalMove === 3) return 'L';
  return 'not a valid numericalMove';
}

function isValidMove(maze, location, previouslyVisited) {
  const n = location[0];
  const m = location[1];

  // IF new cell is outside maze - return false;
  if (n < 0 || m < 0 || n >= maze.length || m >= maze[0].length) {
    return false;
  }

  // IF new cell is blocked - return false;
  if (maze[n][m] === '*') {
    return false;
  }

  // IF cell has been previously visited - return false;
  let hasBeenVisited = false;
  previouslyVisited.forEach(previousLocation => {
    if (previousLocation[0] === n && previousLocation[1] === m)
      hasBeenVisited = true;
  });
  if (hasBeenVisited) {
    return false;
  }

  // ELSE return true;
  return true;
}

function findValidMoves(maze, currentState, nextMove) {
  const n = currentState.location[0];
  const m = currentState.location[1];
  const validMoves = [];

  if (nextMove === 0) {
    const above = [n - 1, m];
    if (isValidMove(maze, above, currentState.previouslyVisited))
      validMoves.push(0);
  }
  if (nextMove <= 1) {
    const toTheRight = [n, m + 1];
    if (isValidMove(maze, toTheRight, currentState.previouslyVisited))
      validMoves.push(1);
  }
  if (nextMove <= 2) {
    const below = [n + 1, m];
    if (isValidMove(maze, below, currentState.previouslyVisited))
      validMoves.push(2);
  }
  if (nextMove <= 3) {
    const toTheLeft = [n, m - 1];
    if (isValidMove(maze, toTheLeft, currentState.previouslyVisited))
      validMoves.push(3);
  }

  return validMoves;
}

function makeMove(maze, state, move) {
  // console.log(`make move ran. move = ${move}`);
  state.previouslyVisited.push(state.location);
  state.moves.push(move);

  let n = state.location[0];
  let m = state.location[1];

  if (move === 0) n -= 1; // U
  if (move === 1) m += 1; // R
  if (move === 2) n += 1; // D
  if (move === 3) m -= 1; // L

  state.location = [n, m];
}

function goToLastFork(maze, state) {
  // console.log('goToLastFork ran.');
  const lastForkIndex = state.forks.pop();
  const lastForkLocation = state.previouslyVisited[lastForkIndex];
  const nextMove = state.moves[lastForkIndex] + 1;

  state.moves = state.moves.slice(0, lastForkIndex);
  state.location = lastForkLocation;
  state.previouslyVisited = state.previouslyVisited.slice(0, lastForkIndex);

  // console.log('moves after goToLastFork: ', state.moves);
  // console.log(
  //   'previouslyVisited after goToLastFork: ',
  //   state.previouslyVisited
  // );

  allExitPaths(maze, state, nextMove);
}

function allExitPaths(maze, state, nextMove = 0) {
  // console.log('allExitPaths ran');
  // initialize state
  const currentState = !state
    ? {
        previouslyVisited: [],
        moves: [],
        location: [0, 0],
        forks: [],
        validExitPaths: [],
      }
    : state;

  // console.log('currentState:', currentState);
  // console.log('LOCATION', currentState.location);
  // console.log('nextMove: ', nextMove);

  if (maze[currentState.location[0]][currentState.location[1]] === 'e') {
    // console.log('currently @ exit');
    const validExitPath = currentState.moves
      .map(move => convertNumericalMoveToLetter(move))
      .join('');
    currentState.validExitPaths.push(validExitPath);
    if (currentState.forks.length === 0) {
      return state.validExitPaths;
    }
    goToLastFork(maze, state);
  }

  const validMoves = findValidMoves(maze, currentState, nextMove);
  if (validMoves.length > 1) {
    // console.log(`adding fork to state - ${currentState.moves.length}`);
    currentState.forks.push(currentState.moves.length);
  }
  if (validMoves.length === 0) {
    // console.log(`dead end at ${currentState.location}`);
    if (currentState.forks.length === 0) {
      return state.validExitPaths;
    }
    goToLastFork(maze, state);
  }

  makeMove(maze, currentState, validMoves[0]);

  return allExitPaths(maze, currentState);
}

// console.log('mySmallMaze: ', mySmallMaze);
// console.log('maze result: ', allExitPaths(mySmallMaze));

// 10. Anagrams

function shift(string) {
  return string.slice(1, string.length) + string[0];
}

function getShiftedPermutationsArr(string) {
  const permutations = [];
  let tempString = string;
  for (let i = 0; i < string.length; i += 1) {
    permutations.push(tempString);
    tempString = shift(tempString);
  }
  return permutations;
}

const findAnagrams = inputString => {
  const anagrams = [];
  const findAnagramsRecursively = (string, precedingString = '') => {
    if (string.length === 1) {
      const baseReturnValue = precedingString + string;
      anagrams.push(baseReturnValue);
    }
    const permutations = getShiftedPermutationsArr(string);
    permutations.forEach(permutation => {
      const nextString = permutation.slice(1, permutation.length);
      const currentPrecedingString = precedingString + permutation[0];
      findAnagramsRecursively(nextString, currentPrecedingString);
    });
  };
  findAnagramsRecursively(inputString);
  return anagrams;
};

// console.log(findAnagrams('happy'));

// 11. Organization Chart

const facebookOrgChart = {
  Zuckerberg: {
    Schroepfer: {
      Bosworth: {
        Steve: {},
        Kyle: {},
        Andra: {},
      },
      Zhao: {
        Richie: {},
        Sofia: {},
        Jen: {},
      },
    },
    Schrage: {
      VanDyck: {
        Sabrina: {},
        Michelle: {},
        Josh: {},
      },
      Swain: {
        Blanch: {},
        Tom: {},
        Joe: {},
      },
    },
    Sandberg: {
      Goler: {
        Eddie: {},
        Julie: {},
        Annie: {},
      },
      Hernandez: {
        Rowi: {},
        Inga: {},
        Morgan: {},
      },
      Moissinac: {
        Amy: {},
        Chuck: {},
        Vinni: {},
      },
      Kelley: {
        Eric: {},
        Ana: {},
        Wes: {},
      },
    },
  },
};

// console.log('facebookOrgChart: ', facebookOrgChart);

// const orgOutputArr = [
//   [0, 'Zuckerberg'],
//   [1, 'Schroepfer'],
//   [2, 'Bosworth'],
//   [3, 'Steve'],
//   [3, 'Kyle'],
//   [3, 'Andra'],
//   [2, 'Zhao'],
//   [3, 'Richie'],
//   [3, 'Sofia'],
//   [3, 'Jen'],
//   [1, 'Schrage'],
//   [2, 'VanDyck'],
//   [3, 'Sabrina'],
//   [3, 'Michelle'],
//   [3, 'Josh'],
//   [2, 'Swain'],
//   [3, 'Blanch'],
//   [3, 'Tom'],
//   [3, 'Joe'],
// ];

function printOrgChart(orgArr) {
  const processedOrgArr = orgArr.map(rankAndName => {
    const numSpaces = rankAndName[0] * 4;
    const name = rankAndName[1];
    return `${' '.repeat(numSpaces)}${name}`;
  });
  return processedOrgArr.join('\n');
}

function getOrgChart(inputOrgChart) {
  const orgArr = [];

  function getOrgChartArrRecursively(orgChart, rank = 0) {
    const currentRankKeys = Object.keys(orgChart);
    currentRankKeys.forEach(key => {
      orgArr.push([rank, key]);
      const directReports = Object.keys(orgChart[currentRankKeys[0]]);
      if (directReports.length > 0) {
        const reducedOrgChart = orgChart[key];
        getOrgChartArrRecursively(reducedOrgChart, rank + 1);
      }
    });
  }

  getOrgChartArrRecursively(inputOrgChart);
  return printOrgChart(orgArr);
}

// console.log(
//   `getOrgChart ran resulting in:\n\n${getOrgChart(facebookOrgChart)}`
// );

// 12. Binary Representation

function convertDecimalToBinary(inputDecimalNum) {
  const binaryNum = [];

  function convertDecimalToBinaryRecursively(decimalNum) {
    const quotient = Math.floor(decimalNum / 2);
    const remainder = decimalNum % 2;
    binaryNum.unshift(remainder);
    if (quotient > 0) {
      convertDecimalToBinaryRecursively(quotient);
    }
  }
  convertDecimalToBinaryRecursively(inputDecimalNum);
  return binaryNum.join('');
}

// console.log(convertDecimalToBinary(78));
