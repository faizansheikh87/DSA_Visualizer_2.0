let array = [];
let isSearching = false;
const container = document.getElementById('array-container');
const speedControl = document.getElementById('speed');

const complexity = {
    linear: { time: 'O(n)', space: 'O(1)' },
    binary: { time: 'O(log n)', space: 'O(1)' },
    jump: { time: 'O(√n)', space: 'O(1)' },
    exponential: { time: 'O(log n)', space: 'O(1)' }
};

const algorithmCodes = {
    linear: `function linearSearch(arr, target) {
    for(let i=0; i<arr.length; i++) {
        if(arr[i] === target) return i;
    }
    return -1;
}`,
    binary: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while(left <= right) {
        const mid = Math.floor((left + right) / 2);
        if(arr[mid] === target) return mid;
        else if(arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    jump: `function jumpSearch(arr, target) {
    const step = Math.floor(Math.sqrt(arr.length));
    let prev = 0;
    while(arr[Math.min(step, arr.length) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(arr.length));
        if(prev >= arr.length) return -1;
    }
    while(arr[prev] < target) {
        prev++;
        if(prev === Math.min(step, arr.length)) return -1;
    }
    return arr[prev] === target ? prev : -1;
}`,
    exponential: `function exponentialSearch(arr, target) {
    if(arr[0] === target) return 0;
    let i = 1;
    while(i < arr.length && arr[i] <= target) i *= 2;
    return binarySearch(arr, target, i / 2, Math.min(i, arr.length));
}`
};

function updateComplexity() {
    const algo = document.getElementById('algorithm').value;
    document.getElementById('timeComplexity').textContent = complexity[algo].time;
    document.getElementById('spaceComplexity').textContent = complexity[algo].space;
    document.getElementById('algorithmCode').textContent = algorithmCodes[algo];
}

function generateNewArray() {
    const size = document.getElementById('size').value;
    array = Array.from({length: size}, () => Math.floor(Math.random() * 90) + 10);
    array.sort((a, b) => a - b); // Sorted array for binary, jump, and exponential search
    renderArray();
}

function renderArray() {
    container.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 3}px`;
        container.appendChild(bar);
    });
}

async function startSearching() {
    if(isSearching) return;
    isSearching = true;
    
    const value = parseInt(document.getElementById('searchValue').value);
    const algorithm = document.getElementById('algorithm').value;
    const bars = container.children;
    
    if(isNaN(value)) {
        alert('Please enter a valid number');
        isSearching = false;
        return;
    }

    resetArray();

    let found = false;
    switch(algorithm) {
        case 'linear':
            found = await linearSearch(bars, value);
            break;
        case 'binary':
            found = await binarySearch(bars, value);
            break;
        case 'jump':
            found = await jumpSearch(bars, value);
            break;
        case 'exponential':
            found = await exponentialSearch(bars, value);
            break;
    }

    if(!found) {
        alert(`Value ${value} not found!`);
    }

    isSearching = false;
}

// Searching Algorithms
async function linearSearch(bars, target) {
    for(let i=0; i<array.length; i++) {
        bars[i].classList.add('highlight');
        await sleep(speedControl.max - speedControl.value + 50);
        
        if(array[i] === target) {
            bars[i].classList.add('found');
            return true;
        }
        
        bars[i].classList.remove('highlight');
    }
    return false;
}

async function binarySearch(bars, target) {
    let left = 0, right = array.length - 1;
    while(left <= right) {
        const mid = Math.floor((left + right) / 2);
        bars[mid].classList.add('highlight');
        await sleep(speedControl.max - speedControl.value + 50);
        
        if(array[mid] === target) {
            bars[mid].classList.add('found');
            return true;
        } else if(array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
        
        bars[mid].classList.remove('highlight');
    }
    return false;
}

async function jumpSearch(bars, target) {
    const step = Math.floor(Math.sqrt(array.length));
    let prev = 0;
    
    while(array[Math.min(step, array.length) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(array.length));
        if(prev >= array.length) return false;
    }
    
    while(array[prev] < target) {
        bars[prev].classList.add('highlight');
        await sleep(speedControl.max - speedControl.value + 50);
        
        prev++;
        if(prev === Math.min(step, array.length)) return false;
        
        bars[prev - 1].classList.remove('highlight');
    }
    
    if(array[prev] === target) {
        bars[prev].classList.add('found');
        return true;
    }
    return false;
}

async function exponentialSearch(bars, target) {
    if(array[0] === target) {
        bars[0].classList.add('found');
        return true;
    }
    
    let i = 1;
    while(i < array.length && array[i] <= target) {
        bars[i].classList.add('highlight');
        await sleep(speedControl.max - speedControl.value + 50);
        
        i *= 2;
        bars[i / 2].classList.remove('highlight');
    }
    
    return await binarySearch(bars, target, i / 2, Math.min(i, array.length));
}

function resetArray() {
    document.querySelectorAll('.bar').forEach(bar => {
        bar.classList.remove('highlight', 'found');
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function copyCode() {
    navigator.clipboard.writeText(document.getElementById('algorithmCode').textContent);
    alert('Code copied to clipboard!');
}

// Initialize
generateNewArray();
updateComplexity();