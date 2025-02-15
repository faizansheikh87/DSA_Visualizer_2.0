let array = [];
let isSorting = false;
const container = document.getElementById('array-container');
const speedControl = document.getElementById('speed');

const complexity = {
    bubble: { time: 'O(n²)', space: 'O(1)' },
    quick: { time: 'O(n log n)', space: 'O(log n)' },
    merge: { time: 'O(n log n)', space: 'O(n)' },
    selection: { time: 'O(n²)', space: 'O(1)' }
};

const algorithmCodes = {
    bubble: `function bubbleSort(arr) {
    for(let i=0; i<arr.length; i++) {
        for(let j=0; j<arr.length-i-1; j++) {
            if(arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
}`,
    quick: `function quickSort(arr, low=0, high=arr.length-1) {
    if(low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi-1);
        quickSort(arr, pi+1, high);
    }
}`,
    merge: `function mergeSort(arr) {
    if(arr.length <= 1) return arr;
    const mid = Math.floor(arr.length/2);
    return merge(
        mergeSort(arr.slice(0, mid)),
        mergeSort(arr.slice(mid))
    );
}`,
    selection: `function selectionSort(arr) {
    for(let i=0; i<arr.length; i++) {
        let min = i;
        for(let j=i+1; j<arr.length; j++) {
            if(arr[j] < arr[min]) min = j;
        }
        [arr[i], arr[min]] = [arr[min], arr[i]];
    }
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

async function startSorting() {
    if(isSorting) return;
    isSorting = true;
    
    const algorithm = document.getElementById('algorithm').value;
    const bars = container.children;
    
    switch(algorithm) {
        case 'bubble':
            await bubbleSort(bars);
            break;
        case 'quick':
            await quickSort(bars);
            break;
        case 'merge':
            await mergeSort(bars);
            break;
        case 'selection':
            await selectionSort(bars);
            break;
    }

    isSorting = false;
}

// Sorting Algorithms
async function bubbleSort(bars) {
    for(let i=0; i<array.length; i++) {
        for(let j=0; j<array.length-i-1; j++) {
            bars[j].classList.add('highlight');
            bars[j+1].classList.add('highlight');
            await sleep(speedControl.max - speedControl.value + 50);
            
            if(array[j] > array[j+1]) {
                [array[j], array[j+1]] = [array[j+1], array[j]];
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j+1].style.height = `${array[j+1] * 3}px`;
                bars[j].classList.add('swap');
                bars[j+1].classList.add('swap');
                await sleep(100);
            }
            
            bars[j].classList.remove('highlight', 'swap');
            bars[j+1].classList.remove('highlight', 'swap');
        }
    }
}

async function quickSort(bars, low=0, high=array.length-1) {
    if(low < high) {
        const pi = await partition(bars, low, high);
        await quickSort(bars, low, pi-1);
        await quickSort(bars, pi+1, high);
    }
}

async function partition(bars, low, high) {
    const pivot = array[high];
    let i = low - 1;
    
    bars[high].classList.add('highlight');
    for(let j=low; j<high; j++) {
        bars[j].classList.add('highlight');
        await sleep(speedControl.max - speedControl.value + 50);
        
        if(array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = `${array[i] * 3}px`;
            bars[j].style.height = `${array[j] * 3}px`;
            await sleep(100);
        }
        
        bars[j].classList.remove('highlight');
    }
    
    [array[i+1], array[high]] = [array[high], array[i+1]];
    bars[i+1].style.height = `${array[i+1] * 3}px`;
    bars[high].style.height = `${array[high] * 3}px`;
    bars[high].classList.remove('highlight');
    
    return i+1;
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