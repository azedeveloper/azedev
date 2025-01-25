let A = 0, B = 0, C = 0;
const cubeWidth = 20;
const width = 160, height = 44;
const zBuffer = new Array(width * height).fill(0);
const buffer = new Array(width * height).fill(' ');
const distanceFromCam = 100;
const K1 = 40;
const incrementSpeed = 0.2;
let horizontalOffset;

function calculateX(i, j, k) {
    return j * Math.sin(A) * Math.sin(B) * Math.cos(C) - k * Math.cos(A) * Math.sin(B) * Math.cos(C) +
           j * Math.cos(A) * Math.sin(C) + k * Math.sin(A) * Math.sin(C) + i * Math.cos(B) * Math.cos(C);
}

function calculateY(i, j, k) {
    return j * Math.cos(A) * Math.cos(C) + k * Math.sin(A) * Math.cos(C) -
           j * Math.sin(A) * Math.sin(B) * Math.sin(C) + k * Math.cos(A) * Math.sin(B) * Math.sin(C) -
           i * Math.cos(B) * Math.sin(C);
}

function calculateZ(i, j, k) {
    return k * Math.cos(A) * Math.cos(B) - j * Math.sin(A) * Math.cos(B) + i * Math.sin(B);
}

function calculateForSurface(cubeX, cubeY, cubeZ, ch) {
    let x = calculateX(cubeX, cubeY, cubeZ);
    let y = calculateY(cubeX, cubeY, cubeZ);
    let z = calculateZ(cubeX, cubeY, cubeZ) + distanceFromCam;
    let ooz = 1 / z;
    let xp = Math.floor(width / 2 + horizontalOffset + K1 * ooz * x * 2);
    let yp = Math.floor(height / 2 + K1 * ooz * y);
    let idx = xp + yp * width;
    if (idx >= 0 && idx < width * height && ooz > zBuffer[idx]) {
        zBuffer[idx] = ooz;
        buffer[idx] = ch;
    }
}

function renderFrame() {
    buffer.fill(' ');
    zBuffer.fill(0);
    horizontalOffset = cubeWidth;
    
    for (let cubeX = -cubeWidth; cubeX < cubeWidth; cubeX += incrementSpeed) {
        for (let cubeY = -cubeWidth; cubeY < cubeWidth; cubeY += incrementSpeed) {
            calculateForSurface(cubeX, cubeY, -cubeWidth, '@');
            calculateForSurface(cubeWidth, cubeY, cubeX, '$');
            calculateForSurface(-cubeWidth, cubeY, -cubeX, '~');
            calculateForSurface(-cubeX, cubeY, cubeWidth, '#');
            calculateForSurface(cubeX, -cubeWidth, -cubeY, ';');
            calculateForSurface(cubeX, cubeWidth, cubeY, '+');
        }
    }

    let output = '';
    for (let k = 0; k < width * height; k++) {
        output += (k % width) ? buffer[k] : '\n';
    }
    const cubeElement = document.getElementById('cube');
    cubeElement.innerText = output;
    cubeElement.style.textAlign = 'center';
    cubeElement.style.display = 'block';
    cubeElement.style.whiteSpace = 'pre';
    cubeElement.style.fontSize = '10px';
    
    A += 0.05;
    B += 0.05;
    C += 0.01;

    requestAnimationFrame(renderFrame);
}

renderFrame();
